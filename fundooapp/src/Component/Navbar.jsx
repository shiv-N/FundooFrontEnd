import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import RefreshOutlinedIcon from '@material-ui/icons/RefreshOutlined';
import ViewAgendaOutlinedIcon from '@material-ui/icons/ViewAgendaOutlined';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
import { Avatar } from '@material-ui/core';
import DashboardOutlinedIcon from '@material-ui/icons/DashboardOutlined';
import MenuDrawer from './MenuDrawer';
import { useStyles } from '../css/NavbarCSS'
import { withStyles } from '@material-ui/core/styles'
import { Component } from 'react';
import Searchbar from './SearchBar';
import { connect } from 'react-redux';
import {ViewGrid,ViewList} from '../Redux/ToggleAction'
import Tooltip from '@material-ui/core/Tooltip';
import SignOut from './SignOut'
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import UserService from '../Service/UserService';
import {Search} from '../Redux/SearchAction'
import CloseIcon from '@material-ui/icons/Close';

var userService = new UserService();

class Navbar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      view: false,
      SearchValue:null,
      searchClose:false
    }
  }
  handleOnChange=async(event)=>{
    await this.setState({
      SearchValue: event.target.value
    })

    this.props.SearchNote(this.state.SearchValue);
    //this.props.DashboardProps.history.push('/dashboard/Search')
  }
  handleCloseSearch=()=>{
    this.setState({
      searchClose:false,
      SearchValue:""
    },()=>{
      console.log("SearchValue:",this.state.SearchValue);
      
      this.props.DashboardProps.history.push('/dashboard/note')
    })
 
  }
  handleSearchComponent=()=>{
    this.setState({
      searchClose:true
    })
    this.props.DashboardProps.history.push('/dashboard/Search')
  }

  render() {
    const { classes } = this.props;
    
    return (
      <div className={classes.grow}>
        <AppBar className={classes.appBar} position="fixed" color="inherit">
          <Toolbar>
            <MenuDrawer DashboardProps={this.props.DashboardProps} />
            <div>
            <Typography className={classes.title} variant="h6" noWrap>
              Fundoo
          </Typography>
          </div>
          {/* ####################################################################### */}
            {/* <Searchbar DashboardProps={this.props.DashboardProps}/> */}
            <div className={classes.root}>
        <Tooltip title="Search">
          <IconButton className={classes.iconButton}>
            <SearchIcon />
          </IconButton>
        </Tooltip>
        <InputBase
          className={classes.input}
          placeholder="Search..."
          ref="inputRef"
          value={this.state.SearchValue}
          onClick={this.handleSearchComponent}
          onChange={this.handleOnChange}
          inputProps={{ 'aria-label': 'search' }}
        />
        {this.state.searchClose?<IconButton onClick={this.handleCloseSearch}><CloseIcon/></IconButton>:null}
      </div>
{/* ##################################################################################### */}
          <Tooltip title="Refresh">
            <IconButton >
              <RefreshOutlinedIcon />
            </IconButton>
            </Tooltip>

            {/* <IconButton onClick={() => this.setState({view:!this.state.view})}> */}
            <IconButton onClick={this.props.toggleView?this.props.ViewGrids:this.props.ViewLists}>
              {this.props.toggleView ? 
              <Tooltip title="Grid View"><DashboardOutlinedIcon /></Tooltip>:
              <Tooltip title="List View"><ViewAgendaOutlinedIcon /></Tooltip> }
            </IconButton>

            <IconButton>
              <SettingsOutlinedIcon />
            </IconButton>

            {/* <IconButton>
              <Avatar>S</Avatar>
            </IconButton> */}
            <>
            <SignOut DashboardProps={this.props.DashboardProps}/>
            </>
          </Toolbar>
        </AppBar>


      </div>
    );
  }
}

const mapToStateProps = state =>{
  return{
      toggleView : state.toggleView
  }
}
const mapDispatchToProps= dispatch =>{
  return{
      ViewLists:()=>dispatch(ViewList()),
      ViewGrids:()=>dispatch(ViewGrid()),
      SearchNote:(data)=>dispatch(Search(data))
  }
}

export default connect(mapToStateProps,mapDispatchToProps)((withStyles)(useStyles)(Navbar));