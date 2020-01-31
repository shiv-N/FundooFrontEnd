import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import { useStyles } from '../css/displayNote'
import { withStyles } from '@material-ui/core/styles'
import '../css/displayNote';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import UserService from '../Service/UserService';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import AddPhotoAlternateOutlinedIcon from '@material-ui/icons/AddPhotoAlternateOutlined';
import Button from '@material-ui/core/Button';

var userService = new UserService();

class ChangeProfilePhoto extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true,
      profilePic:null
    }
  }

  handleClose = async () => {
    await this.setState({ open: false });
    this.props.closeProfileDialog(this.state.open)
    };
  onChange = (e) => {
    this.setState(
      {
        [e.target.name]: e.target.value
      }
    )
  }
  handleSetProfile=async()=>{
      console.log(this.state.profilePic);
      let fileData = new FormData();
      fileData.append('file',this.state.profilePic);
      await userService.SetProfilePhoto(fileData).then(
          response=>{
            this.setState({ open: false });
              console.log('profile',response);
              localStorage.setItem('profilePhoto',response.data.data)
                this.props.closeProfileDialog(this.state.open,response.data.data)
          }
      ).catch(
          error=>{
            this.setState({ open: true });
            
          }
      )
    if(this.state.open){this.props.closeProfileDialog(this.state.open,null)}
  }
  handleUploadImage = (e) => {
    
    this.setState({
        profilePic:e.target.files[0]
    })
    // userService.AddImage(fileData,).then(
    //     response => {
    //         console.log('image res=>', response);
    //         this.props.handleGetNotes();
    //     }
    // ).catch(
    //     error => {
    //         console.log('error=>', error);
    //     }
    // )
}
  render() {
    const theme = createMuiTheme({
      overrides: {
        
      }
    })
    const { classes } = this.props;
    return (
      <MuiThemeProvider theme={theme}>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
        >
            <Typography variant='h5' style={{ width: '575px', padding: '0.2em', marginLeft: '0.5em', marginRight: "0.2em" }}>
                Select profile photo
            </Typography>
            <Typography style={{ fontSize:'1em',width: '575px', padding: '0.2em', marginLeft: '1em', marginRight: "0.2em" }}>
                Upload photos
            </Typography>
            <Divider/>
            <div style={{display:'flex',flexDirection:'column',justifyContent:'center',marginTop:'5%'}}>
                <AddPhotoAlternateOutlinedIcon style={{width:'100%',height:'40%'}}/>
                <input
                    id='addimage00'
                    type='file' aria-label="Image"
                    style={{ display: 'none'}}
                    onChange={(event) => this.handleUploadImage(event)}
                />
                <label htmlFor='addimage00' 
                style={{
                    display: 'inline-block',
                    width:'36%',
                    background: 'linear-gradient(top, #f9f9f9, #e3e3e3)',
                    border: '1px solid #999',
                    padding: '5px 8px',
                    outline: 'none',
                    whiteSpace: 'nowrap',
                    cursor: 'pointer',
                    textShadow: '1px 1px #fff',
                    fontWeight: '700',
                    fontSize: '10pt',
                    marginLeft:"29%",
                    marginBottom:'10%'
                    }}>
                 Select a photo from your computer
            </label>
            </div>
            <Divider/>
            <div style={{display:'flex',flexDirection:'row',marginTop:'2%',marginBottom:'3%',marginLeft:'2%'}}>
                <Button  onClick={this.handleSetProfile} style={{ backgroundColor: '#1a73e8',color: 'rgba(0,0,0,0.87)', textTransform: 'capitalize',border: '1px solid #999' }} disableElevation>
                  Set as a profile photo
                </Button>
                <Button onClick={this.handleClose} style={{ border: '1px solid #999',marginLeft:'3%',color: 'rgba(0,0,0,0.87)', textTransform: 'capitalize' }} disableElevation>
                  Cancel
                </Button>
            </div>
        </Dialog>
      </MuiThemeProvider>
    );
  }
}

export default (withStyles)(useStyles)(ChangeProfilePhoto);