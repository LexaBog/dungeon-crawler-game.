import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./sliser/userSlice";
import dungeonReducer from "./sliser/dungeonSlice";
import characterReducer from "./sliser/characterSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    dungeon: dungeonReducer,
    character: characterReducer,
  },
});

export default store;
