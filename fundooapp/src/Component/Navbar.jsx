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

class Navbar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      view: false
    }
  }


  render() {
    const { classes } = this.props;
    console.log('==>',this.props.toggleView);
    
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
          
            <Searchbar/>

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

            <IconButton>
              <Avatar>S</Avatar>
            </IconButton>
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
      ViewGrids:()=>dispatch(ViewGrid())
  }
}

export default connect(mapToStateProps,mapDispatchToProps)((withStyles)(useStyles)(Navbar));