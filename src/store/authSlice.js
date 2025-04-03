import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from "../api/axiosInstance";

const storedToken = localStorage.getItem("token") || null;

// 1. Login original (sin cambios)
export const loginUser = createAsyncThunk(
  "auth/loginUser", 
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await api.post("/api/auth/login", credentials);
      localStorage.setItem("token", response.data.token);
      return {
        token: response.data.token,
        email: response.data.email,
        // Datos básicos que ya vienen en la respuesta
        user: {
          name: response.data.name || extraerNombreDeEmail(response.data.email),
          role: response.data.role || 'Empleado'
        }
      };
    } catch (error) {
      let errorMessage = "Error de conexión";
      if (error.response) {
        if (error.response.status === 401) {
          errorMessage = "Credenciales incorrectas. Verifica tus datos.";
        } else {
          errorMessage = error.response.data?.message || `Error ${error.response.status}`;
        }
      }
      return rejectWithValue(errorMessage);
    }
  }
);

// Función helper para extraer nombre del email
function extraerNombreDeEmail(email) {
  if (!email) return 'Usuario';
  return email.split('@')[0].charAt(0).toUpperCase() + 
         email.split('@')[0].slice(1);
}

// 2. Nueva función para obtener datos completos del usuario
export const fetchUserDetails = createAsyncThunk(
  "auth/fetchUserDetails",
  async (_, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      
      // Opción A: Usando axios (recomendado)
      // const response = await api.get(`/api/users?email=${encodeURIComponent(auth.email)}`);
      
      // Opción B: Usando fetch (si prefieres)
    
      const response = await fetch(`http://localhost:5091/api/users?email=${encodeURIComponent(auth.email)}`, {
        headers: {
          'Authorization': `Bearer ${auth.token}`
        }
      });
      const data = await response.json();
    
      
      const userData = response.data[0]; // Asumiendo que devuelve un array
      
      if (!userData) {
        throw new Error("Usuario no encontrado en la base de datos");
      }
      
      // Obtener el nombre del rol si existe
      let roleName = 'Empleado';
      if (userData.roleId) {
        const roleResponse = await api.get(`/api/roles/${userData.roleId}`);
        roleName = roleResponse.data.name || roleName;
      }
      
      return {
        name: userData.name || extraerNombreDeEmail(auth.email),
        role: roleName,
        avatar: userData.avatar // Si tienes este campo
      };
      
    } catch (error) {
      console.error("Error al cargar datos del usuario:", error);
      // No rechazamos para no interrumpir el flujo
      return rejectWithValue("No se pudieron cargar todos los datos del usuario");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: { 
    token: storedToken,
    email: null,
    user: {
      name: null,
      role: null,
      avatar: null
    },
    loading: false,
    error: null,
    isAuthenticated: !!storedToken,
    detailsLoaded: false // Nuevo campo para saber si se cargaron los detalles
  },
  reducers: {
    logout: (state) => {
      state.token = null;
      state.email = null;
      state.user = {
        name: null,
        role: null,
        avatar: null
      };
      state.isAuthenticated = false;
      state.detailsLoaded = false;
      localStorage.removeItem("token");
    }
  },
  extraReducers: (builder) => {
    builder
      // Login original
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.email = action.payload.email;
        state.user.name = action.payload.user.name;
        state.user.role = action.payload.user.role;
        state.isAuthenticated = true;
        state.loading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Carga de detalles adicionales
      .addCase(fetchUserDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserDetails.fulfilled, (state, action) => {
        state.user.name = action.payload.name;
        state.user.role = action.payload.role;
        if (action.payload.avatar) {
          state.user.avatar = action.payload.avatar;
        }
        state.detailsLoaded = true;
        state.loading = false;
      })
      .addCase(fetchUserDetails.rejected, (state, action) => {
        state.loading = false;
        // No mostramos error para no afectar la experiencia
        console.warn(action.payload);
      });
  }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;