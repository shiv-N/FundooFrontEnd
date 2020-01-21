import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Chip from '@material-ui/core/Chip';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import Paper from '@material-ui/core/Paper';
import CardContent from '@material-ui/core/CardContent';
import { useStyles } from '../css/displayNote'
import { withStyles } from '@material-ui/core/styles'
import '../css/displayNote';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import InputBase from '@material-ui/core/InputBase';
import UserService from '../Service/UserService';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';
import Divider from '@material-ui/core/Divider';

var userService = new UserService();

class AddCollaborators extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    }
  }
  handleOpen=()=>{
    this.setState({ open: true });
  }
  handleClose = async () => {
    await this.setState({ open: false });
  };
  onChange=(e) =>{
    this.setState(
        {
            [e.target.name]: e.target.value
        }
    )
    // console.log(e.target.value);
    
}
  render() {
    
    const theme = createMuiTheme({
      overrides: {
        MuiDialog:{paperWidthSm : {
          backgroundColor: 'white',
          borderRadius: "7px"
        }},
        MuiCardContent:{root:{'last-child': {
          paddingBottom: "0px"
      }}},
      MuiCardContent:{root: {
        padding: "0px"
    }
      }}
    })
    const { classes } = this.props;
    return (
        <div>
        <MuiThemeProvider theme={theme}>
        <Tooltip title="Collaborator">
                <IconButton aria-label="collaboration"  onClick={this.handleOpen}>
                <PersonAddOutlinedIcon fontSize="small" />
                </IconButton>
        </Tooltip>
      <Dialog
        open={this.state.open}
        onClose={this.handleClose}
      >
      
        <Typography variant='h5' style={{width:'400px',padding:'0.2em'}}>
            Collaborators
        </Typography>
          
        <Divider variant="middle" />

        <Typography style={{marginTop:'0.5em',padding:'0.1em'}}>
            {localStorage.getItem('UserEmail')} (Owner)
        </Typography>
        <Paper component="form" className={classes.root2} style={{ backgroundColor: 'rgba(0,0,0,0.07)' }}>
        <Button variant="contained" onClick={this.AddNote} style={{color: 'rgba(0,0,0,0.87)', textTransform: 'capitalize'}} disableElevation>
            Close
        </Button>
        <Button variant="contained" onClick={this.AddNote} style={{color: 'rgba(0,0,0,0.87)', textTransform: 'capitalize'}} disableElevation>
            Save
        </Button>
        </Paper>
        

        
      </Dialog>
      </MuiThemeProvider>
      </div>
    );
  }
}

export default (withStyles)(useStyles)(AddCollaborators); 