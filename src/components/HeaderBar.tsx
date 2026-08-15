import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Platform, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { INDIAN_LANGUAGES, LanguageOption, UI_TRANSLATIONS } from '../constants/languages';

interface HeaderBarProps {
  searchQuery: string;
  onSearchChange: (text: string) => void;
  onOpenTokenConfig: () => void;
  hasCustomToken: boolean;
  currentLang: string;
  onSelectLang: (langCode: string) => void;
}

export default function HeaderBar({
  searchQuery,
  onSearchChange,
  currentLang,
  onSelectLang,
}: HeaderBarProps) {
  const [isLangModalVisible, setIsLangModalVisible] = useState(false);

  const activeLangObj = INDIAN_LANGUAGES.find((l) => l.code === currentLang) || INDIAN_LANGUAGES[0];
  const t = UI_TRANSLATIONS[currentLang] || UI_TRANSLATIONS['en'];

  return (
    <View style={styles.headerContainer}>
      <View style={styles.topRow}>
        <View style={styles.brandGroup}>
          <View style={styles.logoBadge}>
            <Text style={{ fontSize: 13 }}>🚩</Text>
          </View>
          <View>
            <Text style={styles.brandTitle}>{t.appTitle}</Text>
            <View style={styles.statusPill}>
              <View style={styles.statusDot} />
              <Text style={styles.statusText}>{t.appSubtitle}</Text>
            </View>
          </View>
        </View>

        <View style={styles.rightActionGroup}>
          {/* Language Switcher Pill */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setIsLangModalVisible(true)}
            style={styles.langPickerBtn}
          >
            <Text style={styles.langFlagText}>{activeLangObj.flag}</Text>
            <Text style={styles.langBtnText}>{activeLangObj.nativeName}</Text>
            <Ionicons name="chevron-down" size={11} color="#60A5FA" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.searchBox}>
        <Ionicons name="search" size={16} color="#94A3B8" style={{ marginRight: 8 }} />
        <TextInput
          style={styles.searchInput}
          placeholder={t.searchPlaceholder}
          placeholderTextColor="#64748B"
          value={searchQuery}
          onChangeText={onSearchChange}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => onSearchChange('')}>
            <Ionicons name="close-circle" size={16} color="#94A3B8" />
          </TouchableOpacity>
        )}
      </View>

      {/* Indian Languages Selector Modal */}
      <Modal
        visible={isLangModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setIsLangModalVisible(false)}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => setIsLangModalVisible(false)}
          style={styles.modalOverlay}
        >
          <View style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <Ionicons name="language" size={18} color="#60A5FA" />
              <Text style={styles.modalTitle}>Choose Language / भाषा चुनें</Text>
            </View>

            <View style={styles.langGrid}>
              {INDIAN_LANGUAGES.map((lang) => {
                const isSelected = lang.code === currentLang;
                return (
                  <TouchableOpacity
                    key={lang.code}
                    activeOpacity={0.8}
                    onPress={() => {
                      onSelectLang(lang.code);
                      setIsLangModalVisible(false);
                    }}
                    style={[styles.langGridItem, isSelected && styles.langGridItemActive]}
                  >
                    <Text style={styles.gridFlag}>{lang.flag}</Text>
                    <View style={{ flex: 1 }}>
                      <Text style={[styles.gridNative, isSelected && styles.gridTextActive]}>
                        {lang.nativeName}
                      </Text>
                      <Text style={styles.gridEng}>{lang.name}</Text>
                    </View>
                    {isSelected && <Ionicons name="checkmark-circle" size={16} color="#34D399" />}
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 44 : 12,
    left: 12,
    right: 12,
    zIndex: 20,
    gap: 8,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(15, 23, 42, 0.92)',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
    ...(Platform.OS === 'web'
      ? ({ backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)' } as any)
      : {}),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  brandGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
  },
  logoBadge: {
    width: 26,
    height: 26,
    borderRadius: 7,
    backgroundColor: 'rgba(239, 68, 68, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.3)',
  },
  brandTitle: {
    color: '#F8FAFC',
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
  statusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statusDot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: '#10B981',
  },
  statusText: {
    color: '#94A3B8',
    fontSize: 9,
    fontWeight: '500',
  },
  rightActionGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  langPickerBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(59, 130, 246, 0.15)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 7,
    borderWidth: 1,
    borderColor: 'rgba(96, 165, 250, 0.3)',
  },
  langFlagText: {
    fontSize: 12,
  },
  langBtnText: {
    color: '#60A5FA',
    fontSize: 11,
    fontWeight: '700',
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(15, 23, 42, 0.92)',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
    ...(Platform.OS === 'web'
      ? ({ backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)' } as any)
      : {}),
  },
  searchInput: {
    flex: 1,
    color: '#F8FAFC',
    fontSize: 12,
    padding: 0,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(9, 13, 22, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalCard: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: '#0F172A',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    gap: 10,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  modalTitle: {
    color: '#F8FAFC',
    fontSize: 14,
    fontWeight: '700',
  },
  langGrid: {
    gap: 6,
  },
  langGridItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: 'rgba(30, 41, 59, 0.6)',
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  langGridItemActive: {
    backgroundColor: 'rgba(59, 130, 246, 0.2)',
    borderColor: 'rgba(96, 165, 250, 0.4)',
  },
  gridFlag: {
    fontSize: 15,
  },
  gridNative: {
    color: '#CBD5E1',
    fontSize: 12,
    fontWeight: '600',
  },
  gridTextActive: {
    color: '#60A5FA',
    fontWeight: '700',
  },
  gridEng: {
    color: '#64748B',
    fontSize: 10,
  },
});
