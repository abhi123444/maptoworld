import React from 'react';
import { Platform } from 'react-native';
import MapboxContainerWeb from './MapboxContainer.web';
import MapboxContainerNative from './MapboxContainer.native';
import { WorldLocation, MapStyleOption } from '../constants/mapbox';

export interface MapboxContainerProps {
  selectedLocation: WorldLocation | null;
  onSelectLocation: (loc: WorldLocation) => void;
  currentStyle: MapStyleOption;
  locations: WorldLocation[];
  onMapClick?: () => void;
  customToken?: string;
}

export default function MapboxContainer(props: MapboxContainerProps) {
  if (Platform.OS === 'web') {
    return <MapboxContainerWeb {...props} />;
  }
  return <MapboxContainerNative {...props} />;
}
