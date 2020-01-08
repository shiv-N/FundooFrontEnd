import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import AddAlertOutlinedIcon from '@material-ui/icons/AddAlertOutlined';
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';
import ColorLensOutlinedIcon from '@material-ui/icons/ColorLensOutlined';
import ImageOutlinedIcon from '@material-ui/icons/ImageOutlined';
import ArchiveOutlinedIcon from '@material-ui/icons/ArchiveOutlined';
import MoreVertOutlinedIcon from '@material-ui/icons/MoreVertOutlined';
import { useStyles } from '../css/displayNote'
import { withStyles } from '@material-ui/core/styles'
import '../css/displayNote'

// const [expanded, setExpanded] = React.useState(false);
class DisplayNote extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes } = this.props;

    return (

      <Card className={classes.card}>

        <Typography>
          {this.props.noteData.title}
        </Typography>

        <CardContent>
          <Typography>
            {this.props.noteData.message}
          </Typography>

        </CardContent>
        <CardActions className={classes.icon} disableSpacing>
          <IconButton aria-label="reminder">
            <AddAlertOutlinedIcon />
          </IconButton>

          <IconButton aria-label="collaboration">
            <PersonAddOutlinedIcon />
          </IconButton>

          <IconButton aria-label="colour">
            <ColorLensOutlinedIcon />
          </IconButton>

          <IconButton aria-label="Image">
            <ImageOutlinedIcon />
          </IconButton>

          <IconButton aria-label="archive">
            <ArchiveOutlinedIcon />
          </IconButton>

          <IconButton aria-label="moreMenu">
            <MoreVertOutlinedIcon />
          </IconButton>
        </CardActions>
      </Card>
    )

  }
}

export default (withStyles)(useStyles)(DisplayNote);
