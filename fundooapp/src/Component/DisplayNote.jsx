import React, { Component } from 'react';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { useStyles } from '../css/displayNote'
import { withStyles } from '@material-ui/core/styles'
import InputBase from '@material-ui/core/InputBase';
import '../css/displayNote'

// const [expanded, setExpanded] = React.useState(false);
class DisplayNote extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes } = this.props;
    console.log('display note component props:', this.props);

    return(
      <div className={classes.mainCard}>
      {
        this.props.note.length !== 0 ?
        this.props.note.map( data => (
          
          
        
            <Card className={classes.card}>
              {/* <CardHeader
                action={
                  <IconButton >
                    <MoreVertIcon />
                  </IconButton>
                }
                title="Shrimp and Chorizo Paella"
              /> */}
               <CardMedia
                className={classes.media}
                image="/static/images/cards/paella.jpg"
                title="Paella dish"
              />
              <InputBase
                className='input'
                placeholder="Title"
                value={data.title}
                fullWidth={true}
              />
             
              <CardContent>
              <InputBase style={{backgroundColor:'red',color:"#1a73e8"}}
                placeholder="Message"
                value={data.message}
                fullWidth={true}
              />
              </CardContent>
              <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                  <FavoriteIcon />
                </IconButton>
                <IconButton aria-label="share">
                  <ShareIcon />
                </IconButton>
              </CardActions>
            </Card>
          
        )
        ) : null
    
      }
      </div>
    )
    
  }
}

export default (withStyles)(useStyles)(DisplayNote);
