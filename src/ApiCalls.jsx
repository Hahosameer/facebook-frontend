import axios from "axios";
import { json } from "react-router";
import { serverUrl } from "./utils/appConstants";
export const loginCall = async (userCredentials, dispatch) => {
    dispatch({type: "LOGIN_START"});
    try {
        const res = await axios.post(`${serverUrl}/api/auth/login`, userCredentials);
        dispatch({type: "LOGIN_SUCCESS", payload: res.data});
        localStorage.setItem('loginUser', JSON.stringify(res.data))
    } catch (error) {
        dispatch({type: "LOGIN_FAILURE", payload: error});
    }
};
