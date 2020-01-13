import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { useStyles } from '../css/displayNote'
import { withStyles } from '@material-ui/core/styles'
import '../css/displayNote';
import UserService from '../Service/UserService';
import RestoreFromTrashOutlinedIcon from '@material-ui/icons/RestoreFromTrashOutlined';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';


var userService = new UserService();

class DisplayTrashNote extends Component {
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
        <CardActions style={{ display: 'flex',flexDirection: 'row'}} disableSpacing>
          <IconButton aria-label="delete" className={classes.iconButton} >
            <DeleteForeverOutlinedIcon fontSize="small" />
          </IconButton>

          <IconButton aria-label="Restore" className={classes.iconButton}>
            <RestoreFromTrashOutlinedIcon fontSize="small" />
          </IconButton>
        </CardActions>
      </Card>
    )

  }
}

export default (withStyles)(useStyles)(DisplayTrashNote);
