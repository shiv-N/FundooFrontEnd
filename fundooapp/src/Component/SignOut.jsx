import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles'
import Popper from '@material-ui/core/Popper';
import Fab from '@material-ui/core/Fab';
import ColorLensOutlinedIcon from '@material-ui/icons/ColorLensOutlined';
import IconButton from '@material-ui/core/IconButton';
import UserService from '../Service/UserService';
import { ClickAwayListener, Typography } from '@material-ui/core';
import Tooltip from '@material-ui/core/Tooltip'
import Button from '@material-ui/core/Button'; 
import { Avatar } from '@material-ui/core';

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

class SignOut extends Component {
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

   async handleColorChange(value){
    
    await this.setState({
            color:value 
        });
        if(this.props.colorCode === undefined){
            this.ChangeColor();
        }
        else{
            this.props.color(this.state.color);
        }
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
                <Tooltip title="Fundoo Account">
                    <IconButton onClick={this.handlePopoverOpen} >
                    <Avatar>S</Avatar>
                    </IconButton>
                </Tooltip>
                {this.state.anchorEl !== null ?
                <ClickAwayListener onClickAway={() => this.setState({anchorEl:null})}>
                <Popper id={this.props.noteId}  open={open} anchorEl={anchorEl}
                    className={classes.paper} style={{zIndex:1300,opacity:1}}  disableRestoreFocus >
                <div>
                <Avatar>S</Avatar>
                <Typography>
                    {localStorage.getItem('UserEmail')}
                </Typography>
                <Button variant="contained" onClick={this.login} style={{ backgroundColor: '#1a73e8', color: 'white', textTransform: 'capitalize' }} disableElevation>
                        Next
                    </Button>
                </div>
                </Popper>
                </ClickAwayListener>
                : null}
                
            </div>
        );
    }
}
export default (withStyles)(useStyles)(SignOut);
