import { UserType } from "@/types";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface dataType {
  data: null | UserType;
  isAuth: boolean;
}

const initialState: dataType = {
  data: null,
  isAuth: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state: dataType, action: PayloadAction<UserType>) => {
      state.data = action.payload;
      state.isAuth = true;
    },
    updateUser: (state: dataType, action: PayloadAction<UserType>) => {
      state.data = action.payload;
    },
    logoutUser: (state: dataType) => {
      state.isAuth = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addUser, updateUser, logoutUser } = userSlice.actions;

export default userSlice.reducer;
