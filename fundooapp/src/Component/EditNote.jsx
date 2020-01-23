import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Chip from '@material-ui/core/Chip';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import Moment from 'react-moment';
import CardContent from '@material-ui/core/CardContent';
import { useStyles } from '../css/displayNote'
import { withStyles } from '@material-ui/core/styles'
import '../css/displayNote';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';
import ChangeColor from './ChangeColor';
import ImageOutlinedIcon from '@material-ui/icons/ImageOutlined';
import ArchiveOutlinedIcon from '@material-ui/icons/ArchiveOutlined';
import MoreMenu from './MoreMenu'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import InputBase from '@material-ui/core/InputBase';
import UserService from '../Service/UserService';
import RestoreFromTrashOutlinedIcon from '@material-ui/icons/RestoreFromTrashOutlined';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import DialogActions from '@material-ui/core/DialogActions';
import MaterialUIPickers from './MaterialUIPickers'
import Addcollaborator from './AddCollaborators';

var userService = new UserService();

class EditNote extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: null,
      noteDescription: null,
      Reminder: null,
      open: true,
    }
  }
  
  handleReminder = (value, noteId) => {
    //e.stopPropagation();
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
        this.handleClose();
      }
    )
  };
  handleRestoreClick(noteId) {
    userService.TrashNote(noteId).then(
      response => {
        console.log(response);

        this.props.handleGetNotes();
        this.handleClose();
      }
    )
  };
  
  handleDeleteClick(noteId) {   
    userService.DeleteNote(noteId).then(
      response => {
        this.props.handleGetNotes();
        this.handleClose(); 
      }
    )
  };

  handleClose = async () => {
    await this.setState({ open: false });
    console.log(this.state.open);

    ///////////
    let noteData = {
      Title: this.state.title,
      Message: this.state.noteDescription,
      Reminder: this.state.addReminder,
    }
    if(noteData.Title !== null || noteData.Message !== null)
    {
      await userService.EditNote(noteData,this.props.noteData.id).then(

        response => {
          console.log('this is Note response from backend:', response);
  
          this.setState(
            {
              title: null,
            noteDescription: null,
            addReminder: null,
            }
          )
          this.props.handleGetNotes();
        }
      )
    }
    else{
      this.props.handleGetNotes();
    }
    ///////
    this.props.handleEditNoteResponce(this.state.open);
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
    console.log('title==>',this.state.title);
    
    const theme = createMuiTheme({
      overrides: {
        MuiDialog:{paperWidthSm : {
          backgroundColor: this.props.noteData.color,
          borderRadius: "7px"
        }}
      }
    })
    const { classes } = this.props;
    return (
      <MuiThemeProvider theme={theme}>
      <Dialog
        open={this.state.open}
        onClose={this.handleClose}
      >
        {/* <Card id={this.props.noteData.id} className={classes.Edit} style={{ backgroundColor: this.props.noteData.color }} > */}

        <CardContent>
        <InputBase
        style={{ wordBreak: 'break-all',width:'100%',maxWidth:'100%'}}
        defaultValue={this.props.noteData.title}
        multiline
        name='title'
        onChange={ this.onChange}
        />
          
        <InputBase
        style={{ wordBreak: 'break-all', marginTop: '0.2em',width:'100%',maxWidth:'100%'}}
        defaultValue={this.props.noteData.message}
        multiline
        name='noteDescription'
        onChange={ this.onChange}
        />

        </CardContent>
        {this.props.noteData.addReminder !== null ?
          <Chip style={{ marginLeft:'1em',width: "30%" }}
            variant="outlined"
            size="small"
            icon={<AccessTimeIcon />}
            label={<Moment format="DD-MM-YYYY HH:mm">{this.props.noteData.addReminder}</Moment>}
          // onClick={handleClick}
          // onDelete={handleDelete}
          /> : null}

        {!this.props.noteData.isTrash ?
          <DialogActions className={classes.root2} disableSpacing>
            <>
              <MaterialUIPickers noteId={this.props.noteData.id} handleReminder={this.handleReminder} />
            </>


            {/* <IconButton aria-label="collaboration" className={classes.iconButton}>
              <PersonAddOutlinedIcon fontSize="small" />
            </IconButton> */}
             <>
                    <Addcollaborator noteId={this.props.noteData.id} handleGetNotes={this.props.handleGetNotes}/>
            </>
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
              <MoreMenu noteId={this.props.noteData.id} handleGetNotes={this.props.handleGetNotes} />
            </>
            <Button onClick={this.handleClose} style={{ backgroundColor: this.props.noteData.color, color: 'rgba(0,0,0,0.87)', textTransform: 'capitalize', marginInlineStart: "12%",
    marginInlineEnd: "7%",
    marginBottom: "1%" }} disableElevation>
              close
            </Button>
          </DialogActions>
          : <CardActions style={{ display: 'flex',flexDirection: 'row'}} disableSpacing>
          <IconButton aria-label="delete" className={classes.iconButton} onClick={() => this.handleDeleteClick(this.props.noteData.id)}>
            <DeleteForeverOutlinedIcon fontSize="small" />
          </IconButton>
  
          <IconButton aria-label="Restore" className={classes.iconButton} onClick={() => this.handleRestoreClick(this.props.noteData.id)}>
            <RestoreFromTrashOutlinedIcon fontSize="small" />
          </IconButton>
        </CardActions>}
      </Dialog>
      </MuiThemeProvider>
    );
  }
}

export default (withStyles)(useStyles)(EditNote);