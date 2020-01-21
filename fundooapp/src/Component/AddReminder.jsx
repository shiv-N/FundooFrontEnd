import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Popper from '@material-ui/core/Popper';
import AddAlertOutlinedIcon from '@material-ui/icons/AddAlertOutlined';
import IconButton from '@material-ui/core/IconButton';
import 'date-fns';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';

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
    width: '210px',
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
  container: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    width: 200,
    padding: '1em'
  },
  textField: {
    marginLeft: '10px',
    marginRight: '10px',
    width: 150,
  },

};


class AddReminder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: null,
      time: null,
      anchorEl: null,
    }
    this.handleClose = this.handleClose.bind(this);
  }

  handlePopoverOpen = event => {
    // event.stopPropagation();
    // event.nativeEvent.stopImmediatePropagation()
    if (this.state.anchorEl === null) {
      
      this.setState({ anchorEl: event.currentTarget });
    }
    else {
      this.handleClose();
    }

  };

  async handleClose() {
    await this.setState({ anchorEl: null });

    if(this.state.date !== null && this.state.time !==null){
      this.props.handleReminder(this.state.date + " " + this.state.time,this.props.noteId)
    }
    
  }
  onDateChange = (event) => { console.log("add remindere innnnn",event.target);
   this.setState({ date: event.target.value }) }
  onTimeChange = (event) =>{ console.log("add remindere innnnn",event.target);  this.setState({ time: event.target.value }) }
  
  render() {

    const { classes } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
    return (
      <div>
        <Tooltip title="Remind me">
        <IconButton aria-label="reminder" onClick={this.handlePopoverOpen} className={classes.iconButton} >
          <AddAlertOutlinedIcon fontSize="small" />
        </IconButton>
        </Tooltip>
        {this.state.anchorEl !== null ?
            <Popper className={classes.paper} style={{zIndex:1300}}open={open} anchorEl={anchorEl}>

              <form className={classes.container} noValidate>
                <Typography>
                  Pick Date & Time
        </Typography><br></br>
                <TextField
                  id="date"
                  type="date"
                  label='date'
                  defaultValue="2020-01-15"
                  onChange={  this.onDateChange}
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <TextField
                  id="time"
                  type="time"
                  label='time'
                  defaultValue="07:30"
                  autoFocus={true}
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  inputProps={{
                    step: 300, // 5 min
                  }}
                  onChange={  this.onTimeChange}
                />
              </form>

            </Popper>
          : null}
      </div>
    );
  }
}


export default (withStyles)(styles)(AddReminder);
