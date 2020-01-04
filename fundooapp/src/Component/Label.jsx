import React from 'react';
import { Component } from 'react';
import TakeNotes from './TakeNotes';
import DisplayComponets from './DisplayComponents'

class Label extends Component{
    render(){
        return(
            
            <div style={{ marginTop: "15%",marginLeft:"50%" }}>
               <TakeNotes/><tr><DisplayComponets/> </tr>from Label
            </div>
        )
    }
}
export default Label;