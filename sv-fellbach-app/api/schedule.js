const cheerio = require('cheerio');

const TEAM_URL = 'https://www.fussball.de/mannschaft/sv-fellbach-sv-fellbach-wuerttemberg/-/saison/2526/team-id/011MIDBCJG000000VTVG0001VTR8C1K7';

module.exports = async (req, res) => {
  try {
    const response = await fetch(TEAM_URL);
    const html = await response.text();
    const $ = cheerio.load(html);

    const matches = [];
    $('.match-list__match').each((_, el) => {
      const home = $(el).find('.match-list__team--home .match-list__team-name').text().trim() || null;
      const away = $(el).find('.match-list__team--away .match-list__team-name').text().trim() || null;
      const date = $(el).find('.match-list__date').text().trim() || null;
      const result = $(el).find('.match-list__result').text().trim() || null;
      matches.push({ home, away, date, result });
    });

    res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=600');
    res.status(200).json(matches);
  } catch (err) {
    res.status(500).json({ error: 'Fehler beim Abrufen des Spielplans', details: err.message });
  }
};
