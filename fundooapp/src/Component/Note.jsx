import React from 'react';
import { Component } from 'react';
// import TakeNotes from './TakeNotes';
// import DisplayComponets from './DisplayComponents'
import CustomizedInputBase from './CustomizedInputBase'
import TakeNotes from './TakeNotes';
import { Container } from '@material-ui/core';
import '../css/dashboard.css';
import { ClickAwayListener } from '@material-ui/core';
import DisplayNote from './DisplayNote'
import UserService from '../Servises/UserService';

var userService = new UserService();

class Note extends Component{
    constructor(props){
        super(props)
        this.state={
            view: false,
            getAllUserNotes:[]
        }
    }

    componentDidMount(){
        userService.getAllNote().then(response=> {
                console.log(response);
                let responseArray=[]

                response.data.data.map((data)=>{
                    responseArray.push(data);
                });
                console.log('responce array:',responseArray);
                
                this.setState({
                    getAllUserNotes: responseArray
                })
                console.log('########array:',this.state.getAllUserNotes)
        });
    }

    onChange(value){
        this.setState(
            {
                view : value
            }
        )
        console.log(this.state.view);
        
    }
    render(){

        return(
            
            // <div style={{ marginTop: "8%" }}>
            //    <TakeNotes/><tr><DisplayComponets/> </tr>from Note
            // </div>
            <div>
            <Container style={{marginTop: '6em'}}>
                <div className="maincontainer">
                <ClickAwayListener onClickAway={()=>this.onChange(false)}>
                <div className='takeNote' onClick={()=>this.onChange(true)}>
                 { !this.state.view ? <TakeNotes/> :<CustomizedInputBase /> }
                </div>
                </ClickAwayListener>
                </div>
            </Container>
            <div className="main" style={{marginTop: '4em',marginLeft:"20%"}}>
                <DisplayNote note={this.state.getAllUserNotes}/>
            </div>
            </div>
        )
    }
}
export default Note;