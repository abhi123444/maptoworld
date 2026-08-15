import React from 'react';
import { ScrollView, TouchableOpacity, Text, StyleSheet, View, Platform } from 'react-native';
import { WorldLocation } from '../constants/mapbox';

interface LocationChipsProps {
  locations: WorldLocation[];
  selectedLocation: WorldLocation | null;
  onSelectLocation: (loc: WorldLocation) => void;
}

export default function LocationChips({
  locations,
  selectedLocation,
  onSelectLocation,
}: LocationChipsProps) {
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {locations.map((loc) => {
          const isSelected = selectedLocation?.id === loc.id;
          return (
            <TouchableOpacity
              key={loc.id}
              activeOpacity={0.8}
              onPress={() => onSelectLocation(loc)}
              style={[styles.chip, isSelected && styles.chipSelected]}
            >
              <Text style={styles.flag}>{loc.flag}</Text>
              <Text style={[styles.chipText, isSelected && styles.chipTextSelected]}>
                {loc.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 170 : 138,
    left: 0,
    right: 0,
    zIndex: 20,
  },
  scrollContent: {
    paddingHorizontal: 16,
    gap: 8,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(15, 23, 42, 0.82)',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    gap: 6,
    ...(Platform.OS === 'web'
      ? ({ backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)' } as any)
      : {}),
  },
  chipSelected: {
    backgroundColor: 'rgba(59, 130, 246, 0.9)',
    borderColor: '#60A5FA',
    shadowColor: '#3B82F6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
  },
  flag: {
    fontSize: 14,
  },
  chipText: {
    color: '#CBD5E1',
    fontSize: 13,
    fontWeight: '600',
  },
  chipTextSelected: {
    color: '#FFFFFF',
  },
});
