// 포켓몬 카드 확장팩 메타데이터
// API 소스: pokemontcg.io (영문 세트 ID 기준)

const RARITY_CODE_MAP = {
    'Common':                        'C',
    'Uncommon':                      'U',
    'Rare':                          'R',
    'Rare Holo':                     'R',
    'Rare Holo V':                   'RR',
    'Rare Holo VMAX':                'RRR',
    'Rare Holo VSTAR':               'RRR',
    'Double Rare':                   'RR',
    'Radiant Rare':                  'RRR',
    'Ultra Rare':                    'UR',
    'Illustration Rare':             'AR',
    'Special Illustration Rare':     'SAR',
    'Hyper Rare':                    'HR',
    'ACE SPEC Rare':                 'ACE',
    'Shiny Rare':                    'S',
    'Shiny Ultra Rare':              'SR',
    'Secret Rare':                   'SR',
    'Trainer Gallery Rare Holo':     'TR',
    'Amazing Rare':                  'AR',
    'Rare Rainbow':                  'UR',
    'Rare Shiny':                    'S',
    'Rare Shiny GX':                 'SSR',
    'Promo':                         'PROMO',
    'Classic Collection':            'CSR',
    'Master Ball Rare':              'MA',
};

const RARITY_STYLE = {
    'C':     { bg: '#64748b', text: '#fff' },
    'U':     { bg: '#22c55e', text: '#fff' },
    'R':     { bg: '#3b82f6', text: '#fff' },
    'BWR':   { bg: '#1e3a5f', text: '#fff' },
    'RR':    { bg: '#8b5cf6', text: '#fff' },
    'RRR':   { bg: '#f97316', text: '#fff' },
    'S':     { bg: '#06b6d4', text: '#fff' },
    'CHR':   { bg: '#ec4899', text: '#fff' },
    'AR':    { bg: '#0ea5e9', text: '#fff' },
    'K':     { bg: '#84cc16', text: '#fff' },
    'A':     { bg: '#a855f7', text: '#fff' },
    'CSR':   { bg: '#7c3aed', text: '#fff' },
    'SSR':   { bg: '#db2777', text: '#fff' },
    'SR':    { bg: '#e879f9', text: '#fff' },
    'TR':    { bg: '#a78bfa', text: '#fff' },
    'MA':    { bg: '#1d4ed8', text: '#fff' },
    'ACE':   { bg: '#4f46e5', text: '#fff' },
    'SAR':   { bg: '#f59e0b', text: '#fff' },
    'PR':    { bg: '#14b8a6', text: '#fff' },
    'UR':    { bg: '#f43f5e', text: '#fff' },
    'HR':    { bg: '#be185d', text: '#fff' },
    'MUR':   { bg: '#7f1d1d', text: '#fff' },
    'PROMO': { bg: '#10b981', text: '#fff' },
};

// 레어리티 표시 순서 (필터 드롭다운용)
const RARITY_ORDER = [
    'C','U','R','BWR','RR','RRR','S','CHR','AR','K','A',
    'CSR','SSR','SR','TR','MA','ACE','SAR','PR','UR','HR','MUR','PROMO'
];

// 카드 수퍼타입 → 한국어
const SUPERTYPE_KR = {
    'Pokémon': '포켓몬',
    'Trainer': '트레이너스',
    'Energy':  '에너지',
};

