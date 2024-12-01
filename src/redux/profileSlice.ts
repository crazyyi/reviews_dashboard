import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAlertPopped: false,
  isEnterPasswordOpen: false
}

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setIsAlertPopped: (state, action) => {
      state.isAlertPopped = action.payload
    },
    setIsEnterPasswordOpen: (state, action) => {
      state.isEnterPasswordOpen = action.payload
    }
  }
})

export const { setIsAlertPopped, setIsEnterPasswordOpen } = profileSlice.actions

export default profileSlice.reducer