import React from 'react';
import { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import ImageOutlinedIcon from '@material-ui/icons/ImageOutlined';
import {useStyles} from '../css/CustomizedInputBaseCSS'
import { withStyles  } from '@material-ui/core/styles';
import CheckBoxOutlinedIcon from '@material-ui/icons/CheckBoxOutlined';


//const classes = useStyles();

class TakeNotes extends Component {
   
    render(){
        const { classes } = this.props;
        // console.log(classes);
        return (
            <Paper component="form" className={classes.root3}>
              <InputBase
                className={classes.input}
                placeholder="Take a note..."
                fullWidth
              />
              <IconButton type="submit" className={classes.iconButton} aria-label="Check">
                <CheckBoxOutlinedIcon />
              </IconButton>
              <IconButton className={classes.iconButton}>
              <ImageOutlinedIcon/>
              </IconButton>
            </Paper>
          );
    }
 
}

export default withStyles(useStyles)(TakeNotes);