import React from 'react';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import { useStyles } from '../css/NavbarCSS'
import { withStyles } from '@material-ui/core/styles'
import { Component } from 'react';
import Tooltip from '@material-ui/core/Tooltip';

class CustomizedInputBase extends Component {

    render(){
  const {classes} = this.props;

  return (
    <div className={classes.root}>
      <Tooltip title="Search">
      <IconButton className={classes.iconButton}>
      <SearchIcon />
      </IconButton>
      </Tooltip>
      <InputBase
        className={classes.input}
        placeholder="Search..."
        inputProps={{ 'aria-label': 'search' }}
      />
     
    </div>
  );
    }
}
export default (withStyles)(useStyles)(CustomizedInputBase);