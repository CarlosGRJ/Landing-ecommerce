// lib/search.ts
import { PRODUCTS } from '@/constants/products';

export function normalize(str: string): string {
  const withSpaces = str
    .replace(/([a-zA-Z])(\d)/g, '$1 $2')
    .replace(/(\d)([a-zA-Z])/g, '$1 $2');

  return withSpaces
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
}

function tokenize(str: string): string[] {
  const normalized = normalize(str).replace(/[^a-z0-9]+/g, ' ').trim();
  return normalized ? normalized.split(/\s+/) : [];
}

function levenshteinDistance(a: string, b: string): number {
  if (a === b) return 0;
  if (!a) return b.length;
  if (!b) return a.length;

  const row = new Array(b.length + 1).fill(0);

  for (let j = 0; j <= b.length; j += 1) row[j] = j;

  for (let i = 1; i <= a.length; i += 1) {
    let prev = i - 1;
    row[0] = i;

    for (let j = 1; j <= b.length; j += 1) {
      const temp = row[j];
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      row[j] = Math.min(
        row[j] + 1,
        row[j - 1] + 1,
        prev + cost,
      );
      prev = temp;
    }
  }

  return row[b.length];
}

function tokenSimilarity(queryToken: string, targetToken: string): number {
  if (queryToken === targetToken) return 1;
  if (targetToken.startsWith(queryToken)) return 0.9;
  if (targetToken.includes(queryToken)) return 0.75;

  const maxLen = Math.max(queryToken.length, targetToken.length);
  if (maxLen <= 2) return 0;

  const distance = levenshteinDistance(queryToken, targetToken);
  const similarity = 1 - distance / maxLen;

  return similarity >= 0.65 ? similarity : 0;
}

export function searchProducts(query: string) {
  const normalizedQuery = normalize(query);
  const queryTokens = tokenize(query);

  if (!normalizedQuery || queryTokens.length === 0) return [];

  const results = PRODUCTS.map((product) => {
    const name = normalize(product.name);
    const description = normalize(product.description || '');
    const features = product.features?.map(normalize).join(' ') || '';
    const fullText = `${name} ${description} ${features}`.trim();
    const productTokens = tokenize(fullText);

    let score = 0;
    let matchedTokens = 0;

    for (const token of queryTokens) {
      let best = 0;

      for (const productToken of productTokens) {
        const similarity = tokenSimilarity(token, productToken);
        if (similarity > best) best = similarity;
        if (best === 1) break;
      }

      if (best >= 0.6) {
        score += best;
        matchedTokens += 1;
      }
    }

    if (matchedTokens < queryTokens.length) {
      return null;
    }

    let boost = 0;

    if (fullText.includes(normalizedQuery)) boost += 0.2;
    if (name.includes(normalizedQuery)) boost += 0.3;
    if (name.startsWith(normalizedQuery)) boost += 0.4;

    const finalScore = score / queryTokens.length + boost;

    return { product, score: finalScore };
  })
    .filter((result): result is { product: (typeof PRODUCTS)[number]; score: number } =>
      Boolean(result),
    )
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return a.product.name.localeCompare(b.product.name);
    })
    .map((result) => result.product);

  return results;
}
