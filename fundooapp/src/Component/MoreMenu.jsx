import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Popper from '@material-ui/core/Popper';
import IconButton from '@material-ui/core/IconButton';
import 'date-fns';
import { ClickAwayListener, Button, Typography } from '@material-ui/core';
import MoreVertOutlinedIcon from '@material-ui/icons/MoreVertOutlined';
import List from '@material-ui/core/List';
import UserService from '../Service/UserService';
import Tooltip from '@material-ui/core/Tooltip';
import { connect } from 'react-redux';
import CheckBoxOutlineBlankOutlinedIcon from '@material-ui/icons/CheckBoxOutlineBlankOutlined';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import Input from '@material-ui/core/Input';

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
      ViewLabel:false,
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
    await this.setState({ anchorEl: null, ViewLabel:false});

  }

  handleTrash = () => {

    userService.TrashNote(this.props.noteId).then(
      response => {
        this.props.handleGetNotes();
      }
    )
    this.handleClose();
  }
  handleAddLabel=(data)=>{
    console.log('l==>',data.id,data.labelName);
   var noteLabel={
      labelId:data.id,
      labelName:data.labelName
    }
    userService.addNoteLabel(this.props.noteId,noteLabel).then(
      response=>{
        console.log('label-->',response);
        this.props.handleGetNotes();
      }
    )
  }
  render() {
    const theme = createMuiTheme({
      overrides: {
        MuiListItemIcon:{root: {
          color: 'rgba(0, 0, 0, 0.54)',
          display: 'inline-flex',
          minWidth: '40px',
          flexShrink: '0'
      }
    }
      }
  })
    
    const { classes } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
    return (
      <div>
         <MuiThemeProvider theme={theme}>
        <Tooltip title="More">
          <IconButton aria-label="moreMenu" onClick={this.handlePopoverOpen} className={classes.iconButton}>
            <MoreVertOutlinedIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        {this.state.anchorEl !== null ?
          <ClickAwayListener onClickAway={this.handleClose}>
            { !this.state.ViewLabel?
            <Popper className={classes.paper} open={open} anchorEl={anchorEl}>
              <List className={classes.container}>
                <Button onClick={this.handleTrash}>
                  Delete note
                </Button>
                <Button onClick={()=>this.setState({ViewLabel:true})}>
                  Add label
                </Button>
                <Button>
                  Add drawing
                </Button>
                <Button>
                  Make a copy
                </Button>
              </List>
            </Popper>:
            
            <Popper className={classes.paper} style={{padding:'0.2em',width:'150px'}}open={open} anchorEl={anchorEl}>
              
              <Typography variant='h5' style={{ width: '115px' }}>
                            Edit labels
              </Typography>
              <div style={{ display: 'flex', marginLeft: '6px' }}>
                        
                        <Input style={{ marginLeft: '2px', marginBottom: '4px ', width: '100%' }} 
                        placeholder="Enter label name"
                        name='labelValue'
                        onChange={this.onChange}
                        />
                        <SearchIcon/>
              </div>
              <List >
              {
                this.props.UserLabels.length !== 0?  this.props.UserLabels.map((data,index)=>(
                  <ListItem  button key={data} style={{paddingTop:'1px',paddingBottom:'1px'}}>
                    <iconButton style={{display: 'flex',flexDirection:'row'}} onClick={()=>this.handleAddLabel(data)}> 
                       <ListItemIcon><CheckBoxOutlineBlankOutlinedIcon/></ListItemIcon>
                      <ListItemText primary={data.labelName} />
                    </iconButton>
                  </ListItem>
                )):
                null
                
              }
              </List>
            </Popper>
            }
          </ClickAwayListener>
          : null}
          </MuiThemeProvider>
      </div>
    );
  }
}

const mapToStateProps = state =>{
  return{
    UserLabels : state.UserLabels
  }
}
export default connect(mapToStateProps)((withStyles)(styles)(MoreMenu));
