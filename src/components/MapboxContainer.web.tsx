import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import {
  WorldLocation,
  MapStyleOption,
  MAPBOX_ACCESS_TOKEN,
  FORTS_GEOJSON,
  CONNECTIVITY_GEOJSON,
} from '../constants/mapbox';
import { Ionicons } from '@expo/vector-icons';

interface MapboxWebProps {
  selectedLocation: WorldLocation | null;
  onSelectLocation: (loc: WorldLocation) => void;
  currentStyle: MapStyleOption;
  locations: WorldLocation[];
  onMapClick?: () => void;
  customToken?: string;
}

export default function MapboxContainerWeb({
  selectedLocation,
  onSelectLocation,
  currentStyle,
  locations,
  onMapClick,
  customToken,
}: MapboxWebProps) {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<any>(null);
  const markersRef = useRef<{ [key: string]: any }>({});
  const [mapLoaded, setMapLoaded] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const isTokenValid = Boolean(
    activeToken &&
    activeToken !== 'YOUR_MAPBOX_ACCESS_TOKEN' &&
    activeToken.startsWith('pk.') &&
    activeToken.length > 20
  );

  // Load Mapbox GL JS & CSS dynamically for web environment
  useEffect(() => {
    let isMounted = true;

    if (!isTokenValid) {
      setErrorMsg('Mapbox Access Token is missing or invalid. Please enter a valid Mapbox Public Access Token (pk.eyJ...) using the key icon at top or below.');
      return;
    }

    const loadMapboxScript = async () => {
      try {
        // Inject Mapbox GL CSS into head synchronously
        if (!document.getElementById('mapbox-gl-css')) {
          const link = document.createElement('link');
          link.id = 'mapbox-gl-css';
          link.rel = 'stylesheet';
          link.href = 'https://api.mapbox.com/mapbox-gl-js/v2.15.0/mapbox-gl.css';
          document.head.appendChild(link);
        }

        // Import mapbox-gl
        let mapboxgl: any;
        try {
          mapboxgl = require('mapbox-gl');
        } catch {
          if ((window as any).mapboxgl) {
            mapboxgl = (window as any).mapboxgl;
          } else {
            throw new Error('mapbox-gl JS library not found');
          }
        }

        if (!mapContainerRef.current) return;

        mapboxgl.accessToken = activeToken;

        const mapStyleUrl = typeof currentStyle.url === 'string' ? currentStyle.url : currentStyle.url;

        const map = new mapboxgl.Map({
          container: mapContainerRef.current,
          style: mapStyleUrl as any,
          center: selectedLocation ? [selectedLocation.longitude, selectedLocation.latitude] : [73.8, 18.8],
          zoom: selectedLocation ? selectedLocation.zoom : 8.2,
          pitch: selectedLocation ? selectedLocation.pitch : 45,
          bearing: selectedLocation ? selectedLocation.bearing : 0,
        });

        mapRef.current = map;

        map.on('load', () => {
          if (!isMounted) return;
          map.resize();
          try {
            // Add terrain DEM for 3D elevation
            if (!map.getSource('mapbox-dem')) {
              map.addSource('mapbox-dem', {
                type: 'raster-dem',
                url: 'mapbox://mapbox.mapbox-terrain-dem-v1',
                tileSize: 512,
                maxzoom: 14,
              });
              map.setTerrain({ source: 'mapbox-dem', exaggeration: 1.6 });
            }

            // 1. Add Nearest-Neighbor Fort Connectivity Lines Source
            if (!map.getSource('connectivity-source')) {
              map.addSource('connectivity-source', {
                type: 'geojson',
                data: CONNECTIVITY_GEOJSON,
              });

              // Glow Casing Line Layer
              map.addLayer({
                id: 'connectivity-line-glow',
                type: 'line',
                source: 'connectivity-source',
                paint: {
                  'line-color': '#60A5FA',
                  'line-width': ['interpolate', ['linear'], ['zoom'], 6, 4, 14, 8],
                  'line-opacity': 0.4,
                  'line-blur': 3,
                },
              });

              // Glowing Core Dash Line Layer
              map.addLayer({
                id: 'connectivity-line-core',
                type: 'line',
                source: 'connectivity-source',
                paint: {
                  'line-color': '#3B82F6',
                  'line-width': ['interpolate', ['linear'], ['zoom'], 6, 2, 14, 4],
                  'line-dasharray': [2, 2],
                  'line-opacity': 0.9,
                },
              });
            }

            // 2. Add GeoJSON source for 40 Maharashtra Forts
            if (!map.getSource('forts-source')) {
              map.addSource('forts-source', {
                type: 'geojson',
                data: FORTS_GEOJSON,
              });

              // Outer Pulsing Ring Circle Layer
              map.addLayer({
                id: 'forts-outer-rings',
                type: 'circle',
                source: 'forts-source',
                paint: {
                  'circle-radius': ['interpolate', ['linear'], ['zoom'], 6, 12, 14, 24],
                  'circle-color': [
                    'match',
                    ['get', 'type'],
                    'Sea Fort', 'rgba(56, 189, 248, 0.25)',
                    'Land Fort', 'rgba(245, 158, 11, 0.25)',
                    'rgba(239, 68, 68, 0.25)'
                  ],
                  'circle-stroke-width': 1.5,
                  'circle-stroke-color': [
                    'match',
                    ['get', 'type'],
                    'Sea Fort', '#38BDF8',
                    'Land Fort', '#F59E0B',
                    '#EF4444'
                  ],
                },
              });

              // Inner Core Solid Circle Layer
              map.addLayer({
                id: 'forts-core-dots',
                type: 'circle',
                source: 'forts-source',
                paint: {
                  'circle-radius': ['interpolate', ['linear'], ['zoom'], 6, 5, 14, 9],
                  'circle-color': [
                    'match',
                    ['get', 'type'],
                    'Sea Fort', '#38BDF8',
                    'Land Fort', '#F59E0B',
                    '#EF4444'
                  ],
                  'circle-stroke-width': 2,
                  'circle-stroke-color': '#FFFFFF',
                },
              });
            }
          } catch (e) {
            // terrain/layer fallback
          }

          setMapLoaded(true);
        });

        map.on('click', (e: any) => {
          if (e.defaultPrevented) return;
          if (onMapClick) onMapClick();
        });

        map.on('error', (e: any) => {
          console.warn('Mapbox GL Web Notice:', e?.error?.message || e);
          const errStr = String(e?.error?.message || e?.error?.status || '');
          if (errStr.includes('401') || errStr.includes('Unauthorized')) {
            setErrorMsg('Access token missing permissions for this style.');
          }
        });

        // Add Navigation controls
        map.addControl(new mapboxgl.NavigationControl({ visualizePitch: true }), 'bottom-right');

        // Trigger container size recalculation
        setTimeout(() => {
          if (mapRef.current) {
            mapRef.current.resize();
          }
        }, 300);

      } catch (err: any) {
        console.error('Error initializing Web Mapbox:', err);
        setErrorMsg(err.message || 'Failed to initialize Mapbox Web view');
      }
    };

    loadMapboxScript();

    return () => {
      isMounted = false;
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [activeToken]);

  // Update style when currentStyle changes
  useEffect(() => {
    if (mapRef.current && mapLoaded) {
      try {
        setErrorMsg(null);
        mapRef.current.setStyle(currentStyle.url as any);
      } catch (e) {
        console.warn('Style change error:', e);
      }
    }
  }, [currentStyle, mapLoaded]);

  // Update markers when locations or selection changes
  useEffect(() => {
    if (!mapRef.current || !mapLoaded) return;

    try {
      const mapboxgl = require('mapbox-gl');

      // Clear old markers
      Object.values(markersRef.current).forEach((m) => m.remove());
      markersRef.current = {};

      locations.forEach((loc) => {
        const isSelected = selectedLocation?.id === loc.id;

        // Custom HTML marker container
        const el = document.createElement('div');
        el.className = 'custom-mapbox-marker';
        el.style.cursor = 'pointer';
        el.style.display = 'flex';
        el.style.alignItems = 'center';
        el.style.justifyContent = 'center';

        el.innerHTML = `
          <div style="
            background: ${isSelected ? '#2563EB' : 'rgba(15, 23, 42, 0.9)'};
            border: 2px solid ${isSelected ? '#60A5FA' : 'rgba(255,255,255,0.85)'};
            box-shadow: 0 4px 20px ${isSelected ? 'rgba(37, 99, 235, 0.7)' : 'rgba(0,0,0,0.5)'};
            border-radius: 9999px;
            padding: 5px 11px;
            display: flex;
            align-items: center;
            gap: 5px;
            transform: scale(${isSelected ? '1.15' : '1'});
            transition: all 0.25s ease;
          ">
            <span style="font-size: 15px;">${loc.flag}</span>
            <span style="color: #ffffff; font-weight: 700; font-size: 12px; white-space: nowrap; letter-spacing: 0.2px;">${loc.name}</span>
          </div>
        `;

        el.addEventListener('click', (ev) => {
          ev.stopPropagation();
          onSelectLocation(loc);
        });

        const marker = new mapboxgl.Marker({ element: el })
          .setLngLat([loc.longitude, loc.latitude])
          .addTo(mapRef.current);

        markersRef.current[loc.id] = marker;
      });
    } catch (e) {
      console.warn('Marker rendering error:', e);
    }
  }, [locations, selectedLocation, mapLoaded]);

  // Fly to selected location smoothly
  useEffect(() => {
    if (mapRef.current && mapLoaded && selectedLocation) {
      try {
        mapRef.current.flyTo({
          center: [selectedLocation.longitude, selectedLocation.latitude],
          zoom: selectedLocation.zoom,
          pitch: selectedLocation.pitch,
          bearing: selectedLocation.bearing,
          duration: 2000,
          essential: true,
        });
      } catch (e) {
        console.warn('FlyTo error:', e);
      }
    }
  }, [selectedLocation, mapLoaded]);

  return (
    <View style={styles.container}>
      <div
        ref={mapContainerRef}
        style={{
          width: '100vw',
          height: '100vh',
          position: 'absolute',
          top: 0,
          left: 0,
          backgroundColor: '#090D16',
        }}
      />

      {errorMsg && (
        <View style={styles.errorCard}>
          <Ionicons name="warning-outline" size={20} color="#F87171" />
          <Text style={styles.errorText}>{errorMsg}</Text>
        </View>
      )}

      {!mapLoaded && !errorMsg && (
        <View style={styles.loadingOverlay}>
          <Ionicons name="earth" size={48} color="#60A5FA" style={{ marginBottom: 12 }} />
          <Text style={styles.loadingText}>Loading Forts Connectivity Network...</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: '#090D16',
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(9, 13, 22, 0.85)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  loadingText: {
    color: '#E2E8F0',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  errorCard: {
    position: 'absolute',
    top: 220,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(30, 41, 59, 0.95)',
    borderColor: '#3B82F6',
    borderWidth: 1,
    padding: 12,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    zIndex: 30,
  },
  errorText: {
    color: '#93C5FD',
    fontSize: 12,
    fontWeight: '500',
    flex: 1,
  },
});
