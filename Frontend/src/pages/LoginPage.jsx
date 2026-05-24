import React from 'react'

import{
    useState,
    useContext
} from "react"

import { useNavigate,Link } from 'react-router-dom'
import { loginUser } from '../services/authService'
import { AuthContext } from '../context/AuthContext'



function LoginPage(){
    const navigate = useNavigate();

    const {login} = useContext(AuthContext);

    const [email,setEmail] =  useState("");
    const[password,setPassword] = useState("")
    const [error,setError] = useState("");

    const handleLogin = async (e)=>{
        e.preventDefault();

        try{
            const response = await loginUser(email,password);

            login(response.access_token);

            navigate('/bicycles');
        }catch(err){
            setError("Invalid credentials");
        }
    };
    return(
        <div>
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <div>
                    <input 
                    type="email"
                    placeholder='Enter Email'
                    value={email}
                    onChange={(e)=>
                        setEmail(e.target.value)
                    }
                    />

                </div>

                <br/>
                <div>
                    <input 
                    type="password" 
                    placeholder='Enter Password'
                    value={password}
                    onChange={(e)=>
                        setPassword(e.target.value)
                    }/>
                </div>
                <br/>
                <button type="Submit">Login</button> <Link to="/register">Create Account</Link>
            </form>
            <p>{error}</p>
        </div>
    );
   
}

export default LoginPage
