// scripts/verify-selectors.js
// Usage: npm run verify:selectors
// This reads ./sample/team.html (paste page HTML here) and prints parsed fields.

const fs = require('fs');
const cheerio = require('cheerio');

const samplePath = './sample/team.html';
if (!fs.existsSync(samplePath)) {
  console.error('Sample HTML not found at sample/team.html. Paste the team page HTML there.');
  process.exit(1);
}

const html = fs.readFileSync(samplePath, 'utf8');
const $ = cheerio.load(html);

const firstMatch = $('.match-list__match').first();
const home = firstMatch.find('.match-list__team--home .match-list__team-name').text().trim() || null;
const away = firstMatch.find('.match-list__team--away .match-list__team-name').text().trim() || null;
const date = firstMatch.find('.match-list__date').text().trim() || null;
const competition = firstMatch.find('.match-list__competition-name').text().trim() || null;
const result = firstMatch.find('.match-list__result').text().trim() || null;

console.log('--- NEXT MATCH ---');
console.log({ home, away, date, competition, result });

const matches = [];
$('.match-list__match').each((_, el) => {
  const h = $(el).find('.match-list__team--home .match-list__team-name').text().trim() || null;
  const a = $(el).find('.match-list__team--away .match-list__team-name').text().trim() || null;
  const d = $(el).find('.match-list__date').text().trim() || null;
  const r = $(el).find('.match-list__result').text().trim() || null;
  matches.push({ home: h, away: a, date: d, result: r });
});

console.log('\\n--- SCHEDULE COUNT ---');
console.log(matches.length);

const table = [];
$('.table__row').each((_, el) => {
  const pos = $(el).find('.table__cell--rank').text().trim() || null;
  const team = $(el).find('.table__cell--teamname').text().trim() || null;
  const pts = $(el).find('.table__cell--points').text().trim() || null;
  if (pos && team) table.push({ pos, team, pts });
});

console.log('\\n--- TABLE (first 5) ---');
console.log(table.slice(0,5));
