import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  menuId: null
}

export const storeSlice = createSlice({
  name: 'store',
  initialState,
  reducers: {
    setMenuId: (state, action) => {      
      state.menuId = action.payload
    }
  }
});

export const { setMenuId } = storeSlice.actions;
export default storeSlice.reducer
