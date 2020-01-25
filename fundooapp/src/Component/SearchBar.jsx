import React from 'react';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import { useStyles } from '../css/NavbarCSS'
import { withStyles } from '@material-ui/core/styles'
import { Component } from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import UserService from '../Service/UserService';

var userService = new UserService();

class CustomizedInputBase extends Component {
    constructor(props){
      super(props)
      this.state={
        SearchValue:null
      }
    }
  handleOnChange=async(event)=>{
    await this.setState({
      SearchValue: event.target.value
    })

    var searchData={
      Keyword : this.state.SearchValue
    }
    userService.getAllSearchNotes(searchData).then(
      response =>{
        console.log(response);
        
      }
    )
  }
  handleSearchComponent=()=>{
    this.props.DashboardProps.history.push('/dashboard/Search')
  }
  render() {
    const { classes } = this.props;
    console.log(this.state.SearchValue);
    
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
          value={this.state.SearchValue}
          onClick={this.handleSearchComponent}
          onChange={this.handleOnChange}
          inputProps={{ 'aria-label': 'search' }}
        />

      </div>
    );
  }
}

export default (withStyles)(useStyles)(CustomizedInputBase);