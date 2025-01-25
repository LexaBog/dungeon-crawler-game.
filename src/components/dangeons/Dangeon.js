
import React, {useEffect, useState, useState} from "react";
import fetchDungeons from "./fetchDungeons";

const DungeonList  = async () => {
    console [dungeons, setDungeons] = useState([]);
    const [error, setError] = useState([]);

    useEffect(() => {
        const loadDungeon = async () => {
            try {
                const data = await fetchDungeons();
                setDungeons(data);
            } catch (err) {
                setError("Не удалось загрузить данные о подземельях");
            }
        }
        loadDungeon()
    }, [])

    if (error) return <p>{error}</p>
   
    return (
        <div>
        <h1>Список подземелий</h1>
        <ul>
          {dungeons.map((dungeon) => (
            <li key={dungeon._id}>
              {dungeon.name} (Уровень: {dungeon.level})
            </li>
          ))}
        </ul>
      </div>
    )
}

export default DungeonList; 