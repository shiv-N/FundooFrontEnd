import React from 'react';
import { Component } from 'react';
import '../css/SignInCSS.css';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import UserService from '../Servises/UserService';

var loginObject = new UserService();

class Login extends Component {

    constructor(props){
        super(props)
        this.state={
            email:'',
            password:'',
            emailError:'',
            passwordError:''
        };
        // this.login= this.login.bind(this)
    }
login =(event) =>{
    event.preventDefault();
    let isValid = this.validate();
    
    if(isValid){
        var data = {
            Email: this.state.email,
            Password : this.state.password
        }
        loginObject.Login(data).then(response =>{

                console.log('this is response from backend:',response);
            var token= response.data.data.token;
            console.log('Backend recevied token:',token);
            localStorage.setItem('Token',token)
            this.props.history.push('/dashboard/note');
           
        })
    }  
    
}

validate = () =>{

    let valid = true;
    if(!this.state.email.match(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/)){
        this.setState({emailError:'Invalid Email Address'})
        console.log(this.state.emailError);
        valid=false;
    }
    else{
        this.setState({emailError:''})
    }
    if(!this.state.password){
        this.setState({passwordError:'Empty Password'})
        console.log(this.state.passwordError);
        valid=false;
    }
    else{
        this.setState({passwordError:''})
    }
    if(valid){
        return true;
    }else{
        return false;
    }
    
}
// change=(key,event)=>{
// console.log(key,"im in",event.target);
// this.setState({[key]:event.target.value});
// }
onChange=(e) =>{
    this.setState(
        {
            [e.target.name]: e.target.value
        }
    )
    console.log(this.state);
    
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
                    Sign in <br></br>to continue to Gmail
                    </div>

                <TextField style={{ marginTop: "5%" }}
                    id="outlined-basic"
                    label="Email"
                    variant="outlined"
                    margin="dense"
                    placeholder="Email"
                    fullWidth
                    name='email'
                    // value={this.state.email}
                    onChange={this.onChange}
                    // onChange={(event)=>this.change('email',event)}
                />
                <div style={{fontSize:12,color:'red'}}>
                    {this.state.emailError }
                </div>
                <TextField className="RowContainer" style={{ marginTop: "5%" }}
                    id="outlined-basic"
                    label="Password"
                    variant="outlined"
                    placeholder="Password"
                    margin="dense"
                    name='password'
                    type='password'
                    fullWidth
                    // value = {this.state.password}
                    onChange={ this.onChange}
                    // onChange={(event=>this.change('password',event))}
                />
                 <div style={{fontSize:12,color:'red'}}>
                    {this.state.passwordError}
                </div>
                <Link to="/forget" style ={{color:"#1a73e8",textDecoration:'none',fontSize:'90%'}}> Forgot Password? </Link>

                <div className="RowContainer">
                    
                    <Link to="/register" style ={{color:"#1a73e8",textDecoration:'none',fontSize:'90%'}}> Create account </Link>
                   
                    <Button variant="contained" onClick={this.login} style={{ backgroundColor: '#1a73e8', color: 'white', textTransform: 'capitalize' }} disableElevation>
                        Next
                    </Button>


                </div>
            </div>
        )
    }
}
export default Login;