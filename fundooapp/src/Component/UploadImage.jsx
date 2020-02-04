import React, { Component } from 'react';
import UserService from '../Service/UserService';
import ImageOutlinedIcon from '@material-ui/icons/ImageOutlined';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';

var userService = new UserService();

class UploadImage extends Component {
    

    handleUploadImage = (e,data) => {
        console.log('in image',URL.createObjectURL(e.target.files[0]));
        if(this.props.image === undefined){
        let fileData = new FormData();
        fileData.append('file',e.target.files[0]);
        userService.AddImage(fileData, data).then(
            response => {
                console.log('image res=>', response);
                this.props.handleGetNotes();
            }
        ).catch(
            error => {
                console.log('error=>', error);
            }
        )
        }
        else{
            this.props.handleImage(e.target.files[0]);
        }
    }

    render() {

        return (
            <>
                <input
                    id={'NoteImage'+this.props.noteId}
                    type='file' aria-label="Image"
                    style={{ display: 'none'}}

                    onChange={(event) => this.handleUploadImage(event,this.props.noteId)}
                />
                <Tooltip title="Add image">
                    <IconButton aria-label="image">
                    
                        <label htmlFor={'NoteImage'+this.props.noteId} style={{marginTop:'0.3em'}}>
                        
                            <ImageOutlinedIcon fontSize="small" />
                        
                        </label></IconButton>
                    </Tooltip>
                    
            </>
        );
    }
}
export default UploadImage;