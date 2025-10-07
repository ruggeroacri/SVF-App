const cheerio = require('cheerio');

const TEAM_URL = 'https://www.fussball.de/mannschaft/sv-fellbach-sv-fellbach-wuerttemberg/-/saison/2526/team-id/011MIDBCJG000000VTVG0001VTR8C1K7';

module.exports = async (req, res) => {
  try {
    const response = await fetch(TEAM_URL);
    const html = await response.text();
    const $ = cheerio.load(html);

    const table = [];
    $('.table__row').each((_, el) => {
      const pos = $(el).find('.table__cell--rank').text().trim() || null;
      const team = $(el).find('.table__cell--teamname').text().trim() || null;
      const pts = $(el).find('.table__cell--points').text().trim() || null;
      if (pos && team) table.push({ pos, team, pts });
    });

    res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=600');
    res.status(200).json(table);
  } catch (err) {
    res.status(500).json({ error: 'Fehler beim Abrufen der Tabelle', details: err.message });
  }
};
