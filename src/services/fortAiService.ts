export interface FortAiInsight {
  fortName: string;
  rulerDynasty: string;
  builtCentury: string;
  keyBattles: string;
  architecturalHighlights: string;
  strategicImportance: string;
  aiNarrative: string;
}

export const FORT_AI_DATABASE: Record<string, FortAiInsight> = {
  'Raigad Fort': {
    fortName: 'Raigad Fort',
    rulerDynasty: 'Maratha Empire (Chhatrapati Shivaji Maharaj)',
    builtCentury: '11th Century (Expanded 1656)',
    keyBattles: 'Coronation of Shivaji Maharaj (1674), Siege of Raigad (1689)',
    architecturalHighlights: 'Maha Darwaza, Hirakani Buruj, Raj Sabha with acoustics designed for royal court speeches, secret escape pathways.',
    strategicImportance: 'Capital of the Maratha Empire, sheer vertical cliffs made it virtually impregnable to artillery fire.',
    aiNarrative: 'Raigad stands as the crown jewel of Maratha pride. Chosen by Chhatrapati Shivaji Maharaj as the capital in 1674, its 840-meter altitude offered unmatched defense. The famous Hirakani bastion commemorates a brave mother who scaled down the sheer cliff after sunset to reach her infant child.',
  },
  'Shivneri Fort': {
    fortName: 'Shivneri Fort',
    rulerDynasty: 'Yadavas of Devagiri / Nizam Shahi / Marathas',
    builtCentury: '1st Century AD (Fortified 16th Century)',
    keyBattles: 'Birthplace of Chhatrapati Shivaji Maharaj (1630)',
    architecturalHighlights: 'Seven fortified security gates (Maha Darwaza, Parvana Darwaza, etc.), Shivai Devi Temple, Badami Talav water tanks.',
    strategicImportance: 'Guarded the ancient trade route connecting the Konkan coast to the Deccan plateau through Naneghat pass.',
    aiNarrative: 'Shivneri is revered across India as the sacred birthplace of Chhatrapati Shivaji Maharaj (19th February 1630). Built on a steep triangular hill, it features seven formidable concentric gates designed to delay any advancing enemy force.',
  },
  'Sinhagad Fort': {
    fortName: 'Sinhagad Fort',
    rulerDynasty: 'Maratha Empire / Rashtrakutas / Mughal Empire',
    builtCentury: '2000 Years Ago (Battle of Kondhana 1670)',
    keyBattles: 'Battle of Sinhagad (1670 - Tanaji Malusare)',
    architecturalHighlights: 'Kalyan Darwaza, Pune Darwaza, Tanaji Malusare Memorial, Devgunkar Water Cisterns.',
    strategicImportance: 'Dominates the Pune skyline; securing Kondhana meant controlling the gateway to Maharashtra hinterlands.',
    aiNarrative: 'Formerly known as Kondhana, this fort earned the legendary title "Sinhagad" (Lion’s Fort) when general Tanaji Malusare scaled the sheer 300-ft vertical cliff at night using monitor lizards (ghorpad) in 1670. Upon his martyrdom in victory, Shivaji Maharaj proclaimed: "Gad ala, pan simha gela" (We won the fort, but lost the lion).',
  },
  'Rajgad Fort': {
    fortName: 'Rajgad Fort',
    rulerDynasty: 'Maratha Empire (Capital for 26 Years)',
    builtCentury: 'Ancient (Captured & Redesigned 1647)',
    keyBattles: 'Escape of Shivaji Maharaj from Agra (1666 sanctuary)',
    architecturalHighlights: 'Padmavati Machi, Sanjivani Machi (double fortified walls), Suvela Machi with natural rock hole (Nedhe), Balle Killa citadel.',
    strategicImportance: 'First sovereign capital of the Maratha Empire; impenetrable double-walled machis offered 360-degree surveillance.',
    aiNarrative: 'Rajgad served as Chhatrapati Shivaji Maharaj’s capital for over 26 years. Its serpentine Sanjivani Machi features double-walled fortifications with concealed embrasures that allowed defenders to crossfire on attackers without exposing themselves.',
  },
  'Torna Fort': {
    fortName: 'Torna Fort',
    rulerDynasty: 'Maratha Empire (First Fort Captured at Age 16)',
    builtCentury: '13th Century (Shiva Cult origins)',
    keyBattles: 'Capture of Torna (1646 by 16-year-old Shivaji)',
    architecturalHighlights: 'Prachandagad Citadel, Zunjar Machi, Menghai Devi Temple, Kothaligad bastion.',
    strategicImportance: 'Highest hill fort in Pune district (1,403m), offering panoramic oversight of Rajgad, Sinhagad, and Purandar.',
    aiNarrative: 'Torna (Prachandagad) holds immense historic weight as the very first fort captured by Chhatrapati Shivaji Maharaj in 1646 at the young age of 16. The treasure discovered during its renovation funded the construction of neighboring Rajgad Fort.',
  },
  'Pratapgad Fort': {
    fortName: 'Pratapgad Fort',
    rulerDynasty: 'Maratha Empire',
    builtCentury: 'Built 1656 by Moropant Trimbak Pingle',
    keyBattles: 'Battle of Pratapgad (1659 - Defeat of Afzal Khan)',
    architecturalHighlights: 'Upper Fort, Lower Fort, Bhavani Temple, Afzal Khan Tomb, Bronze Statue of Shivaji Maharaj.',
    strategicImportance: 'Commanded the Par pass between Mahabaleshwar and the Konkan region, effectively blocking Bijapur invasions.',
    aiNarrative: 'Pratapgad witnessed one of the most decisive battles in Indian history on 10th November 1659, when Shivaji Maharaj outmaneuvered and defeated the mighty Bijapuri commander Afzal Khan in the dense Jawali forests using tiger claws (Wagh Nakh).',
  },
  'Murud-Janjira Fort': {
    fortName: 'Murud-Janjira Fort',
    rulerDynasty: 'Siddis of Janjira (Habshi origin)',
    builtCentury: '15th Century (Fortified 17th Century)',
    keyBattles: 'Repelled Maratha, Dutch, and British naval sieges for centuries',
    architecturalHighlights: '22 massive stone bastions, Kalal Bangadi cannon, 3-story palace ruins, 2 sweet water lakes surrounded by salt ocean.',
    strategicImportance: 'Impenetrable marine fortress built on an oval rock 500m off Murud coast; commanded Arabian Sea spice trade.',
    aiNarrative: 'Murud-Janjira is legendary as an undefeated sea fortress. Surrounded entirely by the salty waters of the Arabian Sea, it remarkably possesses two deep freshwater lakes inside its walls that sustained defenders during years of naval blockades.',
  },
  'Sindhudurg Fort': {
    fortName: 'Sindhudurg Fort',
    rulerDynasty: 'Maratha Empire (Navy Command)',
    builtCentury: 'Built 1664-1667 by Hiroji Indulkar',
    keyBattles: 'Headquarters of Maratha Navy against European powers',
    architecturalHighlights: 'Hidden main entrance (Ranbaipat), palm prints & foot impressions of Shivaji Maharaj, 3km long perimeter wall with 42 bastions.',
    strategicImportance: 'Naval stronghold built on Kurte island to neutralize Siddi of Janjira and Portuguese naval supremacy along Konkan coastline.',
    aiNarrative: 'Constructed under the personal supervision of Chhatrapati Shivaji Maharaj using over 4,000 mounds of lead for foundation casting, Sindhudurg contains the only temple dedicated to Shivaji Maharaj where his original handprint and footprint are preserved.',
  },
  'Vijaydurg Fort': {
    fortName: 'Vijaydurg Fort',
    rulerDynasty: 'Maratha Empire (Kanhoji Angre Navy)',
    builtCentury: '1205 AD (Expanded by Marathas 1653)',
    keyBattles: 'Naval clash with British East India Company (1756)',
    architecturalHighlights: '27 bastions, 200-meter long underwater masonry wall acting as ship barrier, triple fortification walls, secret escape tunnel.',
    strategicImportance: 'Eastern Gibraltar of Maratha Navy; its concealed underwater barrier sank enemy ships attempting to enter Waghotan creek.',
    aiNarrative: 'Known as the "Eastern Gibraltar", Vijaydurg was the premier naval base of Admiral Kanhoji Angre. Maratha engineers built an ingenious 200-meter long underwater stone wall 3 meters below sea level that tore open the hulls of unwary enemy warships.',
  },
  'Daulatabad Fort (Devgiri)': {
    fortName: 'Daulatabad Fort (Devgiri)',
    rulerDynasty: 'Yadavas / Tughlaq Dynasty / Nizam Shahs',
    builtCentury: '1187 AD by Yadava King Bhillama V',
    keyBattles: 'Capital relocation by Muhammad bin Tughlaq (1327)',
    architecturalHighlights: 'Chand Minar, Bhulbhulaiyaa (dark optical illusion labyrinth), 50-ft deep moat with crocodiles, Chini Mahal.',
    strategicImportance: 'Conical granite hill 200 meters high, engineered with traps, optical illusions, and steep smooth rock walls impossible to scale.',
    aiNarrative: 'Daulatabad is a masterpiece of medieval military defensive engineering. Attackers entering the fort were lured into pitch-black zig-zagging tunnels (Bhulbhulaiyaa) filled with smoke pits, false steps, and dead ends where defenders ambushed them in darkness.',
  },
};

export function getFortAiInsight(fortName: string): FortAiInsight {
  if (FORT_AI_DATABASE[fortName]) {
    return FORT_AI_DATABASE[fortName];
  }

  // Dynamic AI Fallback Generator for any fort
  return {
    fortName: fortName,
    rulerDynasty: 'Maratha Empire / Regional Chieftains',
    builtCentury: '12th - 17th Century Medieval Era',
    keyBattles: `Strategic defensive military outpost during the Maratha expansion era in Western Ghats.`,
    architecturalHighlights: 'Stone bastions, arched security gateways, carved water cisterns (tanks), and natural cliff ramparts.',
    strategicImportance: 'Commanded high elevation oversight across Sahyadri mountain passes and regional trade corridors.',
    aiNarrative: `${fortName} played a crucial role in Maharashtra's rich military heritage. Built atop strategic Sahyadri mountain terrain, it utilized natural rock topography combined with heavy stone masonry bastions to provide early warning and defense against invader forces.`,
  };
}
