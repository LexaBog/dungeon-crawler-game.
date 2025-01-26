const DungeonList = ({ telegramId }) => {
  const [dungeons, setDungeons] = useState([]);
  const [activeDungeons, setActiveDungeons] = useState([]);
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const toggleDungeonList = () => {
    setIsOpen((prev) => !prev);
  };

  const startDungeon = async (dungeonId) => {
    try {
      const response = await axios.post("http://localhost:5021/api/dungeons/start", {
        telegramId,
        dungeonId,
      });
      const { dungeon } = response.data;

      // Обновляем список активных подземелий
      setActiveDungeons((prev) => [...prev, dungeon]);
    } catch (error) {
      console.error("Ошибка запуска подземелья:", error.response?.data || error.message);
      alert("Не удалось запустить подземелье.");
    }
  };

  const loadDungeons = async () => {
    try {
      setError(null);
      const data = await fetchDungeons();
      setDungeons(data);

      // Получаем список активных подземелий
      const userResponse = await axios.get(`http://localhost:5021/api/user/${telegramId}`);
      setActiveDungeons(userResponse.data.activeDungeons || []);
    } catch (err) {
      console.error(err);
      setError("Не удалось загрузить данные о подземельях");
    }
  };

  useEffect(() => {
    loadDungeons();
  }, []);

  if (error) return <p>{error}</p>;

  return (
    <div className="fulBodiDungeons">
      <div className="buttonDunght-1-10">
        <h2>Сбор душ 1-10 уровень</h2>
        <button className="butonOnDungeon" onClick={toggleDungeonList}>
          {isOpen ? "Скрыть" : "Открыть"}
        </button>
      </div>
      {isOpen && (
        <ul className="dungeon-list">
          {dungeons.map((dungeon) => {
            const activeDungeon = activeDungeons.find(
              (active) => active.dungeonId === dungeon._id
            );

            if (activeDungeon) {
              const timeLeft = Math.ceil(
                (new Date(activeDungeon.endTime) - new Date()) / 1000
              );

              return (
                <div key={dungeon._id}>
                  <p>Уровень: {dungeon.level}</p>
                  <p>Осталось времени: {timeLeft > 0 ? `${timeLeft} секунд` : "Завершено"}</p>
                </div>
              );
            }

            return (
              <div key={dungeon._id}>
                <p>Уровень: {dungeon.level}</p>
                <button onClick={() => startDungeon(dungeon._id)}>Start</button>
              </div>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default DungeonList;
