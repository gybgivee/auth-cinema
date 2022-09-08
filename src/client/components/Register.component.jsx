import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom"
import { useContext } from "react";
import { UserDataContext } from "../contexts/UserData.context";
const Register = () => {

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
        console.log('formFields', formFields);
      
        try {
  
            const respone = await fetch('http://localhost:4000/user/register', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ username, password })
            });
      
            const data = await respone.json();
            console.log(data.data);
            setCurrentUser(data.data.user);
            navigate('/');

          } catch (error) {
            console.log({ error });
          }
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        console.log(name, value);
        //only update name to value
        setFormFields({ ...formFields, [name]: value });

    }
    return (
        <div className="sign-up-container">
            <h2>Register</h2>
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
                    <button onClick={handleSubmit}>SIGN UP</button>
                </div>
            </form>

        </div>

    )
}
export default Register;