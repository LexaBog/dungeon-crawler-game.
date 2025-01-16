function App() {
  const [character, setCharacter] = useState(null);

  const handleCharacterLoaded = (data) => {
      setCharacter(data); // Сохраняем данные персонажа
  };

  return (
      <div className="ollGameBody">
          <div>
              <h1 className="header">Dungeons & Heroes</h1>
          </div>

          {/* Передача данных через маршруты */}
          <Routes>
              <Route
                  path="/"
                  element={<CharacterInfo onCharacterLoaded={handleCharacterLoaded} />}
              />
              <Route
                  path="/game"
                  element={<Game character={character} />}
              />
          </Routes>

          <div className="futer"></div>
      </div>
  );
}
