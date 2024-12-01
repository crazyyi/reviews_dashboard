import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

const initialState = {
  isOpen: false,
  isSignOut: true,
}

const signInSlice = createSlice({
  name: "signIn",
  initialState,
  reducers: {
    toggleOpen: (state) => {
      state.isOpen = !state.isOpen;
    },
    setIsOpen: (state, action: PayloadAction<boolean>) => {
      state.isOpen = action.payload
    },
    setIsSignOut: (state, action: PayloadAction<boolean>) => {
      state.isSignOut = action.payload
    }
  }
})

export const { toggleOpen, setIsOpen, setIsSignOut } = signInSlice.actions

export default signInSlice.reducer