import React, { Component } from "react";

import ChatView from "../chat/ChatView/ChatView";
import {firebase} from '../../config/firebase';

export class Home extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       username:'',
       avatar:'',
       email:'',
       uid:''
    };
  };
  
  componentWillMount(){
    firebase.auth().onAuthStateChanged((user)=>{
      this.setState({
        username:user.displayName,
        avatar:user.photoURL,
        email:user.email,
        uid:user.uid
      })
    })
  }
  render() {
    return (
      <div className="container">
         <ChatView uuid={this.props.match.params.uuid} user={this.state} />
      </div>
    );
  }
}

export default Home;
