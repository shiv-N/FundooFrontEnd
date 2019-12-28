import React from 'react'
import { Component } from 'react';
import '../css/SignUpCSS.css'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
class SignUp extends Component {

    render() {
        return (
            <div className="MainContainer">
                <div style={{ color: 'black' }}>
                    <span style={{ color: '#4285F4' }}>F</span>
                    <span style={{ color: '#DB4437' }}>u</span>
                    <span style={{ color: '#F4B400' }}>n</span>
                    <span style={{ color: '#4285F4' }}>d</span>
                    <span style={{ color: '#0F9D58' }}>o</span>
                    <span style={{ color: '#DB4437' }}>o</span>
                </div>
                <div>
                    Create your Fundoo Account
                </div>
                <div className="RowContainer">
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

                <div style={{ marginTop: "2%" }}>
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

                    <div>
                        <Button color="#1a73e8" style={{ textTransform: 'capitalize' }} >Sign in instead</Button>
                    </div>

                    <div style={{ marginLeft: "50%" }}>
                        <Button variant="contained" style={{ backgroundColor: '#1a73e8', color: 'white', textTransform: 'capitalize' }} disableElevation>
                            Next
                        </Button>
                    </div>

                </div>

            </div>
        )
    }
}
export default SignUp;