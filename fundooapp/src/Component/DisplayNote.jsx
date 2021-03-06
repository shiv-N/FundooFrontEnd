import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
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
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { Avatar } from '@material-ui/core';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import UploadImage from './UploadImage'

var userService = new UserService();

class DisplayNote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      click: false,
      reminder: null,
      isPin: false,
      noteId: ''
    }

  }

  handlePin = (e) => {
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

  handleDeleteLabel = (data) => {
    userService.DeleteNoteLabel(data.id).then(
      response => {

        this.props.handleGetNotes();
      }
    )
  }
  onDragStart=(e,id)=>{
    console.log('id',id);
    e.dataTransfer.setData('id',id);
  }
  render() {


    const userList = this.props.noteData.collaborators !== null && this.props.noteData.collaborators.map((value, index) => {
      return (
        <ListItem key={value.collabratorId}>
          <Tooltip title={value.collaboratorEmail}>
            <Avatar src={value.profilePhoto}style={{ width: "20px", height: "20px" }}></Avatar>
          </Tooltip>
          {/* <ListItemText primary={value.collabratorId}/> */}
        </ListItem>
      );

    })

    const theme = createMuiTheme({
      overrides: {
        MuiCardContent: {
          root: {
            padding: '12px'
          }
        },
        MuiListItem: {
          gutters: {
            paddingLeft: '2px',
            paddingRight: '2px'
          }
        },
        MuiList: {
          padding: {
            paddingTop: '0px',
            paddingBottom: '0px'
          }
        },
        MuiCardActions: {
          root: {
            padding: '0px',
            alignItems: 'center'
          }
        }
      }
    })
    
    const { classes } = this.props;
    return (


      <MuiThemeProvider theme={theme}>
        {
          !this.state.click ?
            <Card key={"note"+this.props.noteData.id} 
           // onDragStart={(e)=>this.onDragStart(e,"note"+this.props.noteData.id)}
            
            className={!this.props.toggleView ? classes.card : classes.ListView} 
            style={{ backgroundColor: this.props.noteData.color }} 
            >
              <div onClick={this.handleEditNote}>
                {this.props.noteData.image === "" || this.props.noteData.image === null ? null :

                  <img className={!this.props.toggleView ? classes.image : classes.imageListView} src={this.props.noteData.image} alt='noteImage' />

                }
              </div>
              <CardContent onClick={this.handleEditNote} >

                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', justifyItems: 'center' }}>

                  <Typography style={{ wordBreak: 'break-word' }}>
                    {this.props.noteData.title}
                  </Typography>
                  <div>
                    <IconButton className='iconButton' onClick={this.handlePin} style={{ padding: '6px' }}>
                      {/* <DirectionsIcon /> */}
                      {!this.props.noteData.isPin ?
                        <Tooltip title="Unpin note"><img src={unpin} alt="unpin" /></Tooltip> : <Tooltip title="pin note"><img src={pin} alt="pin" /></Tooltip>
                      }
                    </IconButton>
                  </div>
                </div>
                <Typography style={{ wordWrap: 'break-word', marginTop: '2%' }}>
                  {this.props.noteData.message}
                </Typography>

              </CardContent>
              <div style={{ display: 'flex', flexDirection: 'row',alignItems:'center',flexWrap: "wrap" }}>
                {this.props.noteData.addReminder !== null ?
                  <Chip className={!this.props.toggleView ? classes.GridReminder : classes.ListReminder}
                    style={{ backgroundColor: "#443e374d", marginBottom: '1%' }}
                    variant="outlined"
                    size="small"
                    icon={<AccessTimeIcon />}
                    label={<Moment format="MMMM Do, h:mm a">{this.props.noteData.addReminder}</Moment>}
                    // onClick={handleClick}
                    onDelete={() => this.handleDeleteReminder(this.props.noteData.id)}
                  />

                  : null}
                {this.props.noteData.labels !== null ?
                  this.props.noteData.labels.map((data, index) => 
                  (
                    <Chip key={'label:' + data.labelName}
                      style={{ backgroundColor: "#443e374d", marginLeft: '0.8em', marginBottom: '1%' }}
                      variant="outlined"
                      size="small"
                      label={data.labelName}
                      // onClick={handleClick}
                      onDelete={() => this.handleDeleteLabel(data)}
                    />
                  )) : null}
                {this.props.noteData.collaborators === null ?
                  null : 
                  <List style={{ display: 'flex', marginLeft: '0.3em' }}>
                    {userList}
                  </List>
                }
              </div>
              {!this.props.noteData.isTrash ?
                <CardActions className={!this.props.toggleView ? classes.icon : classes.ListIcon} disableSpacing>

                  {/* reminder */}
                  
                    <MaterialUIPickers noteId={this.props.noteData.id} handleReminder={this.handleReminder} />
                  {/*collaborator */}

                    <Addcollaborator noteId={this.props.noteData.id} handleGetNotes={this.props.handleGetNotes} />
                  
                  {/* Change Color */}
                    <ChangeColor noteId={this.props.noteData.id} handleGetNotes={this.props.handleGetNotes} />
    
                  {/* Add image */}
                    <UploadImage noteId={this.props.noteData.id} handleGetNotes={this.props.handleGetNotes} />

                  {/* Archive */}
                  <Tooltip title="Archive">
                    <IconButton aria-label="archive" className={classes.iconButton} onClick={() => this.handleClick(this.props.noteData.id)}>
                      <ArchiveOutlinedIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>

                  {/* More Menu */}
                  
                    <MoreMenu noteId={this.props.noteData.id} handleGetNotes={this.props.handleGetNotes} />
                  

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
      </MuiThemeProvider>

    )

  }
}

const mapToStateProps = state => {
  return {
    toggleView: state.toggleView
  }
}
export default connect(mapToStateProps)((withStyles)(useStyles)(DisplayNote));
