import React, { Component } from "react";
import axios from 'axios'
import {Gprovider,firebase} from '../../config/firebase';


export class Login extends Component {
  componentWillMount(){
    firebase.auth().onAuthStateChanged((user)=>{
      if(user){
        this.props.history.push('/home')
      }
    })
  }
  login=()=>{
    firebase.auth().signInWithPopup(Gprovider).then((user,err)=>{
      
      if(user){
        let data = {
          uid:user.user.uid,
          email:user.user.email,
          displayName:user.user.displayName,
          avatar:user.user.photoURL
        }
        axios.post('/api/user/register',data).then((response)=>{
          console.log(response.data)
          
          this.props.history.push('/home')
        })
        
      }
    })
  }
  render() {
    return (
      <div className="row">
        <div className="col l4" />
        <div className="col l4">
          <div className="card-panel login-panel">
            <div className="grey-text">
              <h5 className="login-section-title">Login</h5>
              <hr />
              <br/>
              <br/>
              <button
                onClick={this.login}
                className="btn btn-login red waves-effect waves-light"
                type="submit"
                name="action"
              >
                Login With Google
                <i className="material-icons right">send</i>
              </button>
              <br/>
              <br/>
              <button
                
                className="btn btn-login blue waves-effect waves-light"
                type="submit"
                name="action"
              >
                Login With Twitter
                <i className="material-icons right">send</i>
              </button>
            </div>
          </div>
        </div>
        <div className="col l4" />
      </div>
    );
  }
}

export default Login;
