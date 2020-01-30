import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import CardContent from '@material-ui/core/CardContent';
import { useStyles } from '../css/displayNote'
import { withStyles } from '@material-ui/core/styles'
import '../css/displayNote';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/Input';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';
import DoneOutlinedIcon from '@material-ui/icons/DoneOutlined';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import LabelOutlinedIcon from '@material-ui/icons/LabelOutlined';
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';
import UserService from '../Service/UserService'

var userService = new UserService();

class AddLabel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: true,
            labelValue:''
        }
    }

    handleClose = async () => {
        await this.setState({ open: false });
        if(this.state.labelValue !== ''){
            var LabelData={
                LabelName:this.state.labelValue
            }
            userService.addUserLabel(LabelData).then(
                response=>{
                    console.log('label response-->',response);
                    this.props.handleNoteLabels();
                }
            )
            .catch(
                error=>{
                    console.log('label error-->',error);
                }
            )
        }
        this.props.handleAddLabelResponce(this.state.open);
    };
    onChange = (e) => {
        this.setState(
            {
                [e.target.name]: e.target.value
            }
        )

    }
    render() {
        const theme = createMuiTheme({
            overrides: {

            }
        })
        
        return (
            <MuiThemeProvider theme={theme}>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}>

                    <CardContent>
                        <Typography variant='h5' style={{ width: '115px' }}>
                            Edit labels
                        </Typography>
                    </CardContent>

                    <div style={{ display: 'flex', marginLeft: '16px', marginBottom: '12px', marginRight: '16px' }}>
                        <CloseOutlinedIcon />
                        <Input style={{ marginLeft: '16px', marginBottom: '12px ', width: '80%' }} 
                        placeholder="Create new label"
                        name='labelValue'
                        onChange={this.onChange}
                        />
                        <DoneOutlinedIcon />
                    </div>
                    {
                        this.props.labels !== null?

                        this.props.labels.map((data,index)=>(
                            <div key={'labelDialog:'+index} style={{ display: 'flex', marginLeft: '16px', marginBottom: '12px', marginRight: '16px' }}>
                        <LabelOutlinedIcon />
                        <Typography  style={{ marginLeft: '16px', marginBottom: '12px ', width: '80%' }}>
                            {data.labelName}
                        </Typography>
                        <CreateOutlinedIcon />
                    </div>

                        )

                        ):null
                    }
                    <Divider />

                    <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '12px' }}>
                        <Button onClick={this.handleClose} style={{ color: 'rgba(0,0,0,0.87)', textTransform: 'capitalize' }} disableElevation>
                            Done
                        </Button>
                    </div>

                </Dialog>
            </MuiThemeProvider>
        );
    }
}

export default (withStyles)(useStyles)(AddLabel);