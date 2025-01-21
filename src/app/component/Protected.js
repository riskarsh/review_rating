import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Protected(props){
    const {Component} =props
    const navigate = useNavigate()

    useEffect(() => {
        let login = localStorage.getItem("user")
        // console.log("user ", login)
        if(!login){
            navigate('/login')
        }
    } )
    return(
        <div>
            <Component/>
        </div>
    )
}
export default Protected