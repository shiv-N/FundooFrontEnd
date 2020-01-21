import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Popper from '@material-ui/core/Popper';
import IconButton from '@material-ui/core/IconButton';
import 'date-fns';
import { ClickAwayListener } from '@material-ui/core';
import MoreVertOutlinedIcon from '@material-ui/icons/MoreVertOutlined';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import UserService from '../Service/UserService';
import Tooltip from '@material-ui/core/Tooltip';

var userService = new UserService();

const styles = {
  grid: {
    width: '60%',
  },
  iconButton: {
    width: '28px',
    height: '28px',
    padding: 5
  },
  paper: {
    width: '140px',
    maxWidth: '200px',
    minWidth: '125px',
    backgroundColor: 'white',
    boxShadow: '0.1em 0.1em 0.4em 0em grey',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: "space-between",
    flexWrap: 'wrap',
    '&:hover': {}
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    width: 130,
    padding: '0.2em'
  },
  textField: {
    marginLeft: '10px',
    marginRight: '10px',
    width: 150,
  },

};


class MoreMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
    }
    this.handleClose = this.handleClose.bind(this);
  }

  handlePopoverOpen = event => {
    if (this.state.anchorEl === null) {
      this.setState({ anchorEl: event.currentTarget });
    }
    else {
      this.handleClose();
    }

  };

  async handleClose() {
    await this.setState({ anchorEl: null });   
   
  }
  
  handleTrash=()=>{

    userService.TrashNote(this.props.noteId).then(
      response=>{
        this.props.handleGetNotes();
      }
    )
    console.log('im in handletrash');
    this.handleClose();
  }

  render() {

    const { classes } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
    return (
      <div>
        <Tooltip title="More">
        <IconButton aria-label="moreMenu" onClick={this.handlePopoverOpen} className={classes.iconButton}>
            <MoreVertOutlinedIcon fontSize="small" />
          </IconButton>
          </Tooltip>
        {this.state.anchorEl !== null ?
          <ClickAwayListener onClickAway={this.handleClose}>
            <Popper className={classes.paper} open={open} anchorEl={anchorEl}>


                <List className={classes.container}>
                    <ListItem  onClick={this.handleTrash}>
                        Delete note
                    </ListItem>
                    <ListItem>
                    Add label
                    </ListItem>
                    <ListItem>
                    Add drawing
                    </ListItem>
                    <ListItem>
                    Make a copy
                    </ListItem>
               
                </List>

            </Popper>
          </ClickAwayListener>
          : null}
      </div>
    );
  }
}


export default withStyles(styles)(MoreMenu);
