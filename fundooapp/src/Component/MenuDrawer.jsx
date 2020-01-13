import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import { IconButton } from '@material-ui/core';
import { MenuOutlined } from '@material-ui/icons';
import { useStyles } from '../css/NavbarCSS';
import { withStyles } from '@material-ui/core/styles'
import { Component } from 'react';


class MenuDrawer extends Component{

    constructor(props){
        super(props);
        this.state={
            open:false
        }
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
    render(){
    const {classes} = this.props
    const sideList = (
        <div
            className={classes.list}
            role="presentation"
        >
            <List>
                {['Notes', 'Reminders'].map((text, index) => (
                    <ListItem button key={text}
                        onClick={() => {
                            index % 2 === 0 ?
                                this.props.DashboardProps.history.push('/dashboard/note')
                                : this.props.DashboardProps.history.push('/dashboard/reminder')
                        }}
                    >
                        <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List>
                <ListItem button onClick={() => this.props.DashboardProps.history.push('/dashboard/label')} >
                    <ListItemIcon><MailIcon /></ListItemIcon>
                    <ListItemText primary={'Edit Label'} />
                </ListItem>
            </List>
            <Divider />
            <List>
                {['Archive', 'Trash'].map((text, index) => (
                    <ListItem button key={text} 
                    onClick={() => {
                        index % 2 === 0 ?
                        this.props.DashboardProps.history.push('/dashboard/archive')
                            : this.props.DashboardProps.history.push('/dashboard/trash')
                    }}>
                        <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
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


        </>
    );
    }
}
export default (withStyles)(useStyles)(MenuDrawer);