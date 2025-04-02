import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from "../api/axiosInstance";

// Obtener token del localStorage de manera segura
const storedToken = localStorage.getItem("token") || null;

export const loginUser = createAsyncThunk(
  "auth/loginUser", 
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await api.post("/api/auth/login", credentials);
      localStorage.setItem("token", response.data.token);
      return {
        token: response.data.token,
        email: response.data.email, // Añadido para el Navbar
        user: response.data.user    // Añadido para futuras expansiones
      };
    } catch (error) {
        let errorMessage = "Error de conexión";
        if (error.response) {
          if (error.response.status === 401) {
            errorMessage = "Credenciales incorrectas. Por favor verifica tus datos.";
          } else {
            errorMessage = error.response.data?.message || `Error ${error.response.status}`;
          }
        }
        return rejectWithValue(errorMessage);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: { 
    token: storedToken,
    email: null,       // Añadido para el Navbar
    user: null,        // Añadido para futuras expansiones
    loading: false, 
    error: null,
    isAuthenticated: !!storedToken // Estado más claro de autenticación
  },
  reducers: {
    logout: (state) => {
      state.token = null;
      state.email = null;
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem("token"); // Corregido: era remoteItem
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.email = action.payload.email;
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
      });
  }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;