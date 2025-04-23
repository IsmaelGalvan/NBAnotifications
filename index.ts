// index.ts
const TELEGRAM_TOKEN = "8142135309:AAEo0fpQ6hgn4j5iY_43DjG4VFcaNENxiM8";
const CHAT_ID = "1962437251";
const TELEGRAM_API = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`;

const res = await fetch("https://www.balldontlie.io/api/v1/games?seasons[]=2024&postseason=false");
const data = await res.json();

for (const game of data.data) {
  if (game.status === "Final") continue;
  if (game.league !== "Standard") continue;

  const message = `🏀 *NBA Update*\n${game.visitor_team.full_name} ${game.visitor_team_score} - ${game.home_team_score} ${game.home_team.full_name}`;

  await fetch(TELEGRAM_API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      chat_id: CHAT_ID,
      text: message,
      parse_mode: "Markdown",
    }),
  });
}

return new Response("✅ Bot ejecutado correctamente", { status: 200 });