const POKEMON_CARD_SETS = [
    /* ── SV 확장팩 ─────────────────────────────────────── */
    {
        id: 'sv1', type: 'expansion', series: 'SV',
        name: { kr: '스칼렛 & 바이올렛', jp: 'スカーレット・バイオレット', en: 'Scarlet & Violet', cn: '朱·紫' },
        releaseDate: { kr: '2023-01-20', jp: '2022-12-02', en: '2023-03-31', cn: '2023-03-31' },
        color: '#c0392b',
    },
    {
        id: 'sv2', type: 'expansion', series: 'SV',
        name: { kr: '팔데아의 진화', jp: 'トリプレットビート', en: 'Paldea Evolved', cn: '帕底亚的进化' },
        releaseDate: { kr: '2023-03-10', jp: '2023-03-10', en: '2023-06-09', cn: '2023-06-09' },
        color: '#7b2d8b',
    },
    {
        id: 'sv3', type: 'expansion', series: 'SV',
        name: { kr: '흑염의 지배자', jp: 'クレイバースト', en: 'Obsidian Flames', cn: '黑焰的支配者' },
        releaseDate: { kr: '2023-06-09', jp: '2023-04-14', en: '2023-08-11', cn: '2023-08-11' },
        color: '#e25822',
    },
    {
        id: 'sv3pt5', type: 'expansion', series: 'SV',
        name: { kr: '포켓몬 151', jp: 'ポケモンカード151', en: '151', cn: '神奇宝贝 151' },
        releaseDate: { kr: '2023-06-16', jp: '2023-06-16', en: '2023-09-22', cn: '2023-09-22' },
        color: '#e63946',
    },
    {
        id: 'sv4', type: 'expansion', series: 'SV',
        name: { kr: '고대의 포효·미래의 플래시', jp: '古代の咆哮·未来の一閃', en: 'Paradox Rift', cn: '古代咆哮·未来闪光' },
        releaseDate: { kr: '2023-10-27', jp: '2023-10-27', en: '2023-11-03', cn: '2023-11-03' },
        color: '#9333ea',
    },
    {
        id: 'sv4pt5', type: 'expansion', series: 'SV',
        name: { kr: '빛나는 보물 ex', jp: 'レイジングサーフ', en: 'Paldean Fates', cn: '闪耀宝藏 ex' },
        releaseDate: { kr: '2024-01-19', jp: '2023-09-22', en: '2024-01-26', cn: '2024-01-26' },
        color: '#f59e0b',
    },
    {
        id: 'sv5', type: 'expansion', series: 'SV',
        name: { kr: '사이버 저지', jp: 'サイバージャッジ', en: 'Temporal Forces', cn: '时间审判' },
        releaseDate: { kr: '2024-01-26', jp: '2024-01-26', en: '2024-03-22', cn: '2024-03-22' },
        color: '#0ea5e9',
    },
    {
        id: 'sv6', type: 'expansion', series: 'SV',
        name: { kr: '마스카레이드의 달빛', jp: 'ナイトワンダラー', en: 'Twilight Masquerade', cn: '假面夜游者' },
        releaseDate: { kr: '2024-06-07', jp: '2024-06-07', en: '2024-05-24', cn: '2024-05-24' },
        color: '#6366f1',
    },
    {
        id: 'sv6pt5', type: 'expansion', series: 'SV',
        name: { kr: '변환의 마스크', jp: 'ロストアビス', en: 'Shrouded Fable', cn: '神秘面具' },
        releaseDate: { kr: '2024-07-19', jp: '2024-07-19', en: '2024-08-02', cn: '2024-08-02' },
        color: '#8b5cf6',
    },
    {
        id: 'sv7', type: 'expansion', series: 'SV',
        name: { kr: '스텔라 미라클', jp: 'ステラミラクル', en: 'Stellar Crown', cn: '星晶奇迹' },
        releaseDate: { kr: '2024-09-13', jp: '2024-07-19', en: '2024-09-13', cn: '2024-09-13' },
        color: '#f43f5e',
    },
    {
        id: 'sv8', type: 'expansion', series: 'SV',
        name: { kr: '초전자 브레이커', jp: '超電ブレイカー', en: 'Surging Sparks', cn: '超电破坏者' },
        releaseDate: { kr: '2024-11-08', jp: '2024-09-13', en: '2024-11-08', cn: '2024-11-08' },
        color: '#eab308',
    },
    {
        id: 'sv8pt5', type: 'expansion', series: 'SV',
        name: { kr: '프리즘매틱 에볼루션', jp: 'テラスタルフェスex', en: 'Prismatic Evolutions', cn: '太晶庆典 ex' },
        releaseDate: { kr: '2025-01-17', jp: '2024-12-06', en: '2025-01-17', cn: '2025-01-17' },
        color: '#a855f7',
    },
    {
        id: 'sv9', type: 'expansion', series: 'SV',
        name: { kr: '반짝이는 시간', jp: 'バトルパートナーズ', en: 'Journey Together', cn: '闪耀时光' },
        releaseDate: { kr: '2025-03-28', jp: '2025-01-24', en: '2025-03-28', cn: '2025-03-28' },
        color: '#10b981',
    },
    {
        id: 'sv9pt5', type: 'expansion', series: 'SV',
        name: { kr: '유나이티드 파워', jp: 'ユナイテッドパワー', en: 'Destined Rivals', cn: '联合力量' },
        releaseDate: { kr: '2025-05-30', jp: '2025-03-28', en: '2025-05-30', cn: '2025-05-30' },
        color: '#ef4444',
    },

    /* ── 구축덱 ──────────────────────────────────────── */
    {
        id: 'svp', type: 'promo', series: 'SV',
        name: { kr: 'SV 프로모 카드', jp: 'SVプロモカード', en: 'SV Black Star Promos', cn: 'SV 宣传卡' },
        releaseDate: { kr: '2023-01-20', jp: '2022-12-02', en: '2023-03-31', cn: '2023-03-31' },
        color: '#475569',
    },
];
