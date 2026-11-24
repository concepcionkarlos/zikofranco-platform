import { initBotId } from "botid/client/core";

// Invisible bot check (Vercel BotID) on the endpoints our own forms call.
initBotId({
  protect: [
    { path: "/api/leads", method: "POST" },
    { path: "/api/admin/login", method: "POST" },
  ],
});
