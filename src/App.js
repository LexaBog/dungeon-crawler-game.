import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import CharacterInfo from "./components/CharacterInfo.js";
import { authenticateUser, validateToken } from "./components/authService.js";
import "./App.css";

function App({ username }) {
  const [telegramId, setTelegramId] = useState(null);
  const [username, setUsername] = useState(null);
  const [error, setError] = useState(null);

  
  // Используем useEffect для получения токена из URL и проверки на сервере
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    // console.log("Токен из URL:", token);
    
    if (token) {
      // Вызываем validateToken и обрабатываем результат
      validateToken(token)
      .then(({ telegramId, username }) => { // Деструктуризация данных
        console.log("Полученные данные:", { telegramId, username });
          // console.log("Имя пользователя:", username);
          if (telegramId && username) {
            setTelegramId(telegramId); // Сохраняем telegramId в состояние
            setUsername(username);
            
            authenticateUser(telegramId, username)
              .then((user) => {
                console.log("Пользователь успешно авторизован:", user);
              })
              .catch((err) => {
                console.error("Ошибка авторизации пользователя:", err);
                setError("Не удалось авторизовать пользователя.");
              });
          } else {
            setError("Ошибка при валидации токена. Проверьте ссылку.");
          }
        })
        .catch((err) => {
          console.error("Ошибка при валидации токена:", err);
          setError("Ошибка при валидации токена. Попробуйте позже.");
        });
      } else {
        setError("Токен отсутствует. Перейдите по ссылке от бота.");
      }
      console.log("Проверка telegramId в App:", telegramId);
  }, []); // Пустой массив зависимостей, чтобы эффект выполнялся только при монтировании компонента


  // Отображение ошибок или загрузки
  if (error) return <p>{error}</p>;
  if (!telegramId) return <p>Загрузка...</p>;

  return (
    <div className="ollGameBody">
      <div className="header">
        <h1 className="headerText">Dungeons s Heroes</h1>
      </div>

      <Routes>
        <Route
          path="/"
          element={
            <CharacterInfo telegramId={telegramId} username={username} />
          }
        />
        <Route path="/game" />
      </Routes>

      <div className="futer"></div>
    </div>
  );
}

export default App;
