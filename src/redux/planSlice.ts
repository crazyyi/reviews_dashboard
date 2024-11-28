import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { SubscriptionPlanType } from "@/types"

interface DashboardState {
  plans: SubscriptionPlanType[]
}

const initialState: DashboardState = {
  plans: []
}

const planSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    setPlans: (state, action: PayloadAction<SubscriptionPlanType[]>) => {
      state.plans = action.payload
    }
  }
})


export const { setPlans } = planSlice.actions
export default planSlice.reducer