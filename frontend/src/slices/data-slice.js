import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const getDataChat = createAsyncThunk(
  '@@chat/get-data',
  async (_, { extra: { axios, routes } }) => {
    const userId = localStorage.getItem('userId');
    const { token } = JSON.parse(userId);
    const request = await axios.get(routes.usersPath(), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return request.data;
  }
);

const initialState = {
  status: 'fulfilled',
  error: null,
};

const statusLoadSlice = createSlice({
  name: '@@chat/channels-data',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getDataChat.pending, (state) => {
        state.status = 'pending';
        state.error = null;
      })
      .addCase(getDataChat.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload || action.error.message;
      })
      .addCase(getDataChat.fulfilled, (state) => {
        state.status = 'fulfilled';
        state.error = null;
      });
  },
});

export default statusLoadSlice.reducer;

export const { resetData } = statusLoadSlice.actions;
