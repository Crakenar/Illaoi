import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  menuId: null,
  actionType: null,
}

export const storeSlice = createSlice({
  name: 'store',
  initialState,
  reducers: {
    setMenuId: (state, action) => {      
      state.menuId = action.payload
    },
    setActionType: (state, action) => {
      state.actionType = action.payload
    }
  }
});

export const { setMenuId, setActionType } = storeSlice.actions;
export default storeSlice.reducer
