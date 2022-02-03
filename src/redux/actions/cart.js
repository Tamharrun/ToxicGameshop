import Axios from "axios"
import { API_URL } from "../../constans/API"

export const getCardData = (userId) => {
    return (dispatch) => {
        Axios.get(`${API_URL}/cart`, {
            params: {
                userId,
            }
        })
        .then((result) => {
            dispatch({
                type: "FILL_CART",
                payload: result.data,
            })
        })
        .catch(() => {
            alert("terjadi kesalahan")
        })
    }
}