import {createSlice} from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name:'authentication',
    initialState:{
        user:localStorage.getItem('profile') ? JSON.parse(localStorage.getItem('profile')) : null
    },
    reducers:{
        setProfile:(state,action) => {
            state.user = action?.payload
            localStorage.setItem("profile", JSON.stringify(action?.payload));
        },
        logout:(state) => {
            localStorage.clear();
            state.user = null
        }
    }
})
export const {setProfile, logout} = authSlice.actions;
export default authSlice.reducer;