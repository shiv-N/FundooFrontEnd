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
import ChangeColor from './ChangeColor';
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
import UploadImage from './UploadImage'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { Avatar } from '@material-ui/core';
import Tooltip from '@material-ui/core/Tooltip';

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
    console.log(">", new Date());

    var reminderData = {
      Reminder: value
    }

    userService.AddReminder(reminderData, noteId).then(
      response => {
        console.log(response);
        this.props.handleGetNotes();
      }
    ).catch(
      error => {
        console.log(error);

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
    let noteData = {
      Title: this.state.title,
      Message: this.state.noteDescription,
      Reminder: this.state.addReminder,
    }
    if (noteData.Title !== null || noteData.Message !== null) {
      await userService.EditNote(noteData, this.props.noteData.id).then(

        response => {

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
    else {
      this.props.handleGetNotes();
    }
    this.props.handleEditNoteResponce(this.state.open);
  };
  handleDeleteReminder = (noteId) => {
    var reminderData = {
      Reminder: null
    }
    userService.DeleteReminder(reminderData, noteId).then(
      response => {

        this.props.handleGetNotes();
      }
    )
  }
  onChange = (e) => {
    this.setState(
      {
        [e.target.name]: e.target.value
      }
    )

  }
  render() {
    const userList = this.props.noteData.collaborators !== null && this.props.noteData.collaborators.map((value, index) => {
      console.log('>',value);
      return (
        <ListItem style={{paddingLeft:'4px',paddingRight:'4px'}}
        key={value.collabratorId}>
          <Tooltip title={value.collaboratorEmail}>
            <Avatar src={value.profilePhoto}style={{ width: "20px", height: "20px" }}></Avatar>
          </Tooltip>
          {/* <ListItemText primary={value.collabratorId}/> */}
        </ListItem>
      );

    })
    const theme = createMuiTheme({
      overrides: {
        MuiDialog: {
          paperWidthSm: {
            backgroundColor: this.props.noteData.color,
            borderRadius: "7px"
          }
        }
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
          <div onClick={this.handleEditNote}>
            {this.props.noteData.image === "" || this.props.noteData.image === null ? null :
              <div >
                <img className={classes.image} style={{ width: '500px', maxWidth: '500px' }} src={this.props.noteData.image} alt='noteImage' />
              </div>
            }
          </div>
          <CardContent>
            <InputBase
              style={{ wordBreak: 'break-all', width: '100%', maxWidth: '100%' }}
              defaultValue={this.props.noteData.title}
              multiline
              name='title'
              onChange={this.onChange}
            />

            <InputBase
              style={{ wordBreak: 'break-all', marginTop: '0.2em', width: '100%', maxWidth: '100%' }}
              defaultValue={this.props.noteData.message}
              multiline
              name='noteDescription'
              onChange={this.onChange}
            />

          </CardContent>
          <div style={{ display: 'flex', flexDirection: 'row',alignItems:'center',flexWrap: "wrap" }}>
          {this.props.noteData.addReminder !== null ?
            <Chip style={{ backgroundColor: "#443e374d",marginLeft: '1em', width: "37%" }}
              variant="outlined"
              size="small"
              icon={<AccessTimeIcon />}
              label={<Moment format="MMMM Do, h:mm a">{this.props.noteData.addReminder}</Moment>}
            // onClick={handleClick}
              onDelete={() => this.handleDeleteReminder(this.props.noteData.id)}
            /> : null}

          {this.props.noteData.labels !== null ?
                  this.props.noteData.labels.map((data, index) => 
                  (
                    <Chip key={'label:' + data.labelName}
                      style={{ backgroundColor: "#443e374d", marginLeft: '0.8em' }}
                      variant="outlined"
                      size="small"
                      label={data.labelName}
                      // onClick={handleClick}
                      onDelete={() => this.handleDeleteLabel(data)}
                    />
                  )) : null}
          
          {this.props.noteData.collaborators === null ?
                  null : 
                   <List style={{ display: 'flex', marginLeft: '0.4em',overflow:'auto' }}>
                    {userList}
                   </List>
          } 
          </div>
          {!this.props.noteData.isTrash ?
            <DialogActions className={classes.root2} disableSpacing>
              <>
                <MaterialUIPickers noteId={this.props.noteData.id} handleReminder={this.handleReminder} />
              </>
              <>
                <Addcollaborator noteId={this.props.noteData.id} handleGetNotes={this.props.handleGetNotes} />
              </>
              <>
                <ChangeColor noteId={this.props.noteData.id} handleGetNotes={this.props.handleGetNotes} />
              </>

              {/* Add image */}
              <>
                <UploadImage noteId={this.props.noteData.id} handleGetNotes={this.props.handleGetNotes} />
              </>

              <IconButton aria-label="archive" className={classes.iconButton} onClick={() => this.handleClick(this.props.noteData.id)}>
                <ArchiveOutlinedIcon fontSize="small" />
              </IconButton>
              <>
                <MoreMenu noteId={this.props.noteData.id} handleGetNotes={this.props.handleGetNotes} />
              </>
              <Button onClick={this.handleClose} style={{
                backgroundColor: this.props.noteData.color, color: 'rgba(0,0,0,0.87)', textTransform: 'capitalize', marginInlineStart: "12%",
                marginInlineEnd: "7%",
                marginBottom: "1%"
              }} disableElevation>
                close
            </Button>
            </DialogActions>
            : <CardActions style={{ display: 'flex', flexDirection: 'row' }} disableSpacing>
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