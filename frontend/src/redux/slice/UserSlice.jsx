import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosUser from "../../components/axios";
import { axiosGetData } from "../../components/axios";

const initialUser = {
  user: JSON.parse(localStorage?.getItem("user")) || null,
  error: "",
};

// HANDLE LOGIN ACTION
export const login = createAsyncThunk(
  "user/login",
  async (payload, thunkAPI) => {
    // console.log("Login: " + payload);
    try {
      const res = await axiosGetData.post("/auth/login", payload);
      return res.data;
    } catch (error) {
      // console.log(error.response.data);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// HANDLE LOGOUT ACTION
export const logout = createAsyncThunk(
  "user/logout",
  async (_, { getState }) => {
    const state = getState();
    const res = await axiosGetData.post(
      "/auth/logout",
      {
        token: state.user.user.refreshToken,
      },
      {
        headers: {
          authorization: `Bearer ${state.user?.user.accessToken}`,
        },
      }
    );
    return res.data;
  }
);

// REQUEST NEW ACCESS_TOKEN AND REFRESH_TOKEN
export const refreshToken = createAsyncThunk(
  "user/refreshToken",
  async (_, { getState }) => {
    const state = getState();
    const res = await axiosGetData.post(
      "http://localhost:8000/api/auth/refresh",
      {
        token: state.user?.user?.refreshToken,
      }
    );

    const newUser = {
      ...state.user.user,
      accessToken: res.data.accessToken,
      refreshToken: res.data.refreshToken,
    };
    return newUser;
  }
);

export const deleteUser = createAsyncThunk(
  "user/delete",
  async (payload, { getState }) => {
    // console.log(initialUser.user);
    const state = getState();
    console.log(state.user);
    const res = await axiosUser.delete(`/user/${payload}`, {
      headers: {
        authorization: `Bearer ${state.user?.user.accessToken}`,
      },
    });
    return res.data;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: initialUser,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        localStorage.setItem("user", JSON.stringify(action.payload));
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(logout.fulfilled, (state) => {
        localStorage.removeItem("user");
        state.user = null;
      })
      .addCase(refreshToken.fulfilled, (state, action) => {
        localStorage.setItem("user", JSON.stringify(action.payload));
        state.user = action.payload;
        // console.log(state.user);
      })
      .addCase(deleteUser.fulfilled, (state) => {
        state.error = false;
      });
  },
});

const { reducer } = userSlice;
export default reducer;
