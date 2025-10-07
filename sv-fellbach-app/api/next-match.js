const cheerio = require('cheerio');

const TEAM_URL = 'https://www.fussball.de/mannschaft/sv-fellbach-sv-fellbach-wuerttemberg/-/saison/2526/team-id/011MIDBCJG000000VTVG0001VTR8C1K7';

module.exports = async (req, res) => {
  try {
    const response = await fetch(TEAM_URL);
    const html = await response.text();
    const $ = cheerio.load(html);

    const firstMatch = $('.match-list__match').first();

    const home = firstMatch.find('.match-list__team--home .match-list__team-name').text().trim() || null;
    const away = firstMatch.find('.match-list__team--away .match-list__team-name').text().trim() || null;
    const date = firstMatch.find('.match-list__date').text().trim() || null;
    const competition = firstMatch.find('.match-list__competition-name').text().trim() || null;

    res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=120');
    res.status(200).json({ home, away, date, competition });
  } catch (err) {
    res.status(500).json({ error: 'Fehler beim Abrufen des nächsten Spiels', details: err.message });
  }
};
