// import { UserType1 } from "@/components/signup";
import { userType } from "@/types";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

interface initialStateType {
  data: null | userType;
  isAuth: boolean;
  user: userType[];
  isLoading: boolean;
  isError: boolean;
}

const initialState: initialStateType = {
  data: null,
  isAuth: false,
  user: [],
  isLoading: false,
  isError: false,
};

// //for creating the posts
// export const CreateUser = createAsyncThunk(
//   "CreateUser",
//   async (values: UserType1, { rejectWithValue }) => {
//     //this data argument is passed from the dispatch function where this function is called
//     const response = await axios.post(
//       "http://localhost:5000/api/v1/auth/new",
//       values,
//       {
//         withCredentials: true,
//       }
//     );
//     try {
//       // console.log(response.data);

//       return await response.data;
//     } catch (error: any) {
//       console.log(error);

//       return rejectWithValue(error.response);
//     }
//   }
// );
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state: initialStateType, action: PayloadAction<userType>) => {
      state.data = action.payload;
      state.isAuth = true;
    },
    updateUser: (state: initialStateType, action: PayloadAction<userType>) => {
      state.data = action.payload;
    },
    logoutUser: (state: initialStateType) => {
      state.isAuth = false;
    },
    deleteUser: (state: initialStateType) => {
      state.data = null;
      state.isAuth = false;
    },
  },
  // extraReducers: (builder) => {
  //   //for creating posts
  //   builder.addCase(CreateUser.pending, (state, action) => {
  //     state.isLoading = true;
  //   });
  //   builder.addCase(CreateUser.fulfilled, (state, action) => {
  //     state.isLoading = false;
  //     state.user.push(action.payload);
  //     state.data = action.payload;
  //     state.isAuth = true;
  //     toast.success("Registered SuccessFully!");
  //     console.log("builder", action.payload);
  //   });
  //   builder.addCase(CreateUser.rejected, (state, action) => {
  //     state.isError = true;
  //     console.log("error", state.isError);
  //   });
  // },
});

// Action creators are generated for each case reducer function
export const { addUser, updateUser, logoutUser } = userSlice.actions;

export default userSlice.reducer;
