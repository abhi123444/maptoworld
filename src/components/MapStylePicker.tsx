import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MAP_STYLES, MapStyleOption } from '../constants/mapbox';

interface MapStylePickerProps {
  currentStyle: MapStyleOption;
  onStyleSelect: (style: MapStyleOption) => void;
  onResetView: () => void;
}

export default function MapStylePicker({
  currentStyle,
  onStyleSelect,
  onResetView,
}: MapStylePickerProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={onResetView}
        style={styles.controlBtn}
      >
        <Ionicons name="compass-outline" size={20} color="#60A5FA" />
      </TouchableOpacity>

      <TouchableOpacity
        activeOpacity={0.85}
        onPress={() => setExpanded(!expanded)}
        style={[styles.controlBtn, expanded && styles.controlBtnActive]}
      >
        <Ionicons name="layers" size={20} color={expanded ? '#60A5FA' : '#CBD5E1'} />
      </TouchableOpacity>

      {expanded && (
        <View style={styles.dropdown}>
          <Text style={styles.dropdownTitle}>Map Styles</Text>
          {MAP_STYLES.map((style) => {
            const isSelected = currentStyle.id === style.id;
            return (
              <TouchableOpacity
                key={style.id}
                activeOpacity={0.8}
                onPress={() => {
                  onStyleSelect(style);
                  setExpanded(false);
                }}
                style={[styles.styleOption, isSelected && styles.styleOptionSelected]}
              >
                <Ionicons
                  name={style.icon as any}
                  size={16}
                  color={isSelected ? '#3B82F6' : '#94A3B8'}
                />
                <Text
                  style={[
                    styles.styleOptionText,
                    isSelected && styles.styleOptionTextSelected,
                  ]}
                >
                  {style.name}
                </Text>
                {isSelected && (
                  <Ionicons name="checkmark-circle" size={16} color="#3B82F6" />
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: 16,
    top: Platform.OS === 'ios' ? 220 : 190,
    zIndex: 25,
    gap: 10,
    alignItems: 'flex-end',
  },
  controlBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(15, 23, 42, 0.88)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
    ...(Platform.OS === 'web'
      ? ({ backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)' } as any)
      : {}),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  controlBtnActive: {
    borderColor: '#3B82F6',
    backgroundColor: 'rgba(30, 41, 59, 0.95)',
  },
  dropdown: {
    width: 170,
    backgroundColor: 'rgba(15, 23, 42, 0.95)',
    borderRadius: 16,
    padding: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
    gap: 4,
    ...(Platform.OS === 'web'
      ? ({ backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)' } as any)
      : {}),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
  },
  dropdownTitle: {
    color: '#64748B',
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 4,
    marginLeft: 6,
  },
  styleOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 10,
    gap: 8,
  },
  styleOptionSelected: {
    backgroundColor: 'rgba(59, 130, 246, 0.15)',
  },
  styleOptionText: {
    flex: 1,
    color: '#CBD5E1',
    fontSize: 13,
    fontWeight: '500',
  },
  styleOptionTextSelected: {
    color: '#60A5FA',
    fontWeight: '700',
  },
});
