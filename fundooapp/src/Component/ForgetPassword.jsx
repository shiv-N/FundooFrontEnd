import React from 'react';
import { Component } from 'react';
import '../css/SignInCSS.css';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import UserService from '../Servises/UserService';

var userService = new UserService();
class ForgetPassword extends Component {

    constructor(props) {
        super(props)
        this.state = {
            email: ''
        }
    }
    // eslint-disable-next-line
    ForgetUserPassword= () => {
        var data = {
            Email: this.state.email,
        }
        userService.ForgetPassword(data).then(response => {
            console.log('this is response from backend:', response);

        })
    }
    // change=(key,event)=>{
    // console.log(key,"im in",event.target);
    // this.setState({[key]:event.target.value});
    // }
    onChange = (e) => {
        this.setState(
            {
                [e.target.name]: e.target.value
            }
        )

    }
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
                    Account recovery <br></br>Recover your Fundoo Account
                    </div><br></br><br></br>

                <TextField style={{ marginTop: "5%" }}
                    id="outlined-basic"
                    label="Email"
                    variant="outlined"
                    margin="dense"
                    placeholder="Email"
                    fullWidth
                    name='email'
                    onChange={this.onChange}
                />

                <div className="RowContainer" style={{ justifyContent: "flex-end",marginRight:"5%" }}>

                    <Button variant="contained" onClick={this.ForgetUserPassword} style={{ backgroundColor: '#1a73e8', color: 'white', textTransform: 'capitalize' }} disableElevation>
                        Next
                    </Button>


                </div>
            </div>
        )
    }
}
export default ForgetPassword;