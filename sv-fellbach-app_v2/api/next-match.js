
const cheerio = require('cheerio');

const TEAM_URL = 'https://www.fussball.de/mannschaft/sv-fellbach-sv-fellbach-wuerttemberg/-/saison/2526/team-id/011MIDBCJG000000VTVG0001VTR8C1K7';
const UA = 'SVFellbachApp/1.0 (+https://svfellbachfussball.de)';

async function getHTML(url) {
  const controller = new AbortController();
  const to = setTimeout(() => controller.abort(), 8000); // 8s upstream timeout
  try {
    const res = await fetch(url, { signal: controller.signal, headers: { 'User-Agent': UA }});
    if (!res.ok) throw new Error(`Upstream ${res.status}`);
    return await res.text();
  } finally {
    clearTimeout(to);
  }
}

function pick(text) {
  return (text || '').replace(/\s+/g, ' ').trim() || null;
}

function safeError(res, msg, err) {
  console.error(msg, err?.message);
  res.setHeader('Cache-Control','s-maxage=60, stale-while-revalidate=120');
  return res.status(200).json({ error: true, message: msg });
}

module.exports = async (req, res) => {
  try {
    if (req.method && req.method !== 'GET') {
      return res.status(405).json({ error: true, message: 'Method Not Allowed' });
    }
    const html = await getHTML(TEAM_URL);
    const $ = cheerio.load(html);

    const firstMatch = $('.match-list__match').first();
    if (!firstMatch || firstMatch.length === 0) {
      return res.status(200).json({ home:null, away:null, date:null, competition:null });
    }

    const home = pick(firstMatch.find('.match-list__team--home .match-list__team-name').text());
    const away = pick(firstMatch.find('.match-list__team--away .match-list__team-name').text());
    const date = pick(firstMatch.find('.match-list__date').text());
    const competition = pick(firstMatch.find('.match-list__competition-name').text());

    res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=600');
    return res.status(200).json({ home, away, date, competition });
  } catch (err) {
    return safeError(res, 'Temporär keine Daten (Upstream/Timeout)', err);
  }
};
