import Axios from "axios";
import { API_URL } from '../../constans/API'
// import {Route, Routes} from 'react-router-dom';
// import Home from '../pages/Home';



export const registerUser = ({ username, fullName, email, password }) => {
    return(dispatch) => {        
        Axios.post(`${API_URL}/users`, {
            username,
            fullName,
            email,
            password,
            role: "user",
        })
        .then((result) => {
            delete result.data.password
            dispatch({
                type: "USER_LOGIN",
                payload: result.data
            })
            alert("Berhasil mendaftar")
        })
        .cath(() => {
            alert("Gagal mendaftar")
        })
    }
}

export const loginUser = ({ username, password }) => {
    return (dispatch) => {
        Axios.get(`${API_URL}/users`, {
            params: {
                username,
            }
        })
        .then((result) => {
            if (result.data.length) {
                if (password === result.data[0].password) {
                    delete result.data[0].password
                    localStorage.setItem("userDataToxicgameshop", JSON.stringify(result.data[0]))

                    dispatch({
                        type: "USER_LOGIN",
                        payload: result.data[0]
                    })
                } else {
                    // Handle error wrong passrword
                    dispatch({
                        type: "USER_ERROR",
                        payload: "Wrong password!"
                    })
                }
            } else {
                // Handle error wrong password
                dispatch({
                    type: "USER_ERROR",
                    payload: "User not found",
                })
            }
        })
        .catch((err) => {
            alert("Terjadi kesalahan")
        })
    }
}

export const logoutUser = () => {
    localStorage.removeItem("userDataToxicgameshop");
    return{
        type: "USER_LOGOUT"
        // <Routes>
        //         <Route path="/" element={<Home />} />
        //     </Routes>
    }
}

export const userKeepLogin = (userData) => {
    return (dispatch) => {
        Axios.get(`${API_URL}/users`, {
            params: {
                id: userData.id
            }
        })
        .then((result) => {
            dispatch({
                type: "USER_LOGIN",
                payload: result.data[0]
            })
        })
        .catch(() => {
            alert("Terjadi kesalahan")
        })
    }
}

export const checkStorage = () => {
    return {
        type: "CHECK_STORAGE",
    }
}