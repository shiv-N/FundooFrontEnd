import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles'
import Popper from '@material-ui/core/Popper';
import Fab from '@material-ui/core/Fab';
import ColorLensOutlinedIcon from '@material-ui/icons/ColorLensOutlined';
import IconButton from '@material-ui/core/IconButton';
import UserService from '../Service/UserService';
import { ClickAwayListener } from '@material-ui/core';

var userService = new UserService();

const useStyles = theme => ({
    paper: {
        width: '185px',
        maxWidth:'185px',
        minWidth:'125px',
        backgroundColor:'white',
        boxShadow:'0.1em 0.1em 0.4em 0em grey',
        display: 'flex',
        flexDirection: 'row', 
        justifyContent: "space-between",
        padding:'0.5%',
        flexWrap: 'wrap',
        '&:hover':{}
    },
    iconButton: {
        width:'28px',
        height:'28px',
        padding:5
      }
});

class ChangeColor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            click: false,
            anchorEl:null,
            color:''

        }
    }
    handlePopoverOpen = event => {
        if(this.state.anchorEl===null){
        this.setState({ anchorEl: event.currentTarget });
        }
        else{
            this.setState({ anchorEl: null });
        }
      };
   
    // handleClick = (event) => {
    //     this.setState({
    //         click: !this.state.click,
    //         anchorEl: event.currentTarget
    //     });
    // };

   async handleColorChange(value){
    
    await this.setState({
            color:value 
        });
        this.ChangeColor();
    }
    ChangeColor=()=>{
        var colorData={
            color : this.state.color
        }
        userService.ChangeColor(colorData,this.props.noteId).then(
            response =>{
                this.props.handleGetNotes();
            }
        )
    }
    render() {
        const { classes } = this.props;
        const { anchorEl } = this.state;
        const open = Boolean(anchorEl);
        return (
            <div>
                <IconButton onClick={this.handlePopoverOpen} className={classes.iconButton}>
                    <ColorLensOutlinedIcon fontSize="small" />
                {this.state.anchorEl !== null ?
                <ClickAwayListener onClickAway={() => this.setState({anchorEl:null})}>
                <Popper id={this.props.noteId} open={open} anchorEl={anchorEl}
                    // anchorOrigin = {{ horizontal: 'right', vertical: 'top' }}
                    // targetOrigin = {{ horizontal: "middle", vertical: "bottom" }}
                    className={classes.paper}   disableRestoreFocus>

                    {["#0000","#f28b82","#fbbc04","#fff475","#ccff90",
                    "#cbf0f8","#3e5fc1","#a7ffeb","#aecbfa","#d7aefb","#e6c9a8","#e8eaed"].map((text,index)=>( 
                        <Fab size='small' key={index} style={{ background: text }} aria-label="add" value="#0000" onClick={()=>this.handleColorChange(text)}></Fab>
                     ))}
                </Popper>
                </ClickAwayListener>
                : null}
                </IconButton>
            </div>
        );
    }
}
export default (withStyles)(useStyles)(ChangeColor);
