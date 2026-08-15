import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Mapbox from '@rnmapbox/maps';
import { WorldLocation, MapStyleOption, MAPBOX_ACCESS_TOKEN } from '../constants/mapbox';

interface MapboxNativeProps {
  selectedLocation: WorldLocation | null;
  onSelectLocation: (loc: WorldLocation) => void;
  currentStyle: MapStyleOption;
  locations: WorldLocation[];
  onMapClick?: () => void;
  customToken?: string;
}

export default function MapboxContainerNative({
  selectedLocation,
  onSelectLocation,
  currentStyle,
  locations,
  onMapClick,
  customToken,
}: MapboxNativeProps) {
  const cameraRef = useRef<Mapbox.Camera>(null);

  const activeToken = customToken && customToken.trim().length > 10 ? customToken.trim() : MAPBOX_ACCESS_TOKEN;

  useEffect(() => {
    Mapbox.setAccessToken(activeToken);
  }, [activeToken]);

  useEffect(() => {
    if (selectedLocation && cameraRef.current) {
      cameraRef.current.setCamera({
        centerCoordinate: [selectedLocation.longitude, selectedLocation.latitude],
        zoomLevel: selectedLocation.zoom,
        pitch: selectedLocation.pitch,
        heading: selectedLocation.bearing,
        animationDuration: 2000,
      });
    }
  }, [selectedLocation]);

  const isStyleObj = typeof currentStyle.url === 'object';

  return (
    <View style={styles.container}>
      <Mapbox.MapView
        style={styles.map}
        styleURL={!isStyleObj ? (currentStyle.url as string) : undefined}
        styleJSON={isStyleObj ? JSON.stringify(currentStyle.url) : undefined}
        onPress={() => onMapClick && onMapClick()}
        logoEnabled={false}
        attributionEnabled={true}
      >
        <Mapbox.Camera
          ref={cameraRef}
          defaultSettings={{
            centerCoordinate: selectedLocation
              ? [selectedLocation.longitude, selectedLocation.latitude]
              : [15, 25],
            zoomLevel: selectedLocation ? selectedLocation.zoom : 2.2,
          }}
        />

        {locations.map((loc) => {
          const isSelected = selectedLocation?.id === loc.id;
          return (
            <Mapbox.MarkerView
              key={loc.id}
              coordinate={[loc.longitude, loc.latitude]}
            >
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => onSelectLocation(loc)}
                style={[
                  styles.markerContainer,
                  isSelected && styles.markerContainerSelected,
                ]}
              >
                <Text style={styles.flagText}>{loc.flag}</Text>
                <Text style={styles.markerText}>{loc.name}</Text>
              </TouchableOpacity>
            </Mapbox.MarkerView>
          );
        })}
      </Mapbox.MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  map: {
    flex: 1,
  },
  markerContainer: {
    backgroundColor: '#0F172A',
    borderColor: 'rgba(255, 255, 255, 0.8)',
    borderWidth: 1.5,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 6,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  markerContainerSelected: {
    backgroundColor: '#3B82F6',
    borderColor: '#60A5FA',
    borderWidth: 2,
    transform: [{ scale: 1.15 }],
  },
  flagText: {
    fontSize: 16,
  },
  markerText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 13,
  },
});
