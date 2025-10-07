
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

    const table = [];
    $('.table__row').each((_, el) => {
      if (table.length >= 30) return false; // limit
      const pos = pick($(el).find('.table__cell--rank').text());
      const team = pick($(el).find('.table__cell--teamname').text());
      const pts = pick($(el).find('.table__cell--points').text());
      if (pos && team) table.push({ pos, team, pts });
    });

    res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=600');
    return res.status(200).json(table);
  } catch (err) {
    return safeError(res, 'Temporär keine Daten (Upstream/Timeout)', err);
  }
};
