import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dataDir = join(root, 'data');

const VISIT_TIME_LABELS = {
  점심: '점심에 방문',
  아침: '아침에 방문',
  오전: '오전에 방문',
  오후: '오후에 방문',
  저녁: '저녁에 방문',
};

const DATASETS = [
  {
    storeItemsFile: 'trendeat_macao_crack_cookie_store_items.csv',
    reviewsFile: 'trendeat_macao_crack_cookie_reviews.csv',
    outPath: join(root, 'src/app/data/macaoCrackCookie.generated.ts'),
    exportPrefix: 'MACAO_CRACK_COOKIE',
    mapCategory: '마카오크랙쿠키',
    storeLocations: {
      macao_cookie_01: '서울 성수동',
      macao_cookie_02: '서울 성수동',
      macao_cookie_03: '서울 성수동',
      macao_cookie_04: '서울 성수동',
      macao_cookie_05: '서울 성수동',
    },
    mapPositions: {
      macao_cookie_01: { xPercent: 72, yPercent: 36 },
      macao_cookie_02: { xPercent: 80, yPercent: 44 },
      macao_cookie_03: { xPercent: 66, yPercent: 52 },
      macao_cookie_04: { xPercent: 84, yPercent: 32 },
      macao_cookie_05: { xPercent: 74, yPercent: 48 },
    },
  },
  {
    storeItemsFile: 'trendeat_bangkok_roti_fry_store_items.csv',
    reviewsFile: 'trendeat_bangkok_roti_fry_reviews.csv',
    outPath: join(root, 'src/app/data/bangkokRotiFry.generated.ts'),
    exportPrefix: 'BANGKOK_ROTI_FRY',
    mapCategory: '방콕로띠튀김',
    storeLocations: {
      bangkok_roti_01: '서울 성수동',
      bangkok_roti_02: '서울 성수동',
      bangkok_roti_03: '서울 성수동',
      bangkok_roti_04: '서울 성수동',
      bangkok_roti_05: '서울 성수동',
    },
    mapPositions: {
      bangkok_roti_01: { xPercent: 68, yPercent: 38 },
      bangkok_roti_02: { xPercent: 78, yPercent: 50 },
      bangkok_roti_03: { xPercent: 62, yPercent: 46 },
      bangkok_roti_04: { xPercent: 82, yPercent: 28 },
      bangkok_roti_05: { xPercent: 70, yPercent: 54 },
    },
  },
  {
    storeItemsFile: 'trendeat_la_crotaco_store_items.csv',
    reviewsFile: 'trendeat_la_crotaco_reviews.csv',
    outPath: join(root, 'src/app/data/laCrotaco.generated.ts'),
    exportPrefix: 'LA_CROTACO',
    mapCategory: 'LA크로타코',
    storeLocations: {
      la_crotaco_01: '서울 성수동',
      la_crotaco_02: '서울 성수동',
      la_crotaco_03: '서울 성수동',
      la_crotaco_04: '서울 성수동',
      la_crotaco_05: '서울 성수동',
    },
    mapPositions: {
      la_crotaco_01: { xPercent: 76, yPercent: 34 },
      la_crotaco_02: { xPercent: 86, yPercent: 42 },
      la_crotaco_03: { xPercent: 64, yPercent: 58 },
      la_crotaco_04: { xPercent: 88, yPercent: 36 },
      la_crotaco_05: { xPercent: 72, yPercent: 42 },
    },
  },
];

function stripBom(text) {
  return text.charCodeAt(0) === 0xfeff ? text.slice(1) : text;
}

function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = '';
  let inQuotes = false;

  for (let i = 0; i < text.length; i += 1) {
    const char = text[i];
    if (char === '"') {
      if (inQuotes && text[i + 1] === '"') {
        field += '"';
        i += 1;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      row.push(field);
      field = '';
    } else if ((char === '\n' || char === '\r') && !inQuotes) {
      if (char === '\r' && text[i + 1] === '\n') i += 1;
      row.push(field);
      if (row.some((cell) => cell.length > 0)) rows.push(row);
      row = [];
      field = '';
    } else {
      field += char;
    }
  }

  if (field.length > 0 || row.length > 0) {
    row.push(field);
    if (row.some((cell) => cell.length > 0)) rows.push(row);
  }

  return rows;
}

function rowsToObjects(rows) {
  const [header, ...body] = rows;
  return body.map((cells) =>
    Object.fromEntries(header.map((key, index) => [key, cells[index] ?? ''])),
  );
}

function parseBool(value) {
  return String(value).toUpperCase() === 'TRUE';
}

function parseNum(value) {
  const n = Number(value);
  return Number.isFinite(n) ? n : 0;
}

function escapeTs(value) {
  return JSON.stringify(value);
}

