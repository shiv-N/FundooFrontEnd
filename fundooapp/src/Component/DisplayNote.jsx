import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';
import ImageOutlinedIcon from '@material-ui/icons/ImageOutlined';
import ArchiveOutlinedIcon from '@material-ui/icons/ArchiveOutlined';
import { useStyles } from '../css/displayNote'
import { withStyles } from '@material-ui/core/styles'
import '../css/displayNote';
import ChangeColor from './ChangeColor'
import UserService from '../Service/UserService';
import AddReminder from '../Component/AddReminder';
import Chip from '@material-ui/core/Chip';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import Moment from 'react-moment';
import RestoreFromTrashOutlinedIcon from '@material-ui/icons/RestoreFromTrashOutlined';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import EditNote from './EditNote'
import MoreMenu from './MoreMenu'
import MaterialUIPickers from './MaterialUIPickers'

var userService = new UserService();

class DisplayNote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      click: false,
      reminder: null
    }
  }

  handleReminder = (value, noteId) => {
    var reminderData = {
      Reminder: value
    }

    console.log(this.props.noteId);
    userService.AddReminder(reminderData, noteId).then(
      response => {
        console.log(response);

        this.props.handleGetNotes();
      }
    )
  }
  handleClick(noteId) {
    userService.Archive(noteId).then(
      response => {
        this.props.handleGetNotes();
      }
    )
  };

  handleEditNote=()=>{
    this.setState({
      click:true
    }) 
  }
  handleEditNoteResponce=(value)=>{
    this.setState({
      click: value
    })
  }
  handleRestoreClick(noteId) {
    userService.TrashNote(noteId).then(
      response => {
        console.log(response);

        this.props.handleGetNotes();
      }
    )
  };
  
  handleDeleteClick(noteId) {   
    userService.DeleteNote(noteId).then(
      response => {
        this.props.handleGetNotes();
      }
    )
  };

  render() {
    
    const { classes } = this.props;
    return (
      <div>
        {
            !this.state.click?
      <Card id={this.props.noteData.id} className={classes.card} style={{ backgroundColor: this.props.noteData.color }} >

        <CardContent onClick={this.handleEditNote}>
          <Typography>
            {this.props.noteData.title}
          </Typography>
          <Typography style={{ wordBreak: 'break-all', marginTop: '2%' }}>
            {this.props.noteData.message}
          </Typography>
          </CardContent>
        {this.props.noteData.addReminder !== null ?
          <Chip style={{ marginLeft:'1em',width: "65%" }}
            variant="outlined"
            size="small"
            icon={<AccessTimeIcon />}
            label={<Moment format="DD-MM-YYYY HH:mm">{this.props.noteData.addReminder}</Moment>}
          // onClick={handleClick}
          // onDelete={handleDelete}
          /> : null}
          
          { !this.props.noteData.isTrash?
        <CardActions className={classes.icon} disableSpacing>
          <>
            <AddReminder noteId={this.props.noteData.id} handleReminder={this.handleReminder} />
          </>
          {/* <MaterialUIPickers/> */}

          <IconButton aria-label="collaboration" className={classes.iconButton}>
            <PersonAddOutlinedIcon fontSize="small" />
          </IconButton>

          <>
            <ChangeColor noteId={this.props.noteData.id} handleGetNotes={this.props.handleGetNotes} />
          </>

          <IconButton aria-label="Image" className={classes.iconButton}>
            <ImageOutlinedIcon fontSize="small" />
          </IconButton>

          <IconButton aria-label="archive" className={classes.iconButton} onClick={() => this.handleClick(this.props.noteData.id)}>
            <ArchiveOutlinedIcon fontSize="small" />
          </IconButton>
            <>
              <MoreMenu noteId={this.props.noteData.id} handleGetNotes={this.props.handleGetNotes}/>
            </>
          {/* <IconButton aria-label="moreMenu" className={classes.iconButton}>
            <MoreVertOutlinedIcon fontSize="small" />
          </IconButton> */}
        </CardActions>
        : //2nd trash condiotion
        <CardActions style={{ display: 'flex',flexDirection: 'row'}} disableSpacing>
        <IconButton aria-label="delete" className={classes.iconButton} onClick={() => this.handleDeleteClick(this.props.noteData.id)}>
          <DeleteForeverOutlinedIcon fontSize="small" />
        </IconButton>

        <IconButton aria-label="Restore" className={classes.iconButton} onClick={() => this.handleRestoreClick(this.props.noteData.id)}>
          <RestoreFromTrashOutlinedIcon fontSize="small" />
        </IconButton>
      </CardActions>}
      </Card>
          :<EditNote handleGetNotes={this.props.handleGetNotes} handleEditNoteResponce={this.handleEditNoteResponce} noteData={this.props.noteData}/>
          }
      </div>
    )

  }
}

export default (withStyles)(useStyles)(DisplayNote);
