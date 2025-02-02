import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Асинхронное действие для получения данных персонажа с бэка
export const fetchCharacter = createAsyncThunk(
  "character/fetchCharacter",
  async (telegramId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://localhost:5021/api/character/${telegramId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Ошибка загрузки персонажа");
    }
  }
);

// Асинхронное действие для обновления данных персонажа
export const updateCharacter = createAsyncThunk(
  "character/updateCharacter",
  async ({ telegramId, updates }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`http://localhost:5021/api/character/${telegramId}`, updates);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Ошибка обновления персонажа");
    }
  }
);

const characterSlice = createSlice({
  name: "character",
  initialState: {
    data: null, // Данные персонажа
    loading: false, // Состояние загрузки
    error: null, // Ошибки
  },
  reducers: {
    resetCharacterState: (state) => {
      state.data = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Обработка загрузки персонажа
      .addCase(fetchCharacter.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCharacter.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(fetchCharacter.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      // Обработка обновления персонажа
      .addCase(updateCharacter.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCharacter.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(updateCharacter.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export const { resetCharacterState } = characterSlice.actions;

export default characterSlice.reducer;
