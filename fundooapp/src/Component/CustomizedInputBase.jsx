import React from 'react';
import { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import DirectionsIcon from '@material-ui/icons/Directions';
import { useStyles } from '../css/CustomizedInputBaseCSS'
import { withStyles } from '@material-ui/core/styles'
import AddReminder from '../Component/AddReminder';
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';
import ColorLensOutlinedIcon from '@material-ui/icons/ColorLensOutlined';
import ImageOutlinedIcon from '@material-ui/icons/ImageOutlined';
import ArchiveOutlinedIcon from '@material-ui/icons/ArchiveOutlined';
import MoreVertOutlinedIcon from '@material-ui/icons/MoreVertOutlined';
import Button from '@material-ui/core/Button';
import UserService from '../Service/UserService';
import Chip from '@material-ui/core/Chip';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import Moment from 'react-moment';

var userService = new UserService();

const defaultState={
  title: '',
      noteDescription: '',
      image: '',
      color: '',
      isPin: false,
      addReminder: null,
      isArchive: false,
      isNote: true,
      isTrash: false
}
class CustomizedInputBase extends Component {
  constructor(props) {
    super(props)
    this.state = defaultState;
    this.AddNote = this.AddNote.bind(this);
  }

  async AddNote(){
    
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
    if(noteData.Title !== '' || noteData.Message !== '')
    {
      await userService.addUserNote(noteData).then(

        response => {
          console.log('this is Note response from backend:', response);
  
          this.setState(
            {
              title: '',
            noteDescription: '',
            image: '',
            color: '',
            isPin: false,
            addReminder: null,
            isArchive: false,
            isNote: true,
            isTrash: false
            }
          )
          this.props.handleGetNotes();
        }
      )
    }
    else{
      this.props.handleGetNotes();
    }   
  }

  onChange = (e) => {
    this.setState(
      {
        [e.target.name]: e.target.value
      }
    )

  }
  handleReminder = (dataFromChild) => {
    this.setState({
      addReminder: dataFromChild
    })
  }

  render() {

    const { classes } = this.props;

    return (
      <Paper className={classes.root}>

        <Paper component="form" className={classes.root2}
        >

          <InputBase
            className='input'
            placeholder="Title"
            fullWidth={true}
            name="title"
            onChange={this.onChange}
          />

          <IconButton className='iconButton'>
            <DirectionsIcon />
          </IconButton>
        </Paper>
         <Paper className={classes.root2} style={{display: 'flex',flexDirection: 'column',}}>
          <InputBase
            className='classes.input'
            placeholder="Take a note..."
            fullWidth
            multiline
            name="noteDescription"
            onChange={this.onChange}
          /><br></br>
          {this.state.addReminder !== null ?
          <Chip style={{ width: "45%" }}
            variant="outlined"
            size="small"
            icon={<AccessTimeIcon />}
            label={<Moment format="DD-MM-YYYY HH:mm">{this.state.addReminder}</Moment>}
          // onClick={handleClick}
          // onDelete={handleDelete}
          /> : null}
        </Paper> 
        <Paper component="form" className={classes.root2}>
          <div>
            <AddReminder handleReminder={this.handleReminder} />
          </div>

          <IconButton className='iconButton' aria-label="collaboration">
            <PersonAddOutlinedIcon />
          </IconButton>

          <IconButton className='iconButton' aria-label="colour">
            <ColorLensOutlinedIcon />
          </IconButton>

          <IconButton className='iconButton' aria-label="Image">
            <ImageOutlinedIcon />
          </IconButton>

          <IconButton className='iconButton' aria-label="archive">
            <ArchiveOutlinedIcon />
          </IconButton>

          <IconButton className='iconButton' aria-label="moreMenu">
            <MoreVertOutlinedIcon />
          </IconButton>
          <Button variant="contained" onClick={this.AddNote} style={{ backgroundColor: 'white', color: 'rgba(0,0,0,0.87)', textTransform: 'capitalize', marginLeft: '26%'}} disableElevation>
            close
                    </Button>
        </Paper>
      </Paper>

    );
  }
}
export default withStyles(useStyles)(CustomizedInputBase);