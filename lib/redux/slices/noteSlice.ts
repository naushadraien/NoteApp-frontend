import { noteType } from "@/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface initialStateType {
  notes: null | noteType[];
}
const initialState: initialStateType = {
  notes: null,
};
export const noteSlice = createSlice({
  name: "note",
  initialState: initialState,
  reducers: {
    addNotes: (state: initialStateType, action: PayloadAction<noteType[]>) => {
      state.notes = action.payload;
    },
    removeNote: (
      state: initialStateType,
      action: PayloadAction<noteType>
    ) => {},
  },
});

// Action creators are generated for each case reducer function
export const { addNotes, removeNote } = noteSlice.actions;

export default noteSlice.reducer;