function reviewTimeLabel(reviewIndex) {
  const days = Math.max(1, (180 - reviewIndex) % 28);
  if (days === 1) return '1일 전';
  if (days < 7) return `${days}일 전`;
  const weeks = Math.floor(days / 7);
  return weeks === 1 ? '1주 전' : `${weeks}주 전`;
}

function toStoreReview(row, reviewIndex) {
  const visitTime = VISIT_TIME_LABELS[row.visit_time] ?? `${row.visit_time}에 방문`;
  const visitDay = `${row.visit_day_type}에 방문`;
  const waitMin = parseNum(row.reported_wait_min);
  const waiting = waitMin > 0 ? `웨이팅 ${waitMin}분` : '웨이팅 없음';

  return {
    author: row.user_id,
    authorInitial: [...row.user_id][0] ?? '?',
    time: reviewTimeLabel(reviewIndex),
    satisfied: row.satisfaction === '만족',
    matchRate: parseNum(row.taste_match_rate),
    visitTime,
    visitDay,
    waiting,
    text: row.review_text ?? '',
    imageCount: parseNum(row.photo_count),
  };
}

function generateDataset(config) {
  const storeItemsText = stripBom(readFileSync(join(dataDir, config.storeItemsFile), 'utf8'));
  const reviewsText = stripBom(readFileSync(join(dataDir, config.reviewsFile), 'utf8'));

  const storeItems = rowsToObjects(parseCsv(storeItemsText));
  const reviewRows = rowsToObjects(parseCsv(reviewsText));

  const reviewsByStore = new Map();
  reviewRows.forEach((row, index) => {
    const list = reviewsByStore.get(row.store_item_id) ?? [];
    list.push(toStoreReview(row, index + 1));
    reviewsByStore.set(row.store_item_id, list);
  });

  const storeEntries = storeItems.map((item) => {
    const id = item.store_item_id;
    const reviews = reviewsByStore.get(id) ?? [];

    return {
      id,
      name: item.store_name,
      menuName: item.dessert_name,
      location: config.storeLocations[id] ?? '서울 성수동',
      price: `${item.price_krw}원`,
      priceUnit: '(개당)',
      waitingTime: item.wait_display,
      reviewCount: parseNum(item.review_count),
      avgScore: parseNum(item.overall_trendeat_score),
      similarScore: parseNum(item.similar_user_trendeat_score),
      reviews,
      meta: {
        storeType: item.store_type,
        overallRank: parseNum(item.overall_rank),
        tasteRank: parseNum(item.taste_rank),
        tasteKeywords: item.taste_keywords.split(';').map((s) => s.trim()).filter(Boolean),
        textureKeywords: item.texture_keywords.split(';').map((s) => s.trim()).filter(Boolean),
        featureSummary: item.feature_summary,
        pros: item.pros.split(';').map((s) => s.trim()).filter(Boolean),
        cons: item.cons.split(';').map((s) => s.trim()).filter(Boolean),
      },
      map: {
        highlightMenu: item.dessert_name,
        categories: [config.mapCategory],
        position: config.mapPositions[id] ?? { xPercent: 75, yPercent: 40 },
        preferenceMatch: parseNum(item.similar_user_trendeat_score),
        trendScore: parseNum(item.overall_trendeat_score),
        price: parseNum(item.price_krw),
        waitingMinutes: parseNum(item.avg_wait_min),
        reviewCount: parseNum(item.review_count),
        district: config.storeLocations[id] ?? '서울 성수동',
      },
      foodStore: {
        storeId: id,
        rank: parseNum(item.overall_rank),
        name: item.store_name,
      },
    };
  });

  const trendingPool = reviewRows
    .filter((row) => parseBool(row.has_text) && row.review_text.trim().length > 0)
    .sort((a, b) => parseNum(b.taste_match_rate) - parseNum(a.taste_match_rate))
    .slice(0, 6)
    .map((row, index) => {
      const visitTime = VISIT_TIME_LABELS[row.visit_time] ?? `${row.visit_time}에 방문`;
      const visitDay = `${row.visit_day_type}에 방문`;
      const waitMin = parseNum(row.reported_wait_min);
      const waiting = waitMin > 0 ? `웨이팅 ${waitMin}분` : '웨이팅 없음';

      return {
        authorInitial: [...row.user_id][0] ?? '?',
        author: row.user_id,
        time: reviewTimeLabel(index + 1),
        matchRate: parseNum(row.taste_match_rate),
        satisfied: row.satisfaction === '만족',
        visitInfo: `${visitTime} | ${visitDay} | ${waiting}`,
        text: row.review_text,
        imageCount: parseNum(row.photo_count),
      };
    });

  const prefix = config.exportPrefix;
  const metaTypeName = `${prefix.charAt(0)}${prefix.slice(1).toLowerCase().replace(/_([a-z])/g, (_, c) => c.toUpperCase())}StoreMeta`;

  const storeBlocks = storeEntries
    .map((entry) => {
      const reviewLines = entry.reviews
        .map(
          (review) => `      {
        author: ${escapeTs(review.author)},
        authorInitial: ${escapeTs(review.authorInitial)},
        time: ${escapeTs(review.time)},
        satisfied: ${review.satisfied},
        matchRate: ${review.matchRate},
        visitTime: ${escapeTs(review.visitTime)},
        visitDay: ${escapeTs(review.visitDay)},
        waiting: ${escapeTs(review.waiting)},
        text: ${escapeTs(review.text)},
        imageCount: ${review.imageCount},
      }`,
        )
        .join(',\n');

      return `  ${escapeTs(entry.id)}: {
    id: ${escapeTs(entry.id)},
    name: ${escapeTs(entry.name)},
    menuName: ${escapeTs(entry.menuName)},
    location: ${escapeTs(entry.location)},
    price: ${escapeTs(entry.price)},
    priceUnit: ${escapeTs(entry.priceUnit)},
    waitingTime: ${escapeTs(entry.waitingTime)},
    reviewCount: ${entry.reviewCount},
    avgScore: ${entry.avgScore},
    similarScore: ${entry.similarScore},
    reviews: [
${reviewLines}
    ],
  }`;
    })
    .join(',\n');

  const mapStoreBlocks = storeEntries
    .map(
      (entry) => `  {
    id: ${escapeTs(entry.id)},
    name: ${escapeTs(entry.name)},
    highlightMenu: ${escapeTs(entry.map.highlightMenu)},
    categories: ${JSON.stringify(entry.map.categories)},
    position: { xPercent: ${entry.map.position.xPercent}, yPercent: ${entry.map.position.yPercent} },
    preferenceMatch: ${entry.map.preferenceMatch},
    trendScore: ${entry.map.trendScore},
    price: ${entry.map.price},
    waitingMinutes: ${entry.map.waitingMinutes},
    reviewCount: ${entry.map.reviewCount},
    district: ${escapeTs(entry.map.district)},
  }`,
    )
    .join(',\n');

  const foodStoreBlocks = storeEntries
    .sort((a, b) => a.foodStore.rank - b.foodStore.rank)
    .map(
      (entry) =>
        `    { storeId: ${escapeTs(entry.foodStore.storeId)}, rank: ${entry.foodStore.rank}, name: ${escapeTs(entry.foodStore.name)} }`,
    )
    .join(',\n');

  const metaBlocks = storeEntries
    .map(
      (entry) => `  ${escapeTs(entry.id)}: {
    storeType: ${escapeTs(entry.meta.storeType)},
    overallRank: ${entry.meta.overallRank},
    tasteRank: ${entry.meta.tasteRank},
    tasteKeywords: ${JSON.stringify(entry.meta.tasteKeywords)},
    textureKeywords: ${JSON.stringify(entry.meta.textureKeywords)},
    featureSummary: ${escapeTs(entry.meta.featureSummary)},
    pros: ${JSON.stringify(entry.meta.pros)},
    cons: ${JSON.stringify(entry.meta.cons)},
  }`,
    )
    .join(',\n');

  const trendingBlocks = trendingPool
    .map(
      (review) => `  {
    authorInitial: ${escapeTs(review.authorInitial)},
    author: ${escapeTs(review.author)},
    time: ${escapeTs(review.time)},
    matchRate: ${review.matchRate},
    satisfied: ${review.satisfied},
    visitInfo: ${escapeTs(review.visitInfo)},
    text: ${escapeTs(review.text)},
    imageCount: ${review.imageCount},
  }`,
    )
    .join(',\n');

  const output = `/* eslint-disable */
// Auto-generated by scripts/generate-virtual-food-data.mjs — do not edit by hand.

import type { Store } from './stores';

export const ${prefix}_STORES: Record<string, Store> = {
${storeBlocks}
};

export const ${prefix}_MAP_STORES = [
${mapStoreBlocks}
] as const;

export const ${prefix}_FOOD_STORES = [
${foodStoreBlocks}
] as const;

export type ${metaTypeName} = {
  storeType: string;
  overallRank: number;
  tasteRank: number;
  tasteKeywords: string[];
  textureKeywords: string[];
  featureSummary: string;
  pros: string[];
  cons: string[];
};

export const ${prefix}_STORE_META: Record<string, ${metaTypeName}> = {
${metaBlocks}
};

export const ${prefix}_TRENDING_REVIEWS = [
${trendingBlocks}
] as const;
`;

  writeFileSync(config.outPath, output, 'utf8');
  console.log(
    `Wrote ${config.outPath} (${storeEntries.length} stores, ${reviewRows.length} reviews)`,
  );
}

for (const dataset of DATASETS) {
  generateDataset(dataset);
}
