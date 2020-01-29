import React from 'react';
import { Component } from 'react';
import CustomizedInputBase from './CustomizedInputBase'
import TakeNotes from './TakeNotes';
import UserService from '../Service/UserService'
import { Container } from '@material-ui/core';
import DisplayNote from './DisplayNote'
import { connect } from 'react-redux';

var userService = new UserService();

class Label extends Component{
    constructor(props){
        super(props);
        this.state={
            view: false,
            LabelNotes: [],
            labelData:this.props.labelValue
        }
    }
    componentDidMount() {
        this.handleGetNotes(); 
    }
    componentDidUpdate(prevProps, prevState){
        if(prevProps !== this.props){
            return this.handleGetNotes();
        }
    }
    handleGetNotes = () => {
        if(this.props.labelValue !== null){
            userService.getLabelNote(this.props.labelValue.labelName).then(response => {
                this.setState({
                    LabelNotes: response.data.data,
                    view: false,
                })
            })
            .catch(
                error=>{
                    this.setState({
                        LabelNotes: [],
                        view: false,
                    })
                }
            )
        }
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
    
    render(){
        
        return(
            
            <div>
                <Container style={{ marginTop: '6em' }}>
                    <div className="maincontainer">
                        {/* <ClickAwayListener onClickAway={() => this.onChange(false)}> */}
                            <div className='takeNote' onClick={() => this.onChange(true)}>
                                {!this.state.view ? <TakeNotes /> : <CustomizedInputBase handleGetNotes={this.handleGetNotes} change={this.onClose}/>}
                            </div>
                        {/* </ClickAwayListener> */}
                    </div>
                    
                    <div className="noteContainer" style={{marginTop:"2em"}}>
                        {
                            this.state.LabelNotes !== null &&
                            this.state.LabelNotes.map((value,index) => (
                                <DisplayNote noteData={value} key={index} handleGetNotes={this.handleGetNotes}/>
                            ))
                        }
                    </div>
                </Container>
               
            </div>
        )
    }
}
const mapToStateProps = state =>{
    return{
        labelValue : state.labelValue
    }
  }
export default connect(mapToStateProps)(Label);