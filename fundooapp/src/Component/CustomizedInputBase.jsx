import React from 'react';
import { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import { useStyles } from '../css/CustomizedInputBaseCSS'
import { withStyles } from '@material-ui/core/styles'
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
import UploadImage from './UploadImage'

var userService = new UserService();

const defaultState={
  title: '',
      noteDescription: '',
      image: '',
      color: null,
      isPin: false,
      Reminder: null,
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
      AddReminder: this.state.Reminder,
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
            Reminder: null,
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
      Reminder: dataFromChild
    })
  }
  handleColor=(dataFromChild)=>{
    this.setState({
      color: dataFromChild
    })
  }
  handleDeleteReminder=async()=>{
    await this.setState({
      Reminder: null
    })
    //this.props.handleGetNotes();
  }
  handleImage=async(dataFromChild)=>{
    let fileData = new FormData()
      fileData.append('file',dataFromChild);
    await userService.AddImageOnNote(fileData).then(
      response=>{
        this.setState({
          image:response.data.data
        })
      }
    )
  }
  render() {
    const { classes } = this.props;
    return (
      <Paper className={classes.root} style={{ backgroundColor: this.state.color }}>

        {this.state.image === "" || this.state.image === null ? null :

        <img style={{width:'100%'}} src={this.state.image} alt='noteImage' />

        }
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
          {this.state.Reminder !== null ?
          <Chip style={{ width: "38%" }}
            variant="outlined"
            size="small"
            icon={<AccessTimeIcon />}
            label={<Moment format="MMMM Do, h:mm a">{this.state.addReminder}</Moment>}
          // onClick={handleClick}
           onDelete={this.handleDeleteReminder}
          /> : null}
        </Paper> 
        <Paper component="form" className={classes.root2} style={{ backgroundColor: this.state.color }}>
          
            <MaterialUIPickers handleReminder={this.handleReminder} />
          
            <Addcollaborator handleGetNotes={this.props.handleGetNotes}/>
          
            <ChangeColor colorCode={this.state.color} color={this.handleColor} handleGetNotes={this.props.handleGetNotes} />
          
            <UploadImage image={this.state.image} handleImage={this.handleImage} handleGetNotes={this.props.handleGetNotes} />
          
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