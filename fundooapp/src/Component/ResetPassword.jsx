import React from 'react';
import { Component } from 'react';
import '../css/RegistrationCSS.css';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import UserService from '../Servises/UserService';

var userService = new UserService();

class ResetPassword extends Component {

    constructor(props){
        super(props)
        this.state={
            password:''
        }
    }

 

    Reset=() =>{
        console.log(this.props.match.params.token);
        var registerdData = {
            Password: this.state.password
        }
        console.log(this.props.match.params.token,'this is response from backend:');
        var Token=this.props.match.params.token
        localStorage.setItem('Token',Token)
        userService.resetPassword(registerdData).then(
            response => {
                console.log(this.props.match.params.token,'this is response from backend:',response);
            }
        )
    }

    onChange=(e) =>{
        this.setState(
            {
                [e.target.name]: e.target.value
            }
        )
        console.log('this is response from backend:',this.state.password); 
    }

    render() {
        return (
            <div className="MainContainer" style={{ marginTop: "5%", borderRadius:'8px'}}>
                <div style={{ color: 'black',textAlign:"center"}}>
                    <span style={{ color: '#4285F4' }}>F</span>
                    <span style={{ color: '#DB4437' }}>u</span>
                    <span style={{ color: '#F4B400' }}>n</span>
                    <span style={{ color: '#4285F4' }}>d</span>
                    <span style={{ color: '#0F9D58' }}>o</span>
                    <span style={{ color: '#DB4437' }}>o</span>
                </div>
                <div style={{textAlign:"center"}}>
                    Reset Fundoo Password
                </div>

                <div className="RowContainer" style={{ marginTop: "15%" }}>
                        <TextField
                            id="outlined-basic"
                            label="Password"
                            variant="outlined"
                            margin="dense"
                            fullWidth
                            type='password'
                            name='password'
                            onChange={ this.onChange}
                        />
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

                <div className="RowContainer" style={{ marginTop: "12%",justifyContent: "flex-end",marginRight:"5%", marginBottom:'21%' }}>
                        
                    <Button variant="contained" onClick={this.Reset} style={{ backgroundColor: '#1a73e8', color: 'white', textTransform: 'capitalize' }} disableElevation>
                        Next
                    </Button>

                </div>

            </div>
        )
    }
}
export default ResetPassword;