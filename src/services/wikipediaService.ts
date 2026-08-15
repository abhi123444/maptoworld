export interface WikipediaFortData {
  title: string;
  extract: string;
  thumbnail?: string;
  wikiUrl: string;
  description?: string;
  langCode: string;
}

export async function fetchFortWikipedia(
  fortName: string,
  langCode: string = 'mr'
): Promise<WikipediaFortData> {
  const cleanName = fortName.trim();
  const wikiDomain = langCode || 'mr';

  // Wikipedia REST API endpoint for specific Indian language (mr, hi, gu, ta, te, kn, bn, ml, en)
  const wikiApiUrl = `https://${wikiDomain}.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(cleanName)}`;

  try {
    const res = await fetch(wikiApiUrl);
    if (res.ok) {
      const data = await res.json();
      if (data && data.extract) {
        return {
          title: data.title || cleanName,
          extract: data.extract,
          thumbnail: data.thumbnail?.source,
          wikiUrl:
            data.content_urls?.desktop?.page ||
            `https://${wikiDomain}.wikipedia.org/wiki/${encodeURIComponent(cleanName)}`,
          description: data.description,
          langCode: wikiDomain,
        };
      }
    }
  } catch (err) {
    console.warn(`Wikipedia API fetch error for [${wikiDomain}]:`, err);
  }

  // Fallback to English Wikipedia if native language article not found
  if (wikiDomain !== 'en') {
    try {
      const enRes = await fetch(
        `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(cleanName)}`
      );
      if (enRes.ok) {
        const enData = await enRes.json();
        if (enData && enData.extract) {
          return {
            title: enData.title || cleanName,
            extract: enData.extract,
            thumbnail: enData.thumbnail?.source,
            wikiUrl:
              enData.content_urls?.desktop?.page ||
              `https://en.wikipedia.org/wiki/${encodeURIComponent(cleanName)}`,
            description: enData.description,
            langCode: 'en',
          };
        }
      }
    } catch (e) {
      // fallback
    }
  }

  // Curated Marathi / English Wikipedia fallback
  const fallbackWiki: Record<string, WikipediaFortData> = {
    'Raigad Fort': {
      title: 'रायगड किल्ला (Raigad Fort)',
      extract:
        'रायगड हा महाराष्ट्रातील रायगड जिल्ह्यातील महाडजवळ असलेला एक अतिशय प्रेक्षणीय व ऐतिहासिक किल्ला आहे. छत्रपती शिवाजी महाराजांनी १६७४ मध्ये राज्याभिषेकाच्या वेळी रायगड ही मराठा साम्राज्याची राजधानी घोषित केली होती.',
      wikiUrl: 'https://mr.wikipedia.org/wiki/%E0%A4%B0%E0%A4%BE%E0%A4%AF%E0%A4%97%E0%A4%A1',
      description: 'मराठा साम्राज्याची राजधानी',
      langCode: 'mr',
    },
    'Shivneri Fort': {
      title: 'शिवनेरी किल्ला (Shivneri Fort)',
      extract:
        'शिवनेरी किल्ला हा महाराष्ट्र राज्यातील पुणे जिल्ह्यातील जुन्नर शहरात असलेला एक प्रसिद्ध किल्ला आहे. छत्रपती शिवाजी महाराजांचा जन्म १९ फेब्रुवारी १६३० रोजी याच शिवनेरी किल्ल्यावर झाला.',
      wikiUrl: 'https://mr.wikipedia.org/wiki/%E0%A4%B6%E0%A4%BF%E0%A4%B5%E0%A4%A8%E0%A5%87%E0%A4%B0%E0%A5%80',
      description: 'छत्रपती शिवाजी महाराजांचे जन्मस्थान',
      langCode: 'mr',
    },
    'Sinhagad Fort': {
      title: 'सिंहगड किल्ला (Sinhagad Fort)',
      extract:
        'सिंहगड (पूर्वीचा कोंढाणा) हा महाराष्ट्रातील पुणे शहरापासून आग्नेयेस सुमारे ३० किमी अंतरावर असलेला एक ऐतिहासिक किल्ला आहे. तानाजी मालुसरे यांनी १६७० मध्ये हा किल्ला सर केला.',
      wikiUrl: 'https://mr.wikipedia.org/wiki/%E0%A4%B8%E0%A4%BF%E0%A4%82%E0%A4%B9%E0%A4%97%E0%A4%A1',
      description: 'पुण्याजवळील प्रसिद्ध गड',
      langCode: 'mr',
    },
  };

  if (fallbackWiki[cleanName]) {
    return fallbackWiki[cleanName];
  }

  return {
    title: cleanName,
    extract: `${cleanName} हा महाराष्ट्रातील सह्याद्री पर्वतरांगेतील एक ऐतिहासिक किल्ला आहे.`,
    wikiUrl: `https://${wikiDomain}.wikipedia.org/wiki/${encodeURIComponent(cleanName)}`,
    description: 'महाराष्ट्रातील ऐतिहासिक किल्ला',
    langCode: wikiDomain,
  };
}
