import { createSlice } from '@reduxjs/toolkit';

// Load initial state from localStorage
const initialState = {
  isAuthenticated: localStorage.getItem('isAuthenticated') === 'true',
  user: JSON.parse(localStorage.getItem('user')),
  error: null
};

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    login: (state, action) => {
      const { username, password } = action.payload;
      if (username === 'admin' && password === 'password') {
        state.isAuthenticated = true;
        state.user = { username };
        state.error = null;
        // Persist to localStorage
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('user', JSON.stringify({ username }));
      } else {
        state.error = 'Invalid username or password';
      }

      console.log(`username => ${username}, password => ${password}`);
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.error = null;
      // Clear from localStorage
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('user');
    }
  }
});

export const { login, logout } = loginSlice.actions;
export default loginSlice.reducer;