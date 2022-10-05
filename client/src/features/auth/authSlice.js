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
        }
    }
})
export const {setProfile} = authSlice.actions;
export default authSlice.reducer;