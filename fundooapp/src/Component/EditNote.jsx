import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Chip from '@material-ui/core/Chip';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import Moment from 'react-moment';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { useStyles } from '../css/displayNote'
import { withStyles } from '@material-ui/core/styles'
import '../css/displayNote';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';
import ChangeColor from './ChangeColor';
import AddReminder from '../Component/AddReminder';
import ImageOutlinedIcon from '@material-ui/icons/ImageOutlined';
import ArchiveOutlinedIcon from '@material-ui/icons/ArchiveOutlined';
import MoreMenu from './MoreMenu'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import InputBase from '@material-ui/core/InputBase';
import UserService from '../Service/UserService';
import RestoreFromTrashOutlinedIcon from '@material-ui/icons/RestoreFromTrashOutlined';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';

var userService = new UserService();

class EditNote extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true,
    }
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

    this.props.handleEditNoteResponce(this.state.open);
  };

  render() {
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

        <CardContent onClick={this.handleEditNote}>
          <Typography>
            {this.props.noteData.title}
          </Typography>
          
          <InputBase
        // className={classes.margin}
        style={{ wordBreak: 'break-all', marginTop: '2%',width:'100%',maxWidth:'100%'}}
        defaultValue={this.props.noteData.message}
        inputProps={{ 'aria-label': 'naked' }}
        multiline
        />

          {/* <Typography style={{ wordBreak: 'break-all', marginTop: '2%' }}>
            {this.props.noteData.message}
          </Typography> */}
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
          <CardActions className={classes.root2} disableSpacing>
            <>
              <AddReminder noteId={this.props.noteData.id} handleReminder={this.handleReminder} />
            </>


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
              <MoreMenu noteId={this.props.noteData.id} handleGetNotes={this.props.handleGetNotes} />
            </>
            <Button variant="contained" onClick={this.handleClose} style={{ backgroundColor: 'white', color: 'rgba(0,0,0,0.87)', textTransform: 'capitalize', marginLeft: '26%' }} disableElevation>
              close
            </Button>
          </CardActions>
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