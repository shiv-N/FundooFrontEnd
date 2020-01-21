import React from 'react';
import { Component } from 'react';
// import DisplayComponets from './DisplayComponents'
import CustomizedInputBase from './CustomizedInputBase'
import TakeNotes from './TakeNotes';
import { Container } from '@material-ui/core';
import '../css/dashboard.css';
import { ClickAwayListener } from '@material-ui/core';
import DisplayNote from './DisplayNote'
import UserService from '../Service/UserService';

var userService = new UserService();

class Reminder extends Component{
    constructor(props){
        super(props)
        this.state={
            view: false,
            getAllUserNotes: []
        }
    }

    componentDidMount() {
        this.handleGetNotes();
    }

    handleGetNotes = () => {
        
        userService.getAllNote().then(response => {
            this.setState({
                getAllUserNotes: response.data.data,
                view: false,
            })
        });

    }
    onChange(value) {
        this.setState(
            {
                view: value
            }
        )

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
            </div>

            <div className="noteContainer">
                        {
                            this.state.getAllUserNotes !== null &&
                            (this.state.getAllUserNotes).map((value,index) => (
                                
                                value.addReminder !==null?
                                <DisplayNote noteData={value} key={index} handleGetNotes={this.handleGetNotes}/>:null
                                
                            ))
                        }
                    </div>
        </Container>

        )
    }
}
export default Reminder;