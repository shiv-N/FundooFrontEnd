import React from 'react';
import { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import DirectionsIcon from '@material-ui/icons/Directions';
import {useStyles} from '../css/CustomizedInputBaseCSS'
import { withStyles  } from '@material-ui/core/styles'


// const classes = useStyles();

class CustomizedInputBase extends Component{
  render(){

    const { classes } = this.props;
    console.log(classes);
    

  return (
    <Paper 

      className = {classes.root}
    >
      
      <Paper component="form" className = {classes.root2}
        //className='root'
      >
      
      <InputBase
        className='input'
        placeholder="Title"
        fullWidth={true}
      />
     
      <IconButton className='iconButton'>
        <DirectionsIcon />
      </IconButton>
    </Paper> <Paper className = {classes.root2}>
      
      <InputBase
        className='classes.input'
        placeholder="Take a note..."
        fullWidth
        multiline
      />
      
    </Paper> <Paper component="form" className = {classes.root2}>
      
      <IconButton type="submit" className='iconButton' aria-label="search">
        <SearchIcon />
      </IconButton>
      
      <IconButton color="primary" className='iconButton' aria-label="directions">
        <DirectionsIcon />
      </IconButton>
    </Paper>
    </Paper>
   
  );}
}
export default withStyles(useStyles)(CustomizedInputBase);