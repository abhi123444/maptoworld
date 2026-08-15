import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Platform,
  ScrollView,
  Linking,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { WorldLocation } from '../constants/mapbox';
import { fetchFortWikipedia, WikipediaFortData } from '../services/wikipediaService';
import { getFortAiInsight, FortAiInsight } from '../services/fortAiService';
import { getFortYouTubeVideos, YouTubeVideo } from '../services/youtubeService';
import { UI_TRANSLATIONS } from '../constants/languages';

interface LocationDetailCardProps {
  location: WorldLocation;
  onClose: () => void;
  currentLang?: string;
}

export default function LocationDetailCard({
  location,
  onClose,
  currentLang = 'mr',
}: LocationDetailCardProps) {
  const [wikiData, setWikiData] = useState<WikipediaFortData | null>(null);
  const [aiInsight, setAiInsight] = useState<FortAiInsight | null>(null);
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [loadingWiki, setLoadingWiki] = useState(true);

  const t = UI_TRANSLATIONS[currentLang] || UI_TRANSLATIONS['en'];

  useEffect(() => {
    let isMounted = true;
    setLoadingWiki(true);

    // Fetch official Wikipedia data in selected Indian language
    fetchFortWikipedia(location.name, currentLang).then((data) => {
      if (isMounted) {
        setWikiData(data);
        setLoadingWiki(false);
      }
    });

    const insight = getFortAiInsight(location.name);
    const ytVideos = getFortYouTubeVideos(location.name);
    setAiInsight(insight);
    setVideos(ytVideos);

    return () => {
      isMounted = false;
    };
  }, [location, currentLang]);

  const handleOpenLink = (url: string) => {
    if (Platform.OS === 'web') {
      window.open(url, '_blank');
    } else {
      Linking.openURL(url).catch((err) => console.error('Error opening URL:', err));
    }
  };

  const heroVideo = videos[0];

  return (
    <View style={styles.cardContainer}>
      <TouchableOpacity activeOpacity={0.8} onPress={onClose} style={styles.closeBtn}>
        <Ionicons name="close" size={18} color="#94A3B8" />
      </TouchableOpacity>

      <ScrollView style={{ maxHeight: 440 }} showsVerticalScrollIndicator={false}>
        {/* Full Hero YouTube Video Banner */}
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => heroVideo && handleOpenLink(heroVideo.url)}
          style={styles.heroBannerContainer}
        >
          <Image
            source={{ uri: heroVideo ? heroVideo.bannerUrl : location.image }}
            style={styles.heroBannerImage}
          />
          <View style={styles.heroGradientOverlay} />

          <View style={styles.heroBadgeRow}>
            <View style={styles.heroYtBadge}>
              <Ionicons name="logo-youtube" size={14} color="#EF4444" />
              <Text style={styles.heroYtBadgeText}>YOUTUBE FEATURED DOCUMENTARY</Text>
            </View>
            {heroVideo && (
              <View style={styles.heroDurationBadge}>
                <Text style={styles.heroDurationText}>{heroVideo.duration}</Text>
              </View>
            )}
          </View>

          <View style={styles.heroPlayCenter}>
            <View style={styles.heroPlayCircle}>
              <Ionicons name="play" size={24} color="#FFFFFF" style={{ marginLeft: 3 }} />
            </View>
            <Text style={styles.heroPlayText} numberOfLines={1}>
              {heroVideo ? heroVideo.title : `Watch ${location.name} History Video`}
            </Text>
          </View>
        </TouchableOpacity>

        {/* Fort Header Info */}
        <View style={styles.headerInfoBlock}>
          <View style={styles.titleRow}>
            <Text style={styles.flagText}>{location.flag}</Text>
            <Text style={styles.cityName}>{location.name}</Text>
            <View style={styles.categoryBadge}>
              <Text style={styles.categoryText}>{location.category}</Text>
            </View>
          </View>

          <Text style={styles.countryName}>{location.country}</Text>

          <View style={styles.metaRow}>
            <View style={styles.metaItem}>
              <Ionicons name="location-outline" size={13} color="#60A5FA" />
              <Text style={styles.metaText}>{location.population}</Text>
            </View>

            <View style={styles.metaItem}>
              <Ionicons name="navigate-outline" size={13} color="#60A5FA" />
              <Text style={styles.metaText}>
                {location.latitude.toFixed(2)}°, {location.longitude.toFixed(2)}°
              </Text>
            </View>
          </View>
        </View>

        {/* Official Wikipedia History Section (Multi-language) */}
        <View style={styles.wikiSection}>
          <View style={styles.wikiHeaderRow}>
            <View style={styles.wikiBadge}>
              <Ionicons name="globe-outline" size={14} color="#38BDF8" />
              <Text style={styles.wikiBadgeText}>
                {t.wikiSectionTitle || 'WIKIPEDIA OFFICIAL HISTORY'} ({wikiData?.langCode.toUpperCase()})
              </Text>
            </View>

            {wikiData && (
              <TouchableOpacity
                onPress={() => handleOpenLink(wikiData.wikiUrl)}
                style={styles.wikiLinkBtn}
              >
                <Text style={styles.wikiLinkText}>{t.readWikiBtn || 'Read Wiki'}</Text>
                <Ionicons name="open-outline" size={12} color="#38BDF8" />
              </TouchableOpacity>
            )}
          </View>

          {loadingWiki ? (
            <View style={styles.wikiLoadingBox}>
              <ActivityIndicator size="small" color="#38BDF8" />
              <Text style={styles.wikiLoadingText}>Wikipedia data loading ({currentLang})...</Text>
            </View>
          ) : (
            <View style={{ gap: 6 }}>
              {wikiData?.description && (
                <Text style={styles.wikiDescText}>{wikiData.description}</Text>
              )}
              <Text style={styles.wikiExtractText}>{wikiData?.extract}</Text>
            </View>
          )}
        </View>

        {/* AI Fort Insights Grid */}
        {aiInsight && (
          <View style={styles.aiSection}>
            <View style={styles.aiHeaderRow}>
              <View style={styles.aiBadge}>
                <Ionicons name="sparkles" size={13} color="#F59E0B" />
                <Text style={styles.aiBadgeText}>{t.aiSectionTitle || 'STRATEGIC INSIGHTS'}</Text>
              </View>
            </View>

            <View style={styles.statsGrid}>
              <View style={styles.statBox}>
                <Ionicons name="shield-checkmark-outline" size={14} color="#3B82F6" />
                <View style={{ flex: 1 }}>
                  <Text style={styles.statLabel}>{t.rulerLabel || 'Ruler / Dynasty'}</Text>
                  <Text style={styles.statVal}>{aiInsight.rulerDynasty}</Text>
                </View>
              </View>

              <View style={styles.statBox}>
                <Ionicons name="flash-outline" size={14} color="#F59E0B" />
                <View style={{ flex: 1 }}>
                  <Text style={styles.statLabel}>{t.battleLabel || 'Key Battles'}</Text>
                  <Text style={styles.statVal}>{aiInsight.keyBattles}</Text>
                </View>
              </View>
            </View>
          </View>
        )}

        {/* Top 5 YouTube Videos Section */}
        <View style={styles.ytSection}>
          <View style={styles.ytHeaderRow}>
            <Ionicons name="logo-youtube" size={18} color="#EF4444" />
            <Text style={styles.ytSectionTitle}>{t.ytSectionTitle || 'Top 5 YouTube Documentaries'}</Text>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 10 }}>
            {videos.map((vid, i) => (
              <TouchableOpacity
                key={vid.id}
                activeOpacity={0.85}
                onPress={() => handleOpenLink(vid.url)}
                style={styles.ytCard}
              >
                <View style={styles.thumbContainer}>
                  <Image source={{ uri: vid.thumbnail }} style={styles.ytThumb} />
                  <View style={styles.playOverlay}>
                    <Ionicons name="play" size={16} color="#FFFFFF" />
                  </View>
                  <View style={styles.durationBadge}>
                    <Text style={styles.durationText}>{vid.duration}</Text>
                  </View>
                </View>

                <View style={styles.ytInfoBox}>
                  <Text style={styles.ytTitle} numberOfLines={2}>
                    {i + 1}. {vid.title}
                  </Text>
                  <View style={styles.ytMetaRow}>
                    <Text style={styles.ytChannel}>{vid.channel}</Text>
                    <Text style={styles.ytViews}>{vid.views}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </ScrollView>

      <View style={styles.footerRow}>
        <View style={styles.landmarkBox}>
          <Ionicons name="pin" size={14} color="#F59E0B" />
          <Text style={styles.landmarkText} numberOfLines={1}>
            {location.landmark}
          </Text>
        </View>

        {wikiData && (
          <TouchableOpacity
            onPress={() => handleOpenLink(wikiData.wikiUrl)}
            style={styles.exploreBtn}
          >
            <Text style={styles.exploreBtnText}>{t.readWikiBtn || 'Full Wikipedia'}</Text>
            <Ionicons name="open-outline" size={14} color="#FFFFFF" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 24 : 14,
    left: 14,
    right: 14,
    backgroundColor: 'rgba(15, 23, 42, 0.96)',
    borderRadius: 20,
    padding: 14,
    zIndex: 30,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.14)',
    gap: 8,
    maxHeight: 520,
    ...(Platform.OS === 'web'
      ? ({ backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)' } as any)
      : {}),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.6,
    shadowRadius: 20,
  },
  closeBtn: {
    position: 'absolute',
    top: 12,
    right: 12,
    zIndex: 20,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(15, 23, 42, 0.75)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  heroBannerContainer: {
    width: '100%',
    height: 135,
    borderRadius: 16,
    overflow: 'hidden',
    position: 'relative',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.3)',
  },
  heroBannerImage: {
    width: '100%',
    height: '100%',
  },
  heroGradientOverlay: {
    ...(StyleSheet.absoluteFill as object),
    backgroundColor: 'rgba(15, 23, 42, 0.45)',
  },
  heroBadgeRow: {
    position: 'absolute',
    top: 10,
    left: 10,
    right: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 5,
  },
  heroYtBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: 'rgba(15, 23, 42, 0.85)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.4)',
  },
  heroYtBadgeText: {
    color: '#F8FAFC',
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.4,
  },
  heroDurationBadge: {
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 6,
  },
  heroDurationText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '700',
  },
  heroPlayCenter: {
    position: 'absolute',
    bottom: 12,
    left: 12,
    right: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    zIndex: 5,
  },
  heroPlayCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#EF4444',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 4px 16px rgba(239, 68, 68, 0.6)',
  },
  heroPlayText: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
  headerInfoBlock: {
    gap: 4,
    marginBottom: 8,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flexWrap: 'wrap',
  },
  flagText: {
    fontSize: 17,
  },
  cityName: {
    color: '#F8FAFC',
    fontSize: 17,
    fontWeight: '700',
  },
  categoryBadge: {
    backgroundColor: 'rgba(59, 130, 246, 0.2)',
    borderColor: 'rgba(96, 165, 250, 0.3)',
    borderWidth: 1,
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 6,
  },
  categoryText: {
    color: '#60A5FA',
    fontSize: 10,
    fontWeight: '700',
  },
  countryName: {
    color: '#94A3B8',
    fontSize: 11,
    fontWeight: '500',
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 4,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    color: '#94A3B8',
    fontSize: 11,
    fontWeight: '600',
  },
  wikiSection: {
    backgroundColor: 'rgba(15, 23, 42, 0.8)',
    borderRadius: 14,
    padding: 12,
    borderWidth: 1,
    borderColor: 'rgba(56, 189, 248, 0.3)',
    gap: 8,
    marginBottom: 8,
  },
  wikiHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  wikiBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: 'rgba(56, 189, 248, 0.15)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  wikiBadgeText: {
    color: '#38BDF8',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.3,
  },
  wikiLinkBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(56, 189, 248, 0.15)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  wikiLinkText: {
    color: '#38BDF8',
    fontSize: 10,
    fontWeight: '600',
  },
  wikiLoadingBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 8,
  },
  wikiLoadingText: {
    color: '#94A3B8',
    fontSize: 11,
  },
  wikiDescText: {
    color: '#38BDF8',
    fontSize: 11,
    fontWeight: '600',
  },
  wikiExtractText: {
    color: '#E2E8F0',
    fontSize: 11.5,
    lineHeight: 16.5,
  },
  aiSection: {
    backgroundColor: 'rgba(30, 41, 59, 0.7)',
    borderRadius: 12,
    padding: 10,
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.25)',
    gap: 6,
    marginBottom: 8,
  },
  aiHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  aiBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: 'rgba(245, 158, 11, 0.15)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  aiBadgeText: {
    color: '#F59E0B',
    fontSize: 10,
    fontWeight: '700',
  },
  statsGrid: {
    gap: 5,
    marginTop: 2,
  },
  statBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 6,
    backgroundColor: 'rgba(15, 23, 42, 0.5)',
    padding: 6,
    borderRadius: 8,
  },
  statLabel: {
    color: '#94A3B8',
    fontSize: 9,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  statVal: {
    color: '#CBD5E1',
    fontSize: 10,
    fontWeight: '600',
  },
  ytSection: {
    gap: 8,
    marginBottom: 6,
  },
  ytHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  ytSectionTitle: {
    color: '#F8FAFC',
    fontSize: 12,
    fontWeight: '700',
  },
  ytCard: {
    width: 160,
    backgroundColor: 'rgba(30, 41, 59, 0.8)',
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  thumbContainer: {
    width: '100%',
    height: 90,
    position: 'relative',
    backgroundColor: '#0F172A',
  },
  ytThumb: {
    width: '100%',
    height: '100%',
  },
  playOverlay: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -15 }, { translateY: -15 }],
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(239, 68, 68, 0.9)',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 4px 12px rgba(239, 68, 68, 0.5)',
  },
  durationBadge: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 4,
  },
  durationText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '700',
  },
  ytInfoBox: {
    padding: 7,
    gap: 4,
  },
  ytTitle: {
    color: '#F1F5F9',
    fontSize: 10,
    fontWeight: '600',
    lineHeight: 13,
  },
  ytMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 2,
  },
  ytChannel: {
    color: '#94A3B8',
    fontSize: 9,
    fontWeight: '500',
  },
  ytViews: {
    color: '#EF4444',
    fontSize: 9,
    fontWeight: '700',
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 6,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.08)',
    gap: 8,
  },
  landmarkBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(245, 158, 11, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 8,
  },
  landmarkText: {
    color: '#FBBF24',
    fontSize: 11,
    fontWeight: '600',
  },
  exploreBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: '#0284C7',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  exploreBtnText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
  },
});
