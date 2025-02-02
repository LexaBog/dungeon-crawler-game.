// src/config.js
const mode = process.env.REACT_APP_MODE || "production";

const config = {
  apiUrl: process.env.REACT_APP_API_URL || "http://localhost:5021",
};

if (mode === "local") {
  // Для локального тестирования используем жестко заданные данные
  config.telegramId = process.env.REACT_APP_TELEGRAM_ID || "834322218";
  config.username = process.env.REACT_APP_USERNAME || "AlexBelei";
} else {
  // Для продакшена данные будут приходить динамически (например, через URL или после валидации токена)
  config.telegramId = null;
  config.username = null;
}

export default config;
