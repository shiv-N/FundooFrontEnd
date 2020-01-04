import React from 'react';
import { Component } from 'react';
import TakeNotes from './TakeNotes';
import DisplayComponets from './DisplayComponents'

class Reminder extends Component{
    render(){
        return(
            
            <div style={{ marginTop: "15%",marginLeft:"50%" }}>
               <TakeNotes/><tr><DisplayComponets/> </tr>from Reminder
            </div>
        )
    }
}
export default Reminder;