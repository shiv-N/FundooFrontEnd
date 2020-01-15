import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';
import ImageOutlinedIcon from '@material-ui/icons/ImageOutlined';
import ArchiveOutlinedIcon from '@material-ui/icons/ArchiveOutlined';
import MoreVertOutlinedIcon from '@material-ui/icons/MoreVertOutlined';
import { useStyles } from '../css/displayNote'
import { withStyles } from '@material-ui/core/styles'
import '../css/displayNote';
import ChangeColor from './ChangeColor'
import UserService from '../Service/UserService';
import AddReminder from '../Component/AddReminder';

var userService = new UserService();

class DisplayNote extends Component {
  constructor(props) {
    super(props);
    this.state={
      click:false,
    }
  }

  handleClick(noteId) {
    console.log('--->',noteId);
    
    userService.Archive(noteId).then(
      response =>{
        console.log(response);
        
          this.props.handleGetNotes();
      }
  )
    //this.setState({click:!this.state.click });
  };
  
  render() {
    const { classes } = this.props;  
    return (

      <Card id={this.props.noteData.id}className={classes.card} style={{backgroundColor:this.props.noteData.color}} >

        <CardContent  >
        <Typography>
          {this.props.noteData.title}
        </Typography>
          <Typography style={{wordBreak:'break-all',marginTop:'2%'}}>
            {this.props.noteData.message}
          </Typography>
        </CardContent>
        <CardActions className={classes.icon} disableSpacing>
          <>
          <AddReminder noteId={this.props.noteData.id} handleGetNotes={this.props.handleGetNotes}/>
          </>
         

          <IconButton aria-label="collaboration" className={classes.iconButton}>
            <PersonAddOutlinedIcon fontSize="small" />
          </IconButton>
          
          <> 
            <ChangeColor  noteId={this.props.noteData.id} handleGetNotes={this.props.handleGetNotes}/>
          </>

          <IconButton aria-label="Image" className={classes.iconButton}>
            <ImageOutlinedIcon fontSize="small"/>
          </IconButton>

          <IconButton aria-label="archive" className={classes.iconButton} onClick={() => this.handleClick(this.props.noteData.id)}>
            <ArchiveOutlinedIcon fontSize="small" />
          </IconButton>

          <IconButton aria-label="moreMenu" className={classes.iconButton}>
            <MoreVertOutlinedIcon  fontSize="small"/>
          </IconButton>
        </CardActions>
      </Card>
    )

  }
}

export default (withStyles)(useStyles)(DisplayNote);
