import React from 'react';
import { Component } from 'react';
// import TakeNotes from './TakeNotes';
// import DisplayComponets from './DisplayComponents'
import CustomizedInputBase from './CustomizedInputBase'
import TakeNotes from './TakeNotes';
import { Container } from '@material-ui/core';
import '../css/dashboard.css';
import { ClickAwayListener } from '@material-ui/core';
import DisplayNote from './DisplayNote'
import UserService from '../Servises/UserService';

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
        console.log('get all  notes');
        
        userService.getAllNote().then(response => {
            console.log(response);
            let responseArray = []

            console.log("response of notes--> ", response.data.data)
            // response.data.data.map((data) => {
            //     responseArray.push(data);
            // });
            // console.log('array');
            // console.log(responseArray);


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
        console.log(this.state.view);

    }
    render() {
       
        // console.log(this.props,this.state);
        
        
        return (

            // <div style={{ marginTop: "8%" }}>
            //    <TakeNotes/><tr><DisplayComponets/> </tr>from Note
            // </div>
            <div>
                <Container style={{ marginTop: '6em' }}>
                    <div className="maincontainer">
                        <ClickAwayListener onClickAway={() => this.onChange(false)}>
                            <div className='takeNote' onClick={() => this.onChange(true)}>
                                {!this.state.view ? <TakeNotes /> : <CustomizedInputBase handleGetNotes={this.handleGetNotes} />}
                            </div>
                        </ClickAwayListener>
                    </div>

                    <div className="noteContainer">
                        {
                            this.state.getAllUserNotes !== null &&
                            (this.state.getAllUserNotes).map((value, index) => (
                                <DisplayNote
                                    noteData={value}
                                />

                            ))
                        }
                    </div>
                </Container>
                {/* <div className="main" style={{marginTop: '4em',marginLeft:"20%"}}>
                <DisplayNote note={this.state.getAllUserNotes}/>
            </div> */}

            </div>
        )
    }
}
export default Note;