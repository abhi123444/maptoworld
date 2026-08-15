import customMapStyle from '../../assets/style.json';
import { FORT_TRANSLATIONS } from './languages';

export interface WorldLocation {
  id: string;
  name: string;
  country: string;
  flag: string;
  latitude: number;
  longitude: number;
  zoom: number;
  pitch: number;
  bearing: number;
  category: 'Hill Fort' | 'Sea Fort' | 'Land Fort' | string;
  description: string;
  population: string;
  landmark: string;
  image: string;
}

export interface MapStyleOption {
  id: string;
  name: string;
  url: string | object;
  icon: string;
}

export const USER_CUSTOM_STYLE_URL = 'mapbox://styles/llavhe0/cmsu0cu43002101qw5fgj8328';
export const CUSTOM_ASSETS_STYLE = customMapStyle;

export const MAPBOX_ACCESS_TOKEN =
  process.env.EXPO_PUBLIC_MAPBOX_ACCESS_TOKEN ||
  process.env.REACT_APP_MAPBOX_ACCESS_TOKEN ||
  process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN ||
  process.env.MAPBOX_ACCESS_TOKEN ||
  'YOUR_MAPBOX_ACCESS_TOKEN';

export const DEFAULT_INITIAL_REGION = {
  latitude: 18.8,
  longitude: 73.8,
  zoom: 8.2,
  pitch: 45,
  bearing: 0,
};

export const MAP_STYLES: MapStyleOption[] = [
  {
    id: 'outdoors',
    name: 'Outdoors 3D Terrain',
    url: 'mapbox://styles/mapbox/outdoors-v12',
    icon: 'compass-outline',
  },
  {
    id: 'user-custom-url',
    name: 'Studio Style (llavhe0)',
    url: USER_CUSTOM_STYLE_URL,
    icon: 'color-palette-outline',
  },
  {
    id: 'satellite',
    name: 'Satellite 3D',
    url: 'mapbox://styles/mapbox/satellite-streets-v12',
    icon: 'earth-outline',
  },
  {
    id: 'streets',
    name: 'Streets 3D',
    url: 'mapbox://styles/mapbox/streets-v12',
    icon: 'map-outline',
  },
  {
    id: 'dark',
    name: 'Dark Vector',
    url: 'mapbox://styles/mapbox/dark-v11',
    icon: 'moon-outline',
  },
  {
    id: 'assets-custom',
    name: 'Assets style.json',
    url: customMapStyle,
    icon: 'code-working-outline',
  },
];

