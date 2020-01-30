import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { IconButton } from '@material-ui/core';
import { MenuOutlined } from '@material-ui/icons';
import { useStyles } from '../css/NavbarCSS';
import { withStyles } from '@material-ui/core/styles'
import { Component } from 'react';
import AddAlertOutlinedIcon from '@material-ui/icons/AddAlertOutlined';
import EmojiObjectsOutlinedIcon from '@material-ui/icons/EmojiObjectsOutlined';
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';
import ArchiveOutlinedIcon from '@material-ui/icons/ArchiveOutlined';
import DeleteIcon from '@material-ui/icons/Delete';
import LabelOutlinedIcon from '@material-ui/icons/LabelOutlined';
import UserService from '../Service/UserService';
import AddLabel from './AddLabel'
import { connect } from 'react-redux';
import {LabelData} from '../Redux/LabelAction'
import {DisplayLabel} from '../Redux/DisplayLabelAction'
var userService = new UserService();

class MenuDrawer extends Component{

    constructor(props){
        super(props);
        this.state={
            open:false,
            view:false,
            Labels:[]
        }
    }

    componentDidMount(){
        this.handleNoteLabels();
    }
    handleNoteLabels=async()=>{
    await userService.getAllLabels().then(
            response=>{
                this.setState({
                    Labels:response.data.data
                })
            }
        )
        .catch(
            error=>{
                console.log('error-->',error);
                this.setState({
                    Labels:[]
                })
            }
        )
        this.props.UserLabelData(this.state.Labels);
    }
    HandleDrawerOpen = () => {
        this.setState({
            open : true
        });
    }
    HandleDrawerClose = () => {
        this.setState({
            open : false
        });
    }
    handleAddLabelResponce = (value) => {
        this.setState({
          view: value
        })
      }

    handdleDisplayLabel = (data) =>{
        this.props.DisplayUserLabel(data);
        this.props.DashboardProps.history.push('/dashboard/label/'+data.labelName)
    }
    render(){
    const {classes} = this.props
    
    const sideList = (
        <div
            className={classes.list}
            role="presentation"
        >
            <List >
                {['Notes', 'Reminders'].map((text, index) => (
                    <ListItem style={{paddingLeft:'18px'}} button key={text}
                        onClick={() => {
                            index % 2 === 0 ?
                                this.props.DashboardProps.history.push('/dashboard/note')
                                : this.props.DashboardProps.history.push('/dashboard/reminder')
                        }}
                    >
                        <ListItemIcon>{index % 2 === 0 ? <EmojiObjectsOutlinedIcon /> : <AddAlertOutlinedIcon/>}</ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List>
                {
                    this.state.Labels.length === 0?null:
                    this.state.Labels.map((text, index) => (
                                <ListItem style={{paddingLeft:'18px'}} button key={'Labels=>'+text.labelName}
                                onClick={()=>this.handdleDisplayLabel(text)}
                                >
                                <ListItemIcon><LabelOutlinedIcon/></ListItemIcon>
                                <ListItemText primary={text.labelName} />
                                </ListItem>
                                ))
                }
                <ListItem style={{paddingLeft:'18px'}} button onClick={() => this.setState({view:true})}>
                    <ListItemIcon><CreateOutlinedIcon/></ListItemIcon>
                    <ListItemText primary={'Edit Label'} />
                </ListItem>
            </List>
            <Divider />
            <List >
                {['Archive', 'Trash'].map((text, index) => (
                    <ListItem style={{paddingLeft:'18px'}} button key={text} 
                    onClick={() => {
                        index % 2 === 0 ?
                        this.props.DashboardProps.history.push('/dashboard/archive')
                            : this.props.DashboardProps.history.push('/dashboard/trash')
                    }}>
                        <ListItemIcon>{index % 2 === 0 ? <ArchiveOutlinedIcon /> : <DeleteIcon/>}</ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List>
        </div>
    );



    return (
        <>
            <IconButton onClick={!this.state.open ? this.HandleDrawerOpen : this.HandleDrawerClose}>
                <MenuOutlined />
            </IconButton>
            <Drawer
                anchor='left'
                open={this.state.open}
                variant='persistent'
                className={classes.drawer}
            >

                {sideList}
            </Drawer>
            {
                this.state.view?<AddLabel labels={this.state.Labels} 
                handleAddLabelResponce={this.handleAddLabelResponce}
                handleNoteLabels={this.handleNoteLabels}
                />:null
            }

        </>
    );
    }
}

const mapDispatchToProps= dispatch =>{
    return{
        UserLabelData:(data)=>dispatch(LabelData(data)),
        DisplayUserLabel:(data)=>dispatch(DisplayLabel(data))
    }
  }

export default connect(null,mapDispatchToProps)((withStyles)(useStyles)(MenuDrawer));