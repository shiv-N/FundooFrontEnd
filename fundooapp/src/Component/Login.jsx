import React from 'react';
import { Component } from 'react';
import '../css/LoginCSS.css';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class Login extends Component {

    render() {
        return (
            <div className="MainContainer" style={{ marginTop: "5%" }}>

                <div style={{ color: 'black', textAlign: "center" }}>
                    <span style={{ color: '#4285F4' }}>F</span>
                    <span style={{ color: '#DB4437' }}>u</span>
                    <span style={{ color: '#F4B400' }}>n</span>
                    <span style={{ color: '#4285F4' }}>d</span>
                    <span style={{ color: '#0F9D58' }}>o</span>
                    <span style={{ color: '#DB4437' }}>o</span>
                </div>
                <div style={{ textAlign: "center" }}>
                    Sign in <br></br>to continue to Gmail
                    </div>

                <TextField style={{ marginTop: "5%" }}
                    id="outlined-basic"
                    label="Email"
                    variant="outlined"
                    margin="dense"
                    fullWidth
                />
                <TextField className="RowContainer" style={{ marginTop: "5%" }}
                    id="outlined-basic"
                    label="Password"
                    variant="outlined"
                    margin="dense"
                    type='password'
                    fullWidth
                />

                <div className="RowContainer">
                    
                    <a href="/signup" style ={{color:"#1a73e8",textDecoration:'none',fontSize:'90%'}}> Create account </a>
                   
                          {/* <span href="/signup" color="#1a73e8" style={{ textTransform: 'capitalize' }}>Create account</span> */}
                    <Button variant="contained" style={{ backgroundColor: '#1a73e8', color: 'white', textTransform: 'capitalize' }} disableElevation>
                        Next
                    </Button>


                </div>
            </div>
        )
    }
}
export default Login;