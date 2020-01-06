import React from 'react';
import { Component } from 'react';
// import '../css/TakenoteCSS.css'
// import InputBase from '@material-ui/core/InputBase';
import CustomizedInputBase from './CustomizedInputBase'


class TakeNotes extends Component{
    render(){
        return(
            <div>
                <CustomizedInputBase />
            </div>
        )
    }
}
export default TakeNotes;