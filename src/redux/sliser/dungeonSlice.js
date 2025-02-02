import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Асинхронное действие для получения списка подземелий
export const fetchDungeons = createAsyncThunk(
  "dungeon/fetchDungeons",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:5021/api/dungeons");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Ошибка загрузки подземелий");
    }
  }
);


// Асинхронное действие для запуска подземелья
export const startDungeon = createAsyncThunk(
  "dungeon/startDungeon",
  async ({ telegramId, _id }, { rejectWithValue }) => {
    console.log(_id)
    
    try {
      const response = await axios.post("http://localhost:5021/api/dungeons/start", {
        telegramId,
        _id,
      });
      
      const newActiveDungeon = response.data;
      if (!newActiveDungeon) {
        throw new Error("Подземелье не найдено");
      }

      console.log("ретурн старт дандж",response.data.dungeon)
      return response.data.dungeon;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Ошибка запуска подземелья");
    }
  }
);

export const collectRewards = createAsyncThunk(
  "dungeon/collectRewards",
  async ({ telegramId, dungeonId }, { rejectWithValue }) => {
    try {
      const response = await axios.post("http://localhost:5021/api/dungeons/collectRewards", {
        telegramId,
        dungeonId,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Ошибка при обновлении наград");
    }
  }
);


// Асинхронное действие для завершения подземелья
export const completeDungeon = createAsyncThunk(
  "dungeon/completeDungeon",
  async ({ telegramId, dungeonId }, { rejectWithValue }) => {
    try {
      const response = await axios.post("http://localhost:5021/api/dungeons/complete", {
        telegramId,
        dungeonId,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Ошибка завершения подземелья");
    }
  }
);

const dungeonSlice = createSlice({
  name: "dungeon",
  initialState: {
    dungeons: [], // Список всех подземелий
    activeDungeons: [], // Активные подземелья пользователя
    rewards: null, // Награды за завершение
    loading: false, // Состояние загрузки
    error: null, // Ошибки
  },
  reducers: {
    
      
      // Редьюсер для очистки списка подземелий
      clearDungeons(state) {
        state.dungeons = [];
        state.activeDungeons = [];
      },
    clearRewards(state) {
      state.rewards = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Загрузка списка подземелий
      .addCase(fetchDungeons.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDungeons.fulfilled, (state, action) => {
        state.dungeons = action.payload;
        state.loading = false;
      })
      .addCase(fetchDungeons.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      // Запуск подземелья
      .addCase(startDungeon.fulfilled, (state, action) => {
        state.activeDungeons.push(action.payload);
      })
      .addCase(startDungeon.rejected, (state, action) => {
        state.error = action.payload;
      })
      // Завершение подземелья
      .addCase(completeDungeon.fulfilled, (state, action) => {
        state.rewards = action.payload.rewards;
        // Удаляем завершённое подземелье из активных
        state.activeDungeons = state.activeDungeons.filter(
          (dungeon) => String(dungeon.dungeonId) !== String(action.meta.arg.dungeonId)
        );
        
        // Если сервер возвращает updatedCharacter, сохраняем его:
        state.character = action.payload.updatedCharacter;
      })
      .addCase(completeDungeon.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { clearRewards, setActiveDungeons, clearDungeons } = dungeonSlice.actions;

export default dungeonSlice.reducer;
