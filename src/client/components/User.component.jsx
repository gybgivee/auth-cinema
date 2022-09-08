import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom"
import { useContext } from "react";
import { UserDataContext } from "../contexts/UserData.context";
const User = () => {

    const defaultFromField = {
        username: '',
        password: '',
    }
    const [formFields, setFormFields] = useState(defaultFromField);
    const { currentUser, setCurrentUser } = useContext(UserDataContext)
    const { username, password } = formFields;

    const navigate = useNavigate();
 
    const handleSubmit = async (event) => {
        event.preventDefault();
    
        try {
            const respone = await fetch('http://localhost:4000/user/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });

            const data = await respone.json();
            console.log('user in login', data, data.user);
            data.token ? localStorage.setItem('authorization', data.token) : alert("Incorrect Password for username");
            setCurrentUser(data.user);
            navigate('/movie');

        } catch (e) {
            console.log({ e });
        }
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        console.log(name, value);
        //only update name to value
        setFormFields({ ...formFields, [name]: value });

    }
    return (
        <div className="sign-in-container">
            <h2>Already have an account ?</h2>
            <span>Sign in with your username and password</span>
            <form className="form-input">
                <div className="group">
                    <label className={`form-input-label`}>Username</label>
                    <input type="text" required name="username" onChange={handleChange} value={username} />
                </div>
                <div className="group">
                    <label className={`form-input-label`}>Password</label>
                    <input className="form-input" type="password" required name="password" onChange={handleChange} value={password} />
                </div>
                <div className="form--button-container">
                    <button onClick={handleSubmit}>Login</button>
                    <Link to={'/register'}><button>Register</button></Link>
                </div>
            </form>

        </div>

    )
}
export default User;