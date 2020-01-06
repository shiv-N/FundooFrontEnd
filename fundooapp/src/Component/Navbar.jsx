import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import RefreshOutlinedIcon from '@material-ui/icons/RefreshOutlined';
import ViewAgendaOutlinedIcon from '@material-ui/icons/ViewAgendaOutlined';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
import { Avatar } from '@material-ui/core';
import DashboardOutlinedIcon from '@material-ui/icons/DashboardOutlined';
import MenuDrawer from './MenuDrawer';
import { useStyles } from '../css/NavbarCSS'




export default function Navbar(props) {
  const classes = useStyles();
  const [view, setView] = React.useState(false)

  return (
    <div className={classes.grow}>
      <AppBar className={classes.appBar} position="fixed" color="inherit">
        <Toolbar>
          {/* <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton> */}
          <MenuDrawer DashboardProps={props.DashboardProps}/>
          <Typography className={classes.title} variant="h6" noWrap>
            Fundoo
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase 
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
          <IconButton style={{marginLeft:550}}>
          <RefreshOutlinedIcon/>
          </IconButton>

          <IconButton onClick={()=>setView(!view)}>
              { view ? <DashboardOutlinedIcon/> : <ViewAgendaOutlinedIcon/> }
          </IconButton>

          <IconButton>
          <SettingsOutlinedIcon/>
          </IconButton>

          <IconButton>
         <Avatar>S</Avatar> 
          </IconButton>
        </Toolbar>
      </AppBar>
        
      
    </div>
  );
}