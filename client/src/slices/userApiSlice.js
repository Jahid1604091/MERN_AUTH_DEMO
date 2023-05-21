import { apiSlice } from "./apiSlice";
const URL = 'api/users';

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        login:builder.mutation({
            query:(data)=>({
                url:`${URL}/auth`,
                method:'POST',
                body:data
            })
        }),

        register:builder.mutation({
            query:(data)=>({
                url:`${URL}`,
                method:'POST',
                body:data
            })
        }),

        logout:builder.mutation({
            query:()=>({
                url:`${URL}/logout`,
                method:'POST',
            })
        }),

    })
});

export const {useLoginMutation, useRegisterMutation,useLogoutMutation} = userApiSlice;