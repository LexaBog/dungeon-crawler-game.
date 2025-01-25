import axios from "axios";

const fetchDungeons = async () => {
    try {
        const response = await axios.get("http://localhost:5021/api/dungeons");
        return response.data;
    } catch (error) {
        console.log("Ошибка при получении данных о подземельях:", error);
        throw error
    }
};

export default fetchDungeons