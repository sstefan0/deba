import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

export interface UserState {
  isLoggedIn: boolean;
  role: string;
  id: string;
}
const accessToken = localStorage.getItem("accessToken");

const initialState: UserState = {
  isLoggedIn: accessToken ? true : false,
  role: accessToken ? (jwtDecode(accessToken) as any).role : "",
  id: accessToken ? (jwtDecode(accessToken) as any).id : "",
};

const userSlice = createSlice({
  name: "loggedIn",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.role = (jwtDecode(action.payload.accessToken) as any).role;
      state.id = (jwtDecode(action.payload.accessToken) as any).id;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.role = "";
      state.id = "";
    },
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
