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
import { useStyles } from '../css/NavbarCSS'


export default function MenuDrawer() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const HandleDrawerOpen=()=>{
        setOpen(true)
    }
    const HandleDrawerClose=()=>{
        setOpen(false)
    }

    const sideList = (
        <div
            className={classes.list}
            role="presentation"
        >
            <List>
                {['Notes', 'Reminders'].map((text, index) => (
                    <ListItem button key={text}>
                        <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List>
                {['Label'].map((text, index) => (
                    <ListItem button key={text}>
                        <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List>
                {['All mail', 'Trash', 'Spam'].map((text, index) => (
                    <ListItem button key={text}>
                        <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List>
        </div>
    );



    return (
        <>
            <IconButton onClick={!open ? HandleDrawerOpen: HandleDrawerClose }>
                 <MenuOutlined />
             </IconButton>
            <Drawer
                anchor='left'
                open={open}
                variant='persistent'
                className={classes.drawer}
                >
                
                {sideList}
            </Drawer>


        </>
    );
}