import 'date-fns';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import Popper from '@material-ui/core/Popper';
import AddAlertOutlinedIcon from '@material-ui/icons/AddAlertOutlined';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles } from '@material-ui/core/styles';

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

class MaterialUIPickers extends React.Component {
        constructor(props){
            super(props);
            this.state={
                selectedDate:new Date('2020-01-01T09:00:00'),
                anchorEl: null,
            }
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
        
            if(this.state.selectedDate !== new Date('2020-01-01T09:00:00')){
              this.props.handleReminder(this.state.selectedDate,this.props.noteId)
            }
            
          }
  handleDateChange = date => {
    this.setState({
        selectedDate:date
    })
  };
render(){
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
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justify="space-around">
        <KeyboardDatePicker
          margin="normal"
          id="date-picker-dialog"
          label="Date picker dialog"
          format="dd/MM/yyyy"
          value={this.state.selectedDate}
          onChange={this.handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
        <KeyboardTimePicker
          margin="normal"
          id="time-picker"
          label="Time picker"
          format="h:mm a"
          value={this.state.selectedDate}
          onChange={this.handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change time',
          }}
        />
      </Grid>
    </MuiPickersUtilsProvider>
    
    </Popper>
          : null}
      </div>
  );
}
}

export default (withStyles)(styles)(MaterialUIPickers);