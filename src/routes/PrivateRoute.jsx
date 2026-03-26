import { useContext } from "react"
import { AuthContext } from "../Context/AuthContext"
import { useNavigate } from "react-router-dom"

export function PrivateRoute({children}){
    const {isLoggedIn} = useContext(AuthContext);
    const Navigate = useNavigate()

    if(!isLoggedIn)return Navigate("/")

    return children
}