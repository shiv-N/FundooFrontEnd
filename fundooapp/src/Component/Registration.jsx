import React from 'react';
import { Component } from 'react';
import '../css/RegistrationCSS.css';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import UserService from '../Servises/UserService';

var userService = new UserService();

class SignUp extends Component {

    constructor(props){
        super(props)
        this.state={
            firstname:'',
            lastname:'',
            phoneNumber:'',
            email:'',
            password:'',
            userAddress:'',
            serviceType:''
        }
    }



    Registration=() =>{

        var registerdData = {
            Firstname: this.state.firstname,
            Lastname: this.state.lastname,
            PhoneNumber: this.state.phoneNumber,
            Email: this.state.email,
            Password: this.state.password,
            UserAddress: this.state.userAddress,
            ServiceType: this.state.serviceType
        }
        userService.RegisterUser(registerdData).then(
            response => {
                console.log('this is response from backend:',response);
            }
        )
    }

    onChange=(e) =>{
        this.setState(
            {
                [e.target.name]: e.target.value
            }
        )
        
    }

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
                        name="firstname"
                        onChange={ this.onChange}
                    />
                    </div>
                    <div style={{ marginLeft: "7%" }}>
                    <TextField
                        id="outlined-basic"
                        label="Last name"
                        variant="outlined"
                        margin="dense"
                        name="lastname"
                        onChange={ this.onChange}
                    />
                    </div>
                </div>

                <div style={{ marginTop: "5%" }}>
                    <TextField
                        id="outlined-basic"
                        label="Email"
                        variant="outlined"
                        margin="dense"
                        name="email"
                        fullWidth
                        onChange={ this.onChange}
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
                            name='password'
                            onChange={ this.onChange}
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

                <div className="RowContainer" style={{ marginTop: "2%" }}>
                    <div>
                        <TextField
                            id="outlined-basic"
                            label="Phone Number"
                            variant="outlined"
                            name="phoneNumber"
                            margin="dense"
                            onChange={ this.onChange}
                        />
                    </div>
                    <div style={{ marginLeft: "7%" }}>
                        <TextField
                            id="outlined-basic"
                            label="Address"
                            variant="outlined"
                            name="userAddress"
                            margin="dense"
                            onChange={ this.onChange}
                        />
                    </div>
                </div>
                <div className="RowContainer" style={{ marginTop: "2%" }}>
                        <TextField
                            id="outlined-basic"
                            label="ServiceType"
                            variant="outlined"
                            name="serviceType"
                            margin="dense"
                            onChange={ this.onChange}
                        />
                    </div>
                <div className="RowContainer" style={{ marginTop: "7%" }}>

                    <Link to="/" style ={{color:"#1a73e8",textDecoration:'none',fontSize:'90%'}}> Sign in instead </Link> 
                        
                    <Button variant="contained" onClick={this.Registration} style={{ backgroundColor: '#1a73e8', color: 'white', textTransform: 'capitalize' }} disableElevation>
                        Next
                    </Button>

                </div>

            </div>
        )
    }
}
export default SignUp;