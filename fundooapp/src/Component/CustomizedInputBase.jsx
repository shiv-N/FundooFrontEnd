import React from 'react';
import { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import DirectionsIcon from '@material-ui/icons/Directions';
import {useStyles} from '../css/CustomizedInputBaseCSS'
import { withStyles  } from '@material-ui/core/styles'
import AddAlertOutlinedIcon from '@material-ui/icons/AddAlertOutlined';
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';
import ColorLensOutlinedIcon from '@material-ui/icons/ColorLensOutlined';
import ImageOutlinedIcon from '@material-ui/icons/ImageOutlined';
import ArchiveOutlinedIcon from '@material-ui/icons/ArchiveOutlined';
import MoreVertOutlinedIcon from '@material-ui/icons/MoreVertOutlined';
import Button from '@material-ui/core/Button';
import UserService from '../Servises/UserService';

var userService = new UserService();

class CustomizedInputBase extends Component{
    constructor(props){
      super(props)
      this.state={
          title:'',
          noteDescription:'',
          image:'',
          color:'',
          isPin:false,
          addReminder:'',
          isArchive:false,
          isNote:true,
          isTrash:false
      }
    }

    AddNote=() =>{

      let noteData = {
        Title: this.state.title,
        Message: this.state.noteDescription,
        Image: this.state.image,
        Color: this.state.color,
        IsPin: this.state.isPin,
        AddReminder: this.state.addReminder,
        IsArchive: this.state.isArchive,
        IsNote: this.state.isNote,
        IsTrash: this.state.isTrash
      }
      userService.addUserNote(noteData).then(
          response => {
              console.log('this is Note response from backend:',response);
          }
      )
  }

  onChange=(e) =>{
    this.setState(
        {
            [e.target.name]: e.target.value
        }
    )
    // console.log(e.target.value);
    
}

  
  render(){

    const { classes } = this.props;
    // console.log(classes);
    

  return (
    <Paper className = {classes.root}>

      <Paper component="form" className = {classes.root2}
        //className='root'
      >
      
      <InputBase
        className='input'
        placeholder="Title"
        fullWidth={true}
        name="title"
        onChange={ this.onChange}
      />
     
      <IconButton className='iconButton'>
        <DirectionsIcon />
      </IconButton>
    </Paper> <Paper className = {classes.root2}>
      
      <InputBase
        className='classes.input'
        placeholder="Take a note..."
        fullWidth
        multiline
        name="noteDescription"
        onChange={ this.onChange}
      />
      
    </Paper> <Paper component="form" className = {classes.root2}>
      
      <IconButton className='iconButton' aria-label="reminder">
        <AddAlertOutlinedIcon/>
      </IconButton>
      
      <IconButton className='iconButton' aria-label="collaboration">
        <PersonAddOutlinedIcon/>
      </IconButton>

      <IconButton className='iconButton' aria-label="colourChange">
        <ColorLensOutlinedIcon/>
      </IconButton>

      <IconButton className='iconButton' aria-label="addImage">
        <ImageOutlinedIcon/>
      </IconButton>

      <IconButton className='iconButton' aria-label="archive">
        <ArchiveOutlinedIcon/>
      </IconButton>

      <IconButton className='iconButton' aria-label="moreMenu">
        <MoreVertOutlinedIcon/>
      </IconButton>
      <Button variant="contained" onClick={this.AddNote} style={{ backgroundColor:'white', color:'rgba(0,0,0,0.87)', textTransform: 'capitalize',marginLeft:'26%' }} disableElevation>
                        close
                    </Button>
    </Paper>
    </Paper>
   
  );}
}
export default withStyles(useStyles)(CustomizedInputBase);