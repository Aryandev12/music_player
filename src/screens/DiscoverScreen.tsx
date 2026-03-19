import { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import { searchSongs } from "../api/saavn";
import { usePlayerStore } from "../store/playerStore";
import { Song } from "../types/song";
import { dimensions } from "../constants/dimensions";
import CustomHeader from "../components/CustomHeader";
import { useTheme } from "../contexts/ThemeContext";
import Icon from "../components/Icon";

export default function HomeScreen() {
  const { theme } = useTheme();
  const colors = theme.colors;

  const [query, setQuery] = useState("");
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const setQueueFromListAndPlay = usePlayerStore(
    (state) => state.setQueueFromListAndPlay
  );

  //  DEFAULT SONGS
  async function fetchDefaultSongs() {
    try {
      setLoading(true);
      const results = await searchSongs("arijit", 1);
      setSongs(results || []);
    } catch (err) {
      console.log("Default fetch error", err);
    } finally {
      setLoading(false);
    }
  }

  async function performSearch(searchQuery: string, pageNum: number = 1) {
    if (!searchQuery || searchQuery.length < 2) {
      fetchDefaultSongs(); // fallback
      setPage(1);
      setHasMore(true);
      return;
    }

    try {
      setLoading(true);
      const results = await searchSongs(searchQuery, pageNum);

      if (pageNum === 1) {
        setSongs(results || []);
      } else {
        setSongs(prev => [...prev, ...(results || [])]);
      }

      setPage(pageNum);
      setHasMore((results || []).length > 0);
    } catch (error) {
      console.error('Search error:', error);
      setSongs([]);
    } finally {
      setLoading(false);
    }
  }

  function handleSearch(text: string) {
    setQuery(text);

    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    debounceTimeoutRef.current = setTimeout(() => {
      performSearch(text, 1);
    }, 500);
  }

  async function loadMoreSongs() {
    if (loading || !hasMore || !query) return;

    try {
      setLoading(true);
      const nextPage = page + 1;
      const results = await searchSongs(query, nextPage);

      setSongs(prev => [...prev, ...(results || [])]);
      setPage(nextPage);
      setHasMore((results || []).length > 0);
    } catch (error) {
      console.error('Load more error:', error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchDefaultSongs();
  }, []);

  useEffect(() => {
    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, []);

  // 🔥 SONG CARD
  const renderSongItem = ({ item }: { item: Song }) => (
    <TouchableOpacity
      onPress={() => {
        const index = songs.findIndex((s) => s.id === item.id);
        setQueueFromListAndPlay(songs, index);
      }}
      style={{
        width: "48%",
        marginBottom: dimensions.spacing.md,
      }}
      activeOpacity={0.8}
    >
      <View style={{ position: "relative" }}>
        <Image
          source={{
            uri:
              item.image?.find((img: any) => img.quality === "500x500")?.url ||
              item.image?.[0]?.url,
          }}
          style={{
            width: "100%",
            aspectRatio: 1,
            borderRadius: 16,
            backgroundColor: colors.surface,
          }}
        />

        <View style={{
          position: "absolute",
          bottom: 8,
          right: 8,
          backgroundColor: colors.primary,
          borderRadius: 20,
          width: 36,
          height: 36,
          justifyContent: "center",
          alignItems: "center",
        }}>
          <Text style={{ color: "#fff" }}>▶</Text>
        </View>
      </View>

      <Text numberOfLines={2} style={{
        fontWeight: "600",
        color: colors.text,
        marginTop: 6,
      }}>
        {item.name}
      </Text>

      <Text numberOfLines={1} style={{
        color: colors.textSecondary,
        fontSize: 12,
      }}>
        {item.primaryArtists}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={{
      flex: 1,
      backgroundColor: colors.background,
      paddingTop: StatusBar.currentHeight || 40
    }}>
      <CustomHeader
        title="Music"
        showMenuButton
        showNotificationButton
        showProfileButton
        showThemeToggle
      />

      <View style={{
        flex: 1,
        padding: dimensions.spacing.md,
        paddingBottom: 100,
      }}>
       

        {/* SEARCH */}
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: colors.surface,
          borderRadius: 12,
          paddingHorizontal: 12,
          borderWidth: 1,
          borderColor: colors.border,
          marginBottom: 20,
        }}>
          <Icon name="search" size={20} color={colors.textSecondary} />
          <TextInput
            placeholder="Search songs..."
            placeholderTextColor={colors.textSecondary}
            value={query}
            onChangeText={handleSearch}
            style={{
              flex: 1,
              paddingVertical: 12,
              color: colors.text,
              marginLeft: 8,
            }}
          />
        </View>

        {/*  BROWSE */}
        {query.length < 2 && (
          <View style={{ marginBottom: 16 }}>
            <Text style={{
              fontSize: 16,
              fontWeight: "600",
              color: colors.text,
              marginBottom: 10
            }}>
              Browse
            </Text>

            <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
              {["Arijit",
  "Atif",
  "Taylor",
  "Drake",
  "Shreya",
 
 ].map((item) => (
                <TouchableOpacity
                  key={item}
                  onPress={() => handleSearch(item)}
                  style={{
                    backgroundColor: colors.surfaceElevated,
                    paddingHorizontal: 12,
                    paddingVertical: 8,
                    borderRadius: 20,
                    marginRight: 8,
                    marginBottom: 8,
                  }}
                >
                  <Text style={{ color: colors.text }}>{item}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {/* TITLE */}
        <Text style={{
          fontSize: dimensions.fontSize.lg,
          fontWeight: "700",
          color: colors.text,
          marginBottom: dimensions.spacing.md,
        }}>
          {query.length < 2 ? "Trending " : `Results (${songs.length})`}
        </Text>

        {loading && songs.length === 0 ? (
          <ActivityIndicator size="large" color={colors.primary} />
        ) : (
          <FlatList
            data={songs}
            keyExtractor={(item, index) => `${item.id}-${index}`}
            numColumns={2}
            columnWrapperStyle={{ justifyContent: "space-between" }}
            showsVerticalScrollIndicator={false}
            renderItem={renderSongItem}
            onEndReached={loadMoreSongs}
            onEndReachedThreshold={0.6}
          />
        )}
      </View>
    </View>
  );
}