import axios from 'axios'
import { loginStart, loginFailure, loginSuccess, logout } from './UserReducer'



// export const login = async(dispatch, user)=> {
//     dispatch(loginStart());
//     try {
//         const res = await axios.post(`/api/user/login`, user);
//         dispatch(loginSuccess(res.data));
//     } catch (error) {
//         // console.log(error)
//         alert(error.response.data)
//         dispatch(loginFailure());
//     }
// }


// export const verifyEmail = async(dispatch, user)=> {
//     dispatch(loginStart());
//     try {
//         const res = await axios.post(`/api/user/verify/email`, user);
//         dispatch(loginSuccess(res.data));
//     } catch (error) {
//         dispatch(loginFailure());
//     }
// }


// export const signup = async(dispatch, user)=> {
//     dispatch(loginStart());
//     try {
//         const res = await axios.post(`/api/user/create/user`, user);
//         dispatch(loginSuccess(res.data));
//     } catch (error) {
//         dispatch(loginFailure());
//     }
// }


export const login = async(dispatch, user)=> {
    dispatch(loginStart());
    try {
        const res = await axios.post(`http://localhost:5000/api/user/login`, user);
        dispatch(loginSuccess(res.data));
    } catch (error) {
        dispatch(loginFailure());
    }
}


export const verifyEmail = async(dispatch, user)=> {
    dispatch(loginStart());
    try {
        const res = await axios.post(`http://localhost:5000/api/user/verify/email`, user);
        dispatch(loginSuccess(res.data));
    } catch (error) {
        dispatch(loginFailure());
    }
}


export const signup = async(dispatch, user)=> {
    dispatch(loginStart());
    try {
        const res = await axios.post(`http://localhost:5000/api/user/create/user`, user);
        dispatch(loginSuccess(res.data));
    } catch (error) {
        dispatch(loginFailure());
    }
}



