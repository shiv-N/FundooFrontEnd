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
        
        this.setState(
            {
                view: value
            }
        )
    }
    onDragStart=(e,id)=>{
        console.log('id',id);
        e.dataTransfer.setData('id',id);
      }
    DisplayPinNotes=(value,index)=> {
        return(
            value.isPin?
            <div key={"pinned"+index} 
            onDragStart={(e)=>this.onDragStart(e,"pinned"+index)}
            draggable>   
                <DisplayNote noteData={value} key={"pinned"+index} handleGetNotes={this.handleGetNotes}/>
            </div>:null
         ) }

    DisplayUnPinNotes=(value,index)=> {
        return(
            <div key={"pinned"+index}
            onDragStart={(e)=>this.onDragStart(e,"pineed"+index)}
            draggable   
            >
                {!value.isPin?<DisplayNote  noteData={value} key={"pineed"+index} handleGetNotes={this.handleGetNotes} draggable/>:null}
            </div>
        ) }
    onDragOver=(e)=>{
        e.preventDefault();
    }
    onDrop=(e)=>{

    }
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
                        <div className='PinKeywords'>
                        Pinned
                        </div>:null
                    }
                    
                    <div className="noteContainer" style={{marginTop:"1em"}}
                    onDragOver={(e)=>this.onDragOver(e)}
                    onDrop={(e)=>this.onDrop(e,'pinned')}
                    >
                    
                        {
                            this.state.getAllUserNotes !== null &&
                            (this.state.getAllUserNotes).map((value,index) => (
                                this.DisplayPinNotes(value,index)
                            ))
                        }
                        
                    </div>
                    {   pin.length !==0?
                    <div className='PinKeywords'>
                    Others
                    </div>:null}
                    <div className="noteContainer" style={{marginTop:"1em"}}
                    onDragOver={(e)=>this.onDragOver(e)}
                    onDrop={(e)=>this.onDrop(e,'unpineed')}
                    >
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