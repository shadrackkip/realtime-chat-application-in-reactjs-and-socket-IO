import React, { Component } from 'react'
import { connect } from 'react-redux'
import {getUser} from '../../store/actions'

export class UserDetails extends Component {
   
    
    componentWillMount(){
        this.props.dispatch(getUser(this.props.id))
        // this.props.dispatch(getUser(this.props.id))     
    }
   
    getUser=(id)=>{
      
     if(   this.props.userdet.length==0){
         return (
             <div></div>
         )
     }else{
       return this.props.userdet.map((item,i)=>{
            
            if(item.uid===this.props.id){
            return (
    <div key={i} className="row valign-wrapper">
        <div className="col media-image online pr-0">
        <img src={item.avatar} alt="" className="circle z-depth-2 responsive-img"/>
        </div>
        <div className="col">
        <p className="m-0 blue-grey-text text-darken-4 font-weight-700">{item.displayName}</p>
        <p className="m-0 chat-text truncate">Last seen 16:67</p>


        </div>
        </div>
            )
            }
        })
     }
      
    }
    render() {
       
      
        return (
            
            <div>
            {this.getUser(this.props.id)}      
            </div>
        )
    }
}

function mapStateToProps(state){

    return{
        user : state.user
    }
}



export default connect(mapStateToProps) (UserDetails)
