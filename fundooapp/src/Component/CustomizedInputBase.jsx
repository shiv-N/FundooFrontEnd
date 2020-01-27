import React from 'react';
import { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import { useStyles } from '../css/CustomizedInputBaseCSS'
import { withStyles } from '@material-ui/core/styles'
import ImageOutlinedIcon from '@material-ui/icons/ImageOutlined';
import ArchiveOutlinedIcon from '@material-ui/icons/ArchiveOutlined';
import MoreVertOutlinedIcon from '@material-ui/icons/MoreVertOutlined';
import Button from '@material-ui/core/Button';
import UserService from '../Service/UserService';
import Chip from '@material-ui/core/Chip';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import Moment from 'react-moment';
import unpin from '../logo/unpin.svg'
import pin from '../logo/pin.svg'
import ChangeColor from './ChangeColor';
import MaterialUIPickers from './MaterialUIPickers';
import Addcollaborator from './AddCollaborators';

var userService = new UserService();

const defaultState={
  title: '',
      noteDescription: '',
      image: '',
      color: null,
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
            color: null,
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

  handlePin=()=>{
    this.setState({
      isPin: !this.state.isPin
    })
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
  handleColor=(dataFromChild)=>{
    this.setState({
      color: dataFromChild
    })
  }
  render() {

    const { classes } = this.props;

    return (
      <Paper className={classes.root} style={{ backgroundColor: this.state.color }}>

        <Paper component="form" className={classes.root2} style={{ backgroundColor: this.state.color }}
        >

          <InputBase
            className='input'
            placeholder="Title"
            fullWidth={true}
            multiline
            name="title"
            onChange={this.onChange}
          />

          <IconButton className='iconButton' onClick={this.handlePin}>
            {/* <DirectionsIcon /> */}
            {!this.state.isPin?
              <img src={unpin} alt="unpin"/>:<img src={pin} alt="pin"/>
            }
            
          </IconButton>
        </Paper>
         <Paper className={classes.root2} style={{display: 'flex',flexDirection: 'column',backgroundColor: this.state.color}}>
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
            label={<Moment format="MMMM Do, h:mm a">{this.state.addReminder}</Moment>}
          // onClick={handleClick}
          // onDelete={handleDelete}
          /> : null}
        </Paper> 
        <Paper component="form" className={classes.root2} style={{ backgroundColor: this.state.color }}>
          <div>
            <MaterialUIPickers handleReminder={this.handleReminder} />
          </div>

          <>
              <Addcollaborator handleGetNotes={this.props.handleGetNotes}/>
          </>

          <div>
              <ChangeColor colorCode={this.state.color} color={this.handleColor} handleGetNotes={this.props.handleGetNotes} />
          </div>
          <IconButton aria-label="Image">
            <ImageOutlinedIcon />
          </IconButton>

          <IconButton aria-label="archive">
            <ArchiveOutlinedIcon />
          </IconButton>

          <IconButton className='iconButton' aria-label="moreMenu">
            <MoreVertOutlinedIcon />
          </IconButton>
          <Button variant="contained" onClick={this.AddNote} style={{ backgroundColor: this.state.color, color: 'rgba(0,0,0,0.87)', textTransform: 'capitalize', marginLeft: '26%'}} disableElevation>
            close
                    </Button>
        </Paper>
      </Paper>

    );
  }
}
export default withStyles(useStyles)(CustomizedInputBase);