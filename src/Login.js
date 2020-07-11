import React, { useState } from 'react';
import TextField from "@material-ui/core/TextField";
import { checkPassword } from './utility';
import Button from "@material-ui/core/Button";
import './App.css';


function Login(props) {
    const handleOnsubmit = () => {
        if(!!password){
            let checkAuth = checkPassword(password);
            if(checkAuth){
                props.handleSuccess();
            }else{
                setError('Wrong Password');
            }
        }
    }

    const handleOnChange = (e) => {
        setPassword(e.target.value)
    }
    
    const [error, setError] = useState(null);
    const [password, setPassword] = useState('');
    
    return (
        <div className='login-container'>
            <TextField
                error={!!error}
                label="Enter password"
                onChange={handleOnChange}
                value={password}
                helperText={error || null}
            />
            <Button className='login-btn' variant="outlined" color="primary" onClick={handleOnsubmit}>
                Log In
        </Button>
        </div>
    );
}

export default Login;