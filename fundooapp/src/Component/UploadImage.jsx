import React, { Component } from 'react';
import UserService from '../Service/UserService';
import ImageOutlinedIcon from '@material-ui/icons/ImageOutlined';
import Tooltip from '@material-ui/core/Tooltip';
import { Button } from '@material-ui/core';

var userService = new UserService();

class UploadImage extends Component {
    

    handleUploadImage = (e,data) => {
    
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

    render() {

        return (
            <div>
                <input id={'NoteImage'+this.props.noteId} type='file' aria-label="Image"
                    style={{ display: 'none' }}

                    onChange={(event) => this.handleUploadImage(event,this.props.noteId)}
                />

                    <Tooltip title="Add image">
                        <label htmlFor={'NoteImage'+this.props.noteId} >
                            <ImageOutlinedIcon fontSize="small" />

                        </label>
                    </Tooltip>

            </div>
        );
    }
}
export default UploadImage;