export const FORTS_GEOJSON = {
  "type": "FeatureCollection",
  "features": [
    { "type": "Feature", "geometry": { "type": "Point", "coordinates": [73.44, 18.2408] }, "properties": { "name": "Raigad Fort", "district": "Raigad", "type": "Hill Fort" } },
    { "type": "Feature", "geometry": { "type": "Point", "coordinates": [73.8567, 19.1968] }, "properties": { "name": "Shivneri Fort", "district": "Pune", "type": "Hill Fort" } },
    { "type": "Feature", "geometry": { "type": "Point", "coordinates": [73.755, 18.3664] }, "properties": { "name": "Sinhagad Fort", "district": "Pune", "type": "Hill Fort" } },
    { "type": "Feature", "geometry": { "type": "Point", "coordinates": [73.6693, 18.2467] }, "properties": { "name": "Rajgad Fort", "district": "Pune", "type": "Hill Fort" } },
    { "type": "Feature", "geometry": { "type": "Point", "coordinates": [73.6162, 18.2789] }, "properties": { "name": "Torna Fort", "district": "Pune", "type": "Hill Fort" } },
    { "type": "Feature", "geometry": { "type": "Point", "coordinates": [73.5847, 17.9314] }, "properties": { "name": "Pratapgad Fort", "district": "Satara", "type": "Hill Fort" } },
    { "type": "Feature", "geometry": { "type": "Point", "coordinates": [74.1086, 16.8125] }, "properties": { "name": "Panhala Fort", "district": "Kolhapur", "type": "Hill Fort" } },
    { "type": "Feature", "geometry": { "type": "Point", "coordinates": [73.97, 16.15] }, "properties": { "name": "Vishalgad Fort", "district": "Kolhapur", "type": "Hill Fort" } },
    { "type": "Feature", "geometry": { "type": "Point", "coordinates": [73.4794, 18.7106] }, "properties": { "name": "Lohagad Fort", "district": "Pune", "type": "Hill Fort" } },
    { "type": "Feature", "geometry": { "type": "Point", "coordinates": [73.489, 18.705] }, "properties": { "name": "Visapur Fort", "district": "Pune", "type": "Hill Fort" } },
    { "type": "Feature", "geometry": { "type": "Point", "coordinates": [73.4833, 18.75] }, "properties": { "name": "Rajmachi Fort", "district": "Pune", "type": "Hill Fort" } },
    { "type": "Feature", "geometry": { "type": "Point", "coordinates": [73.4333, 18.6167] }, "properties": { "name": "Korigad Fort", "district": "Pune", "type": "Hill Fort" } },
    { "type": "Feature", "geometry": { "type": "Point", "coordinates": [73.4, 18.6667] }, "properties": { "name": "Tikona Fort", "district": "Pune", "type": "Hill Fort" } },
    { "type": "Feature", "geometry": { "type": "Point", "coordinates": [73.9833, 18.2833] }, "properties": { "name": "Purandar Fort", "district": "Pune", "type": "Hill Fort" } },
    { "type": "Feature", "geometry": { "type": "Point", "coordinates": [73.8, 17.5833] }, "properties": { "name": "Vasota Fort", "district": "Satara", "type": "Hill Fort" } },
    { "type": "Feature", "geometry": { "type": "Point", "coordinates": [73.7667, 19.3833] }, "properties": { "name": "Harishchandragad Fort", "district": "Ahmednagar", "type": "Hill Fort" } },
    { "type": "Feature", "geometry": { "type": "Point", "coordinates": [73.6667, 19.5167] }, "properties": { "name": "Ratangad Fort", "district": "Ahmednagar", "type": "Hill Fort" } },
    { "type": "Feature", "geometry": { "type": "Point", "coordinates": [74.0, 17.6667] }, "properties": { "name": "Ajinkyatara Fort", "district": "Satara", "type": "Hill Fort" } },
    { "type": "Feature", "geometry": { "type": "Point", "coordinates": [73.3667, 18.5667] }, "properties": { "name": "Sudhagad Fort", "district": "Raigad", "type": "Hill Fort" } },
    { "type": "Feature", "geometry": { "type": "Point", "coordinates": [73.1, 17.85] }, "properties": { "name": "Suvarnadurg Fort", "district": "Ratnagiri", "type": "Sea Fort" } },
    { "type": "Feature", "geometry": { "type": "Point", "coordinates": [73.3333, 16.5667] }, "properties": { "name": "Vijaydurg Fort", "district": "Sindhudurg", "type": "Sea Fort" } },
    { "type": "Feature", "geometry": { "type": "Point", "coordinates": [73.4833, 16.0333] }, "properties": { "name": "Sindhudurg Fort", "district": "Sindhudurg", "type": "Sea Fort" } },
    { "type": "Feature", "geometry": { "type": "Point", "coordinates": [72.95, 18.0167] }, "properties": { "name": "Murud-Janjira Fort", "district": "Raigad", "type": "Sea Fort" } },
    { "type": "Feature", "geometry": { "type": "Point", "coordinates": [75.2144, 19.9425] }, "properties": { "name": "Daulatabad Fort (Devgiri)", "district": "Chhatrapati Sambhajinagar", "type": "Hill Fort" } },
    { "type": "Feature", "geometry": { "type": "Point", "coordinates": [74.75, 19.0833] }, "properties": { "name": "Ahmednagar Fort", "district": "Ahmednagar", "type": "Land Fort" } },
    { "type": "Feature", "geometry": { "type": "Point", "coordinates": [77.3167, 21.3667] }, "properties": { "name": "Gawilgad Fort", "district": "Amravati", "type": "Hill Fort" } },
    { "type": "Feature", "geometry": { "type": "Point", "coordinates": [77.0667, 21.2667] }, "properties": { "name": "Narnala Fort", "district": "Akola", "type": "Hill Fort" } },
    { "type": "Feature", "geometry": { "type": "Point", "coordinates": [73.9167, 17.6833] }, "properties": { "name": "Sajjangad Fort", "district": "Satara", "type": "Hill Fort" } },
    { "type": "Feature", "geometry": { "type": "Point", "coordinates": [73.1333, 19.15] }, "properties": { "name": "Malanggad Fort", "district": "Thane", "type": "Hill Fort" } },
    { "type": "Feature", "geometry": { "type": "Point", "coordinates": [73.2, 19.0833] }, "properties": { "name": "Prabalgad Fort", "district": "Raigad", "type": "Hill Fort" } },
    { "type": "Feature", "geometry": { "type": "Point", "coordinates": [73.2167, 19.05] }, "properties": { "name": "Irshalgad Fort", "district": "Raigad", "type": "Hill Fort" } },
    { "type": "Feature", "geometry": { "type": "Point", "coordinates": [73.5333, 19.2333] }, "properties": { "name": "Mahuli Fort", "district": "Thane", "type": "Hill Fort" } },
    { "type": "Feature", "geometry": { "type": "Point", "coordinates": [73.8333, 19.7333] }, "properties": { "name": "Alang Fort", "district": "Nashik", "type": "Hill Fort" } },
    { "type": "Feature", "geometry": { "type": "Point", "coordinates": [73.85, 19.7167] }, "properties": { "name": "Kulang Fort", "district": "Nashik", "type": "Hill Fort" } },
    { "type": "Feature", "geometry": { "type": "Point", "coordinates": [73.5333, 20.05] }, "properties": { "name": "Salher Fort", "district": "Nashik", "type": "Hill Fort" } },
    { "type": "Feature", "geometry": { "type": "Point", "coordinates": [73.95, 19.95] }, "properties": { "name": "Trimbakgad Fort", "district": "Nashik", "type": "Hill Fort" } },
    { "type": "Feature", "geometry": { "type": "Point", "coordinates": [73.75, 19.6167] }, "properties": { "name": "Ankai-Tankai Fort", "district": "Nashik", "type": "Hill Fort" } },
    { "type": "Feature", "geometry": { "type": "Point", "coordinates": [73.4167, 18.8167] }, "properties": { "name": "Kothaligad (Peth) Fort", "district": "Raigad", "type": "Hill Fort" } },
    { "type": "Feature", "geometry": { "type": "Point", "coordinates": [73.45, 19.4167] }, "properties": { "name": "Gorakhgad Fort", "district": "Thane", "type": "Hill Fort" } },
    { "type": "Feature", "geometry": { "type": "Point", "coordinates": [73.4667, 19.4] }, "properties": { "name": "Siddhagad Fort", "district": "Thane", "type": "Hill Fort" } }
  ]
};

