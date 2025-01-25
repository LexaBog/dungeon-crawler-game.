
import React, {useEffect, useState} from "react";
import fetchDungeons from "./fetchDungeons";
import "./dungeon.css"

const DungeonList  = () => {
    const [dungeons, setDungeons] = useState([]);
    const [error, setError] = useState(null);
    const [dunghtStyle_1_10, setDunghtStyle_1_10] = useState(null)

    const onDunngeon = () => {
        setDunghtStyle_1_10()
    }

    useEffect(() => {
        const loadDungeon = async () => {
            try {
                setError(null);
                const data = await fetchDungeons();
                setDungeons(data);
            } catch (err) {
                console.error(err); // Для отладки
                setError("Не удалось загрузить данные о подземельях");
            }
        }
        loadDungeon()
    }, [])
    if (error) return <p>{error}</p>
    
    return (
        <div>
        <div className="buttonDunght-1-10">
            <h2>Сбор душ 1-10 уровень</h2>
            <button onClick={onDunngeon()}>открыть</button>
        </div>
        <ul className={dunghtStyle_1_10}>
          {dungeons.map((dungeon) => (
              <li key={dungeon._id}>
              {dungeon.name} (Уровень: {dungeon.level})
              {console.log(dungeon)}
            </li>
          ))}
        </ul>
      </div>
    )
}

export default DungeonList; 