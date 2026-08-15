import React, { useState, useMemo } from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import MapboxContainer from '../components/MapboxContainer';
import HeaderBar from '../components/HeaderBar';
import LocationChips from '../components/LocationChips';
import MapStylePicker from '../components/MapStylePicker';
import LocationDetailCard from '../components/LocationDetailCard';
import TokenConfigModal from '../components/TokenConfigModal';
import {
  getLocalizedLocations,
  MAP_STYLES,
  WorldLocation,
  MapStyleOption,
  MAPBOX_ACCESS_TOKEN,
} from '../constants/mapbox';

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentLang, setCurrentLang] = useState<string>('mr');

  // Compute localized fort locations based on active language
  const localizedLocations = useMemo(() => {
    return getLocalizedLocations(currentLang);
  }, [currentLang]);

  const [selectedLocation, setSelectedLocation] = useState<WorldLocation | null>(
    localizedLocations[0]
  );
  const [currentStyle, setCurrentStyle] = useState<MapStyleOption>(MAP_STYLES[0]);
  const [isTokenModalVisible, setIsTokenModalVisible] = useState(false);
  const [customToken, setCustomToken] = useState<string>(MAPBOX_ACCESS_TOKEN);

  const filteredLocations = useMemo(() => {
    if (!searchQuery.trim()) return localizedLocations;
    const query = searchQuery.toLowerCase();
    return localizedLocations.filter(
      (loc) =>
        loc.name.toLowerCase().includes(query) ||
        loc.country.toLowerCase().includes(query) ||
        loc.landmark.toLowerCase().includes(query) ||
        loc.category.toLowerCase().includes(query)
    );
  }, [searchQuery, localizedLocations]);

  const handleSelectLocation = (loc: WorldLocation) => {
    setSelectedLocation(loc);
  };

  const handleResetView = () => {
    setSelectedLocation(null);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#090D16" />

      {/* Mapbox 3D Globe & Map Container */}
      <MapboxContainer
        selectedLocation={selectedLocation}
        onSelectLocation={handleSelectLocation}
        currentStyle={currentStyle}
        locations={filteredLocations}
        onMapClick={() => setSelectedLocation(null)}
        customToken={customToken}
      />

      {/* Top Header & Multi-Language Bar */}
      <HeaderBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onOpenTokenConfig={() => setIsTokenModalVisible(true)}
        hasCustomToken={customToken.length > 15}
        currentLang={currentLang}
        onSelectLang={setCurrentLang}
      />

      {/* Quick Jump Location Chips */}
      <LocationChips
        locations={filteredLocations}
        selectedLocation={selectedLocation}
        onSelectLocation={handleSelectLocation}
      />

      {/* Map Style Selector & View Controls */}
      <MapStylePicker
        currentStyle={currentStyle}
        onStyleSelect={setCurrentStyle}
        onResetView={handleResetView}
      />

      {/* Selected Location Card */}
      {selectedLocation && (
        <LocationDetailCard
          location={selectedLocation}
          onClose={() => setSelectedLocation(null)}
          currentLang={currentLang}
        />
      )}

      {/* Token Configuration Modal */}
      <TokenConfigModal
        visible={isTokenModalVisible}
        onClose={() => setIsTokenModalVisible(false)}
        customToken={customToken}
        onSaveToken={setCustomToken}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#090D16',
  },
});
