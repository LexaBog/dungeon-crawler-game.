import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Асинхронное действие для получения данных пользователя
export const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async (telegramId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://localhost:5021/api/user/${telegramId}`);
      return response.data; // Возвращаем данные пользователя
    } catch (error) {
      return rejectWithValue(error.response?.data || "Ошибка загрузки данных пользователя");
    }
  }
);


export const fetchActiveDungeons = createAsyncThunk(
  "dungeon/fetchActiveDungeons",
  async (telegramId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://localhost:5021/api/user/${telegramId}`);
      return response.data.activeDungeons;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Ошибка загрузки активных подземелий");
    }
  }
);


// Асинхронное действие для обновления данных пользователя
export const updateUser = createAsyncThunk(
  "user/updateUser",
  async ({ telegramId, updates }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`http://localhost:5021/api/user/${telegramId}`, updates);
      return response.data; // Возвращаем обновлённые данные пользователя
    } catch (error) {
      return rejectWithValue(error.response?.data || "Ошибка обновления данных пользователя");
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    telegramId: null,
    username: null,
    characterId: null,
    currentDungeon: null, // Текущий активный данж
    activeDungeons: [], // Список активных данжей
    loading: false,
    error: null,
  },
  reducers: {
    // Сбрасываем состояние пользователя
    resetUserState: (state) => {
      state.telegramId = null;
      state.username = null;
      state.characterId = null;
      state.currentDungeon = null;
      state.activeDungeons = [];
      state.loading = false;
      state.error = null;
    },
    // Обновляем активные данжи
    setActiveDungeons(state, action) {
      state.activeDungeons = action.payload; // Обновление activeDungeons
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchActiveDungeons.fulfilled, (state, action) => {
      state.activeDungeons = action.payload.map((dungeon) => ({
        ...dungeon,
        timeLeft: Math.max(
          0,
          new Date(dungeon.endTime).getTime() - new Date().getTime()
        ) / 1000, // Рассчитываем время в секундах
      }));
    });
    
    builder
      // Загрузка данных пользователя
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.telegramId = action.payload.telegramId;
        state.username = action.payload.username;
        state.characterId = action.payload.characterId;
        state.currentDungeon = action.payload.currentDungeon;
        state.activeDungeons = action.payload.activeDungeons || [];
        state.loading = false;
      }) 
      .addCase(fetchUser.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      // Обновление данных пользователя
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        // Обновляем данные пользователя в состоянии
        state.telegramId = action.payload.telegramId;
        state.username = action.payload.username;
        state.characterId = action.payload.characterId;
        state.currentDungeon = action.payload.currentDungeon;
        state.activeDungeons = action.payload.activeDungeons || [];
        state.loading = false;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

// Экспортируем действия
export const { resetUserState, setActiveDungeons } = userSlice.actions;

// Экспортируем редьюсер
export default userSlice.reducer;
