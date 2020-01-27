import React from 'react';
import { Component } from 'react';
import CustomizedInputBase from './CustomizedInputBase'
import TakeNotes from './TakeNotes';
import { Container } from '@material-ui/core';
import '../css/dashboard.css';
// import { ClickAwayListener } from '@material-ui/core';
import DisplayNote from './DisplayNote'
import UserService from '../Service/UserService';

var userService = new UserService();

class Note extends Component {
    constructor(props) {
        super(props)
        this.state = {
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
    onClose=(value)=>{
        console.log('im in on close');
        
        this.setState(
            {
                view: value
            }
        )
    }
    DisplayPinNotes=(value,index)=> {
        return(
            <>   
                {value.isPin?<DisplayNote noteData={value} key={index} handleGetNotes={this.handleGetNotes}/>:null}
            </>
         ) }

    DisplayUnPinNotes=(value,index)=> {
        return(
            <>
                {!value.isPin?<DisplayNote noteData={value} key={index} handleGetNotes={this.handleGetNotes}/>:null}
            </>
        ) }
    render() {
        
        let pin = this.state.getAllUserNotes.filter(function (data) {
            return data.isPin === true;
        })
        
        return ( 

            <div>
                <Container style={{ marginTop: '6em' }}>
                    <div className="maincontainer">
                        {/* <ClickAwayListener onClickAway={() => this.onChange(false)}> */}
                            <div className='takeNote' onClick={() => this.onChange(true)}>
                                {!this.state.view ? <TakeNotes /> : <CustomizedInputBase handleGetNotes={this.handleGetNotes} change={this.onClose}/>}
                            </div>
                        {/* </ClickAwayListener> */}
                    </div>
                    {   pin.length !==0?
                        <div style={{ marginLeft: "18em",marginTop:"3em"}}>
                        Pinned
                        </div>:null
                    }
                    
                    <div className="noteContainer" style={{marginTop:"1em"}}>
                    
                        {
                            this.state.getAllUserNotes !== null &&
                            (this.state.getAllUserNotes).map((value,index) => (
                                this.DisplayPinNotes(value,index)
                            ))
                        }
                        
                    </div>
                    {   pin.length !==0?
                    <div style={{ marginLeft: "18em",marginTop:"2em"}}>
                    Others
                    </div>:null}
                    <div className="noteContainer" style={{marginTop:"1em"}}>
                        {
                            this.state.getAllUserNotes !== null &&
                            (this.state.getAllUserNotes).map((value,index) => (
                                 this.DisplayUnPinNotes(value,index)
                            ))
                        }
                    </div>
                </Container>
               
            </div>
        )
    }
}
export default Note;