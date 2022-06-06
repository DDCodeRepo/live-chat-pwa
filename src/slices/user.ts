import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  value: string;
}

// Define the initial state using that type
const initialState: User = {
  value: "",
};

export const userSlice = createSlice({
  name: "user",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    storeUser: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

export const { storeUser } = userSlice.actions;

export default userSlice.reducer;
