import React from 'react';
import { Component } from 'react';
import '../css/SignUpCSS.css';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
class SignUp extends Component {

    render() {
        return (
            <div className="MainContainer" style={{ marginTop: "5%"}}>
                <div style={{ color: 'black',textAlign:"center"}}>
                    <span style={{ color: '#4285F4' }}>F</span>
                    <span style={{ color: '#DB4437' }}>u</span>
                    <span style={{ color: '#F4B400' }}>n</span>
                    <span style={{ color: '#4285F4' }}>d</span>
                    <span style={{ color: '#0F9D58' }}>o</span>
                    <span style={{ color: '#DB4437' }}>o</span>
                </div>
                <div style={{textAlign:"center"}}>
                    Create your Fundoo Account
                </div>
                <div className="RowContainer" style={{ marginTop: "2%" }}>
                    <div>
                    <TextField
                        id="outlined-basic"
                        label="First name"
                        variant="outlined"
                        margin="dense"
                    />
                    </div>
                    <div style={{ marginLeft: "7%" }}>
                    <TextField
                        id="outlined-basic"
                        label="Last name"
                        variant="outlined"
                        margin="dense"
                    />
                    </div>
                </div>

                <div style={{ marginTop: "5%" }}>
                    <TextField
                        id="outlined-basic"
                        label="Email"
                        variant="outlined"
                        margin="dense"
                        fullWidth
                    />
                </div>

                <div className="RowContainer" style={{ marginTop: "2%" }}>
                    <div>
                        <TextField
                            id="outlined-basic"
                            label="Password"
                            variant="outlined"
                            margin="dense"
                            type='password'
                        />
                    </div>
                    <div style={{ marginLeft: "7%" }}>
                        <TextField
                            id="outlined-basic"
                            label="Confirm"
                            variant="outlined"
                            margin="dense"
                            type='password'
                        />
                    </div>
                </div>

                <div className="RowContainer" style={{ marginTop: "7%" }}>

                    <a href="/" style ={{color:"#1a73e8",textDecoration:'none',fontSize:'90%'}}> Sign in instead </a> 
                        
                    <Button variant="contained" style={{ backgroundColor: '#1a73e8', color: 'white', textTransform: 'capitalize' }} disableElevation>
                        Next
                    </Button>

                </div>

            </div>
        )
    }
}
export default SignUp;