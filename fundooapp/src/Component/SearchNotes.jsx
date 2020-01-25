import React from 'react';
import { Component } from 'react';
import '../css/dashboard.css';
import DisplayNote from './DisplayNote'
import UserService from '../Service/UserService';
import { connect } from 'react-redux';

var userService = new UserService();

class SearchNotes extends Component{

    constructor(props) {
        super(props)
        this.state = {
            getAllNotes: []
        }
    }

    componentDidMount() {
        this.handleGetNotes();
    }

    // shouldComponentUpdate() {
    //     return this.handleGetNotes();
        
    // }
    componentDidUpdate(prevProps, prevState){
        if(prevProps !== this.props){
            return this.handleGetNotes();
        }
    }

    handleGetNotes = () => {
        
        console.log('in search compo',this.props.keyword);
        
    var searchData={
        Keyword : this.props.keyword
      }
      userService.getAllSearchNotes(searchData).then(
        response =>{
          console.log(response);
          this.setState({
            getAllNotes: response.data.data,
        })
          return true;
        }
      ).catch(
          error=>{
            this.setState({
                getAllNotes: [],
            })
          }
      )
      return false;
    }

    render() {
        return(
               <div className="noteContainer" style={{marginTop:'6em',marginLeft:'20em'}}>
                        {
                            this.state.getAllNotes !== null &&
                            (this.state.getAllNotes).map((value,index) => (
                                <DisplayNote noteData={value} key={index} handleGetNotes={this.handleGetNotes}/>
                            ))
                        }
                    </div>
           
        )
    }
}
const mapToStateProps = state =>{
    return{
        keyword : state.keyword
    }
  }
export default connect(mapToStateProps)(SearchNotes);