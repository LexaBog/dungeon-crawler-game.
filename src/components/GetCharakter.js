// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const CharacterInfo = () => {
//   const [character, setCharacter] = useState(null);
//   const [loading, setLoading] = useState(true);

//   axios.defaults.withCredentials = true;

//   const fetchCharacter = async () => {
//   try {
//     const response = await axios.get("http://localhost:5021/api/characters");
//     return response.data;
//   } catch (error) {
//     console.error("Ошибка при запросе персонажа:", error.response?.data || error.message);
//     throw error;
//   }
//   };


//   if (loading) return <p>Загрузка...</p>;
//   if (!character) return <p>Персонаж не найден</p>;

//   return (
//     <div>
//       <h2>Информация о персонаже</h2>
//       <p>Имя: {character.name}</p>
//       <p>Уровень: {character.level}</p>
//       <p>Опыт: {character.experience}</p>
//     </div>
//   );
// };

// export default CharacterInfo;
