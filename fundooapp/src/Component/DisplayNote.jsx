import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ImageOutlinedIcon from '@material-ui/icons/ImageOutlined';
import ArchiveOutlinedIcon from '@material-ui/icons/ArchiveOutlined';
import { useStyles } from '../css/displayNote'
import { withStyles } from '@material-ui/core/styles'
import '../css/displayNote';
import ChangeColor from './ChangeColor'
import UserService from '../Service/UserService';
import Chip from '@material-ui/core/Chip';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import Moment from 'react-moment';
import RestoreFromTrashOutlinedIcon from '@material-ui/icons/RestoreFromTrashOutlined';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import EditNote from './EditNote'
import MoreMenu from './MoreMenu'
import unpin from '../logo/unpin.svg'
import pin from '../logo/pin.svg'
import Tooltip from '@material-ui/core/Tooltip';
import MaterialUIPickers from './MaterialUIPickers';
import Addcollaborator from './AddCollaborators';
import { connect } from 'react-redux';

var userService = new UserService();

class DisplayNote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      click: false,
      reminder: null,
      isPin: false
    }
  }

  handlePin = (e) => {
    // this.setState({
    //   isPin: !this.state.isPin
    // })
    e.stopPropagation();
    userService.PinNote(this.props.noteData.id).then(
      response => {
        console.log(response);
        this.props.handleGetNotes();
      }
    )
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

  handleEditNote = () => {
    this.setState({
      click: true
    })
  }
  handleEditNoteResponce = (value) => {
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
          !this.state.click ?
            <Card id={this.props.noteData.id} className={!this.props.toggleView?classes.card:classes.ListView} style={{ backgroundColor: this.props.noteData.color }} >

              <CardContent onClick={this.handleEditNote}>
                
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Typography>
                    {this.props.noteData.title}
                  </Typography>
                  
                  <IconButton className='iconButton' onClick={this.handlePin} style={{ padding: '6px' }}>
                    {/* <DirectionsIcon /> */}
                    {!this.props.noteData.isPin ?
                      <Tooltip title="Unpin note"><img src={unpin} /></Tooltip> : <Tooltip title="pin note"><img src={pin} /></Tooltip>
                    }
                  </IconButton>
                
                </div>
                <Typography style={{ wordWrap:'break-word', marginTop: '2%' }}>
                  {this.props.noteData.message}
                </Typography>
                
                </CardContent>
                {this.props.noteData.addReminder !== null ?
                <Chip className={!this.props.toggleView?classes.GridReminder:classes.ListReminder}
                  variant="outlined"
                  size="small"
                  icon={<AccessTimeIcon />}
                  label={<Moment format="MMMM Do, h:mm a">{this.props.noteData.addReminder}</Moment>}
                // onClick={handleClick}
                // onDelete={handleDelete}
                /> : null}

                {!this.props.noteData.isTrash ?
                <CardActions className={!this.props.toggleView?classes.icon:classes.ListIcon} disableSpacing>

                  {/* reminder */}
                  <>
                    <MaterialUIPickers noteId={this.props.noteData.id} handleReminder={this.handleReminder} />
                  </>

                  <>
                    <Addcollaborator noteId={this.props.noteData.id} handleReminder={this.handleReminder}/>
                  </>
                  {/* Change Color */}
                  <>
                    <ChangeColor noteId={this.props.noteData.id} handleGetNotes={this.props.handleGetNotes} />
                  </>

                  {/* Add image */}
                  <Tooltip title="Add image">
                    <IconButton aria-label="Image" className={classes.iconButton}>
                      <ImageOutlinedIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>

                  {/* Archive */}
                  <Tooltip title="Archive">
                    <IconButton aria-label="archive" className={classes.iconButton} onClick={() => this.handleClick(this.props.noteData.id)}>
                      <ArchiveOutlinedIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>

                  {/* More Menu */}
                  <>
                    <MoreMenu noteId={this.props.noteData.id} handleGetNotes={this.props.handleGetNotes} />
                  </>

                </CardActions>

                : //2nd trash condiotion
                <CardActions style={{ display: 'flex', flexDirection: 'row' }} disableSpacing>

                  {/* delete note */}
                  <Tooltip title="Delete">
                    <IconButton aria-label="delete" className={classes.iconButton} onClick={() => this.handleDeleteClick(this.props.noteData.id)}>
                      <DeleteForeverOutlinedIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>

                  {/* restore note  */}
                  <Tooltip title="Restore">
                    <IconButton aria-label="Restore" className={classes.iconButton} onClick={() => this.handleRestoreClick(this.props.noteData.id)}>
                      <RestoreFromTrashOutlinedIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </CardActions>}
            </Card>
            // edit note component
            : <EditNote handleGetNotes={this.props.handleGetNotes} handleEditNoteResponce={this.handleEditNoteResponce} noteData={this.props.noteData} />
        }
      </div>
    )

  }
}

const mapToStateProps = state =>{
  return{
      toggleView : state.toggleView
  }
}
export default connect(mapToStateProps)((withStyles)(useStyles)(DisplayNote));
