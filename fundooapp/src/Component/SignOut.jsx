import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles'
import Popper from '@material-ui/core/Popper';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import { ClickAwayListener, Typography } from '@material-ui/core';
import Tooltip from '@material-ui/core/Tooltip'
import Button from '@material-ui/core/Button'; 
import { Avatar } from '@material-ui/core';
import Badge from '@material-ui/core/Badge';
import CameraAltOutlinedIcon from '@material-ui/icons/CameraAltOutlined';
import ChangeProfilePhoto from './ChangeProfilePhoto'


const useStyles = theme => ({
    paper: {
        width: '275px',
        height:'300px',
        maxWidth:'385px',
        minWidth:'125px',
        backgroundColor:'white',
        boxShadow:'0.1em 0.1em 0.4em 0.2em grey',
        display: 'flex',
        flexDirection: 'row', 
        justifyContent: "center",
        padding:'1.5%',
        flexWrap: 'wrap'
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
            changeProfile:false,
            profileUrl:null
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
    handleSignOut=()=>{
        localStorage.clear();
        this.props.DashboardProps.history.push('/')
    }
    closeProfileDialog=(value,value2)=>{
        this.setState({changeProfile:value})
        if(value2 !== null){
            this.setState({profileUrl:value2})
        }
        
        //this.props.DashboardProps();
    }
    componentDidMount(){
        this.setState({profileUrl:localStorage.getItem('profilePhoto')})
    }
    componentDidUpdate(){
        if(this.state.profileUrl !==localStorage.getItem('profilePhoto')){
            
            this.setState({profileUrl:localStorage.getItem('profilePhoto')})
        }
    }
    render() {
        const { classes } = this.props;
        const { anchorEl } = this.state;
        const open = Boolean(anchorEl);
        const theme = createMuiTheme({
            overrides: {
                MuiBadge:{anchorOriginBottomRightCircle: {
                    right: '14%',
                    bottom: '14%',
                    transform: 'scale(1) translate(40%, 40%)',
                    transformOrigin: '100% 100%'
                }}
            }
          })
        return (
            <div>
                <MuiThemeProvider theme={theme}>
                <Tooltip title="Fundoo Account">
                    <IconButton onClick={this.handlePopoverOpen} >
                    <Avatar src={this.state.profileUrl}>S</Avatar>
                    </IconButton>
                </Tooltip>
                {this.state.anchorEl !== null ?
                <ClickAwayListener onClickAway={() => this.setState({anchorEl:null})}>
                <Popper id={this.props.noteId}  open={open} anchorEl={anchorEl}
                    className={classes.paper} style={{zIndex:1300,opacity:1}}  disableRestoreFocus >
                <div>
                   
                 <Badge
                    overlap="circle"
                    anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                    }}
                    badgeContent={<CameraAltOutlinedIcon style={{background: 'aliceblue',
                    borderRadius: '7px'}}/>}
                    onClick={()=>this.setState({changeProfile:true})}
                >
                <Avatar src={this.state.profileUrl} style={{width:'100px',height:'100px',marginTop:'2em'}}>S</Avatar>
                </Badge>
               
                <Typography style={{marginTop:'1em'}}>
                    {localStorage.getItem('UserEmail')}
                </Typography>
                <Button variant="contained" onClick={this.handleSignOut} style={{ marginTop:'3em',marginLeft:'0.6em',display:'flex',justifyContent:'center',font: '500 16px/18px Google Sans,Roboto,RobotoDraft,Helvetica,Arial,sans-serif',backgroundColor: '#ffffff',border: '1px solid #dadce0',borderRadius:'4px', color: '#3c4043', textTransform: 'capitalize' }} disableElevation>
                        Sign out
                    </Button>
                </div>
                </Popper>
                </ClickAwayListener>
                : null}
                </MuiThemeProvider>
                {this.state.changeProfile?<ChangeProfilePhoto closeProfileDialog={this.closeProfileDialog}/> :null}
            </div>
        );
    }
}
export default (withStyles)(useStyles)(SignOut);
