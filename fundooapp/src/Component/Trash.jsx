import React from 'react';
import { Component } from 'react';
import '../css/dashboard.css';
import UserService from '../Service/UserService';
import DisplayNote from './DisplayNote'

var userService = new UserService();


class Trash extends Component{
    constructor(props) {
        super(props)
        this.state = {
            getAllNotes: []
        }
    }
    
    componentDidMount() {
        this.handleGetNotes();
    }
    
    handleGetNotes = () => {
        
        userService.getAllTrashNotes().then(response => {
            
            this.setState({
                getAllNotes: response.data.data,
            })
        });
    }

    render(){
        return(
            
            <div className="noteContainer" style={{marginTop:'6em',marginLeft:'20em'}}>
                        {
                            this.state.getAllNotes !== null &&
                            (this.state.getAllNotes).map((value,index) => (
                                <DisplayNote noteData={value} key={index} handleGetNotes={this.handleGetNotes}/>
                            ))
                        }
                    </div>
        )
    }
}
export default Trash;