// Calculate nearest neighbor connections between forts
export const CONNECTIVITY_GEOJSON = (() => {
  const lines: any[] = [];
  const addedPairs = new Set<string>();

  const getDistanceSq = (c1: number[], c2: number[]) => {
    const dx = c1[0] - c2[0];
    const dy = c1[1] - c2[1];
    return dx * dx + dy * dy;
  };

  FORTS_GEOJSON.features.forEach((f1, i) => {
    const coord1 = f1.geometry.coordinates;

    const distances = FORTS_GEOJSON.features
      .map((f2, j) => ({
        index: j,
        dist: i === j ? Infinity : getDistanceSq(coord1, f2.geometry.coordinates),
        coord: f2.geometry.coordinates,
      }))
      .sort((a, b) => a.dist - b.dist);

    // Connect to 2 nearest neighbors
    distances.slice(0, 2).forEach((n) => {
      const pairKey = [Math.min(i, n.index), Math.max(i, n.index)].join('-');
      if (!addedPairs.has(pairKey)) {
        addedPairs.add(pairKey);
        lines.push({
          type: 'Feature',
          geometry: {
            type: 'LineString',
            coordinates: [coord1, n.coord],
          },
          properties: {
            from: f1.properties.name,
            to: FORTS_GEOJSON.features[n.index].properties.name,
          },
        });
      }
    });
  });

  return {
    type: 'FeatureCollection',
    features: lines,
  };
})();

export function getLocalizedLocations(langCode: string = 'mr'): WorldLocation[] {
  const translations = FORT_TRANSLATIONS[langCode] || FORT_TRANSLATIONS['mr'] || FORT_TRANSLATIONS['en'] || {};

  return FORTS_GEOJSON.features.map((feat, idx) => {
    const [lng, lat] = feat.geometry.coordinates;
    const props = feat.properties;
    const fortKey = props.name;

    const fortTrans = translations[fortKey] || {
      name: props.name,
      district: `${props.district} District`,
      type: props.type,
      desc: `Historic ${props.type.toLowerCase()} in ${props.district} district of Maharashtra.`,
      landmark: `${props.type} • ${props.district}`,
    };

    const isSeaFort = props.type === 'Sea Fort';
    const isLandFort = props.type === 'Land Fort';

    return {
      id: `fort-${idx}-${props.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
      name: fortTrans.name,
      country: fortTrans.district,
      flag: isSeaFort ? '🌊' : isLandFort ? '🏰' : '⛰️',
      longitude: lng,
      latitude: lat,
      zoom: 14,
      pitch: 55,
      bearing: 15,
      category: fortTrans.type,
      description: fortTrans.desc,
      population: fortTrans.district,
      landmark: fortTrans.landmark,
      image: isSeaFort
        ? 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&auto=format&fit=crop&q=80'
        : 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=600&auto=format&fit=crop&q=80',
    };
  });
}

export const FEATURED_LOCATIONS: WorldLocation[] = getLocalizedLocations('mr');
