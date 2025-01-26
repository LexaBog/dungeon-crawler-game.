const DungeonList = ({ telegramId }) => {
  const [dungeons, setDungeons] = useState([]);
  const [activeDungeons, setActiveDungeons] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadDungeons = async () => {
      try {
        setError(null);

        // Загружаем список всех подземелий
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

    loadDungeons();

    // Обновление таймера каждую секунду
    const timer = setInterval(() => {
      setActiveDungeons((prevDungeons) =>
        prevDungeons.map((dungeon) => {
          const now = new Date();
          const timeLeft = Math.max(0, (new Date(dungeon.endTime) - now) / 1000);
          return { ...dungeon, timeLeft };
        })
      );
    }, 1000);

    return () => clearInterval(timer); // Очищаем таймер при размонтировании компонента
  }, [telegramId]);

  const startDungeon = async (dungeonId) => {
    try {
      const response = await axios.post("http://localhost:5021/api/dungeons/start", {
        telegramId,
        dungeonId,
      });

      const newActiveDungeon = response.data.dungeon;
      setActiveDungeons((prev) => [...prev, { ...newActiveDungeon, timeLeft: newActiveDungeon.duration }]);
    } catch (error) {
      console.error("Ошибка запуска подземелья:", error.response?.data || error.message);
      alert("Не удалось запустить подземелье.");
    }
  };

  if (error) return <p>{error}</p>;

  return (
    <div className="fulBodiDungeons">
      <div className="buttonDunght-1-10">
        <h2>Сбор душ 1-10 уровень</h2>
      </div>
      <ul className="dungeon-list">
        {dungeons.map((dungeon) => {
          const activeDungeon = activeDungeons.find((ad) => ad.dungeonId === dungeon._id);

          return (
            <div key={dungeon._id}>
              <p>Уровень: {dungeon.level}</p>
              <p>Длительность: {dungeon.duration} с</p>
              {activeDungeon ? (
                <p>До завершения подземелья осталось: {Math.ceil(activeDungeon.timeLeft)} секунд</p>
              ) : (
                <button onClick={() => startDungeon(dungeon._id)}>Запустить</button>
              )}
            </div>
          );
        })}
      </ul>
    </div>
  );
};
