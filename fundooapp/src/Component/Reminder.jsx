import React from 'react';
import { Component } from 'react';
// import DisplayComponets from './DisplayComponents'
import CustomizedInputBase from './CustomizedInputBase'
import TakeNotes from './TakeNotes';
import { Container } from '@material-ui/core';
import '../css/dashboard.css';
import { ClickAwayListener } from '@material-ui/core';

class Reminder extends Component{
    constructor(props){
        super(props)
        this.state={
            view: false
        }
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
            
            <Container style={{marginTop: '6em'}}>
            <div className="maincontainer">
            <ClickAwayListener onClickAway={()=>this.onChange(false)}>
            <div className='takeNote' onClick={()=>this.onChange(true)}>
             { !this.state.view ? <TakeNotes/> :<CustomizedInputBase /> }
            </div>
            </ClickAwayListener>
            {this.state.view}
            </div>
        </Container>
            // <div style={{ marginTop: "15%",marginLeft:"50%" }}>
            //    <TakeNotes/><tr><DisplayComponets/> </tr>from Reminder
            // </div>
        )
    }
}
export default Reminder;