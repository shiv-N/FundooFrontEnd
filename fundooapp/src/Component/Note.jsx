import React from 'react';
import { Component } from 'react';
// import TakeNotes from './TakeNotes';
// import DisplayComponets from './DisplayComponents'
import CustomizedInputBase from './CustomizedInputBase'
import { Container } from '@material-ui/core';
import '../css/dashboard.css'

class Note extends Component{
    render(){
        return(
            
            // <div style={{ marginTop: "8%" }}>
            //    <TakeNotes/><tr><DisplayComponets/> </tr>from Note
            // </div>
            <Container style={{marginTop: '6em'}}>
                <div className="maincontainer">
                <div className='takeNote'>
                    <CustomizedInputBase />
                </div>
                </div>
            </Container>
        )
    }
}
export default Note;