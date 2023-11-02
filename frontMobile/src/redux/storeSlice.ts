import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  menuId: null,
  actionTypeId: null,
}

export const storeSlice = createSlice({
  name: 'store',
  initialState,
  reducers: {
    setMenuId: (state, action) => {      
      state.menuId = action.payload
    },
    setActionTypeId: (state, action) => {
      state.actionTypeId = action.payload
    }
  }
});

export const { setMenuId, setActionTypeId } = storeSlice.actions;
export default storeSlice.reducer
