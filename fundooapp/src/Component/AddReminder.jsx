import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Popper from '@material-ui/core/Popper';
import AddAlertOutlinedIcon from '@material-ui/icons/AddAlertOutlined';
import IconButton from '@material-ui/core/IconButton';
import 'date-fns';
import DateTimePicker from 'react-datetime-picker';
import { ClickAwayListener } from '@material-ui/core';
import UserService from '../Service/UserService';

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
    width: '245px',
    maxWidth: '245px',
    minWidth: '125px',
    backgroundColor: 'white',
    boxShadow: '0.1em 0.1em 0.4em 0em grey',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: "space-between",
    padding: '0.5%',
    flexWrap: 'wrap',
    '&:hover': {}
  },

};


class AddReminder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      anchorEl: null,
    }
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
    var currentDate = new Date()
    // sending to back end
    if(this.state.date !== currentDate){
    var reminderData = {
      Reminder: this.state.date
    }
    console.log(this.props.noteId);

    userService.AddReminder(reminderData, this.props.noteId).then(
      response => {
        console.log(response);
        
        this.props.handleGetNotes();
      }
    )
    }
  }
  onChange = date => { this.setState({ date }) }

  render() {

    const { classes } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
    return (
      <div>
        <IconButton aria-label="reminder" onClick={this.handlePopoverOpen} className={classes.iconButton} >
          <AddAlertOutlinedIcon fontSize="small" />
        </IconButton>
        {this.state.anchorEl !== null ?
          <ClickAwayListener onClickAway={() => this.handleClose}>
            <Popper className={classes.paper} open={open} anchorEl={anchorEl}>
              <DateTimePicker
                onChange={this.onChange}
                value={this.state.date} />
            </Popper>
          </ClickAwayListener>
          : null}
      </div>
    );
  }
}


export default withStyles(styles)(AddReminder);
