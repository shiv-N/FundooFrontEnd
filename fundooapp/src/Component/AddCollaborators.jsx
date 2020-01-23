import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Chip from '@material-ui/core/Chip';
import { Avatar } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
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
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

var userService = new UserService();

class AddCollaborators extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      CollaboratorData:[],
      Email:null,
      collaboratedEmail:null,
      CollaboratorId:null,
      anchorEl:null
    }
  }
  handleOpen = () => {
    this.setState({ open: true });
  }
  handleClose = async (event) => {
    await this.setState(
      { 
        open: false,
        CollaboratorData:[],
        collaboratedEmail:null,
        CollaboratorId:null
      }
    );
  };
  handleCollaborationOperation= async()=>{
    if(this.state.CollaboratorId !== null){

      let collaborattionData={
        CollaboratorId : this.state.CollaboratorId
      }
      await userService.CollaborateUserNote(this.props.noteId,collaborattionData).then(
        response=>{
          console.log('collaborateNote res==>',response);
          this.props.handleGetNotes();
        }
      )
    }
    this.setState(
      {
        open: false,
        CollaboratorData:[],
        collaboratedEmail:null,
        CollaboratorId:null,
      });
  }

  collaborateNote=(id,email)=>{
    this.setState({
      collaboratedEmail:email,
      CollaboratorId:id,
      anchorEl:null
    })
  }
  GetSearchCollaborators= async(data)=>{
    console.log('>',data);
    var SearchData={
      Keyword : data
    }
   await userService.GetSearchCollaborators(SearchData).then(
      response=>{      
          this.setState({          
            CollaboratorData:response.data.data
          })
      }
    ).catch(error=>{
      this.setState({          
        CollaboratorData:[]
      })
    })
    console.log(this.state.CollaboratorData);
    
  }
  onChange =  async (e) => {
    e.persist()
    
    this.setState(
      {
        [e.target.name]: e.target.value,
        
      }
    )
    await this.setState({anchorEl:e.currentTarget})
    this.GetSearchCollaborators(this.state.Email);
  }
  
  render() {
    const userList = this.state.CollaboratorData.map((value,index)=>{
      return(
        <ListItem button key={value.email} onClick={()=>this.collaborateNote(value.id,value.email)}>
          <ListItemText primary={value.email}/>
        </ListItem>
      );
    
    })
    const theme = createMuiTheme({
      overrides: {
        MuiDialog: {
          paperWidthSm: {
            backgroundColor: 'white',
            borderRadius: "7px"
          }
        },
        MuiCardContent: {
          root: {
            'last-child': {
              paddingBottom: "0px"
            }
          }
        },
        MuiCardContent: {
          root: {
            padding: "0px"
          }}
      }
    })
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
    
    return (
      <div>
        <MuiThemeProvider theme={theme}>
            <Tooltip title="Collaborator">
              <IconButton aria-label="collaboration" onClick={this.handleOpen}>
                <PersonAddOutlinedIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          <Dialog
            open={this.state.open}
            onClose={this.handleClose}>
              <Typography variant='h5' style={{ width: '575px', padding: '0.2em', marginLeft: '0.5em', marginRight: "0.2em" }}>
                Collaborators
              </Typography>

              <Divider variant="middle" />
              <div style={{ width: "39%", display: "flex", flexDirection: "row", justifyContent: 'space-between', marginTop: '0.5em', padding: '0.1em', marginLeft: '1em' }}>
                  <Avatar></Avatar>

                  <Typography style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    {localStorage.getItem('UserEmail')} (Owner)
                  </Typography>
              </div>
            
              <div style={{ display: "flex", flexDirection: "row", justifyContent: 'space-between', marginTop: '0.5em', padding: '0.1em', marginLeft: '1em' }}>
                  <Avatar>
                    <PersonAddOutlinedIcon fontSize="small" />
                  </Avatar>
                  <InputBase type="text" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '82%', marginRight: '3em' }}
                    className='input'
                    placeholder="Person or Email to share with"
                    name="Email"
                    value={this.state.collaboratedEmail}
                    //onClick={this.handleGetCollaborators}
                    onChange={this.onChange}
                  />
                  {this.state.CollaboratorData.length !==0 ?
                  <Popper open={open} anchorEl={anchorEl} style={{backgroundColor:'aqua',width:'200px',zIndex:"1350"}}>
                    
                    <List>
                      
                    {userList}
                    
                    </List>
                  </Popper>
                  :null}
            </div>
            <Paper component="form" style={{ display: "flex", flexDirection: "row-reverse", backgroundColor: 'rgba(0,0,0,0.07)', padding: "0.5em" }}>
                <Button  onClick={this.handleCollaborationOperation} style={{ color: 'rgba(0,0,0,0.87)', textTransform: 'capitalize' }} disableElevation>
                  Save
                </Button>
                <Button onClick={this.handleClose} style={{ color: 'rgba(0,0,0,0.87)', textTransform: 'capitalize' }} disableElevation>
                  Cancel
                </Button>
            </Paper>
          </Dialog>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default (withStyles)(useStyles)(AddCollaborators); 