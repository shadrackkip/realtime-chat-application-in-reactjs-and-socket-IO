import React, { Component } from "react";
import io from "socket.io-client";
import { firebase } from "../../../config/firebase";
import { Link } from "react-router-dom";
import "../chat.css";
import Axios from "axios";
import UserDetails from "../../widgetsUi/UserDetails";

export class ChatView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      message: "",
      uid: "",
      socketId: "",
      sockets: [],
      avatar: "",
      messages: [],
      users: [],
      user: [],
      typing: false
    };

    this.socket = io("http://192.168.0.29:3231");
    firebase.auth().onAuthStateChanged(user => {
      this.setState({
        username: user.displayName,
        uid: user.uid,
        avatar: user.photoURL
      });

      this.sendMessage = ev => {
        ev.preventDefault();
        this.setState({
          socketId: this.socket.id
        });

        this.socket.emit("SEND_MESSAGE", {
          author: this.state.username,
          uid: this.props.user.uid,
          socketId: this.socket.id,
          sender: this.props.user.uid,
          receiver: this.props.uuid,
          avatar: this.state.avatar,
          message: this.state.message
        });
        this.setState({ message: "" });
      };

      this.socket.on("TYPING_INFO", info => {
        this.setState({
          typing: true
        });
      });
      this.socket.on("NO_TYPING", info => {
        this.setState({
          typing: false
        });
      });

      this.socket.on("RECEIVE_MESSAGE", function(data) {
        console.log(data);

        addMessage(data);
      });

      const addMessage = data => {
        this.setState({ messages: [...this.state.messages, data] });
      };
    });
  }
  componentWillMount = () => {
    Axios.get("/api/users").then(users => {
      this.setState({
        users: users.data
      });
    });

    Axios.get("/api/getUser?id=" + this.props.uuid).then(response => {
      this.setState({
        user: response.data
      });
    });
  };

  handleBlur = e => {
    this.socket.emit("NOT_TYPING", {
      notify: ""
    });
  };
  handleMessageChange = e => {
    this.setState({
      message: e.target.value
    });
  };
  displayTyping = () => {
    this.socket.emit("TYPING", {
      notify: "Typing...",
      uid: this.props.user.uid
    });
  };
  logout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        // this.props.mathistory.push('/')
      });
  };
  getDetails = () => {
    return <UserDetails userdet={this.state.users} id={this.props.uuid} />;
  };

  render() {
    return (
      <div className="chat-application">
        <div className="chat-content-head">
          <div className="header-details">
            <h5 className="m-0 sidebar-title">Chats</h5>
          </div>
        </div>

        <div className="app-chat">
          <div className="content-area content-right">
            <Link
              to="home"
              data-target="chat-sidenav"
              className="sidenav-trigger hide-on-large-only"
            >
              <i className="material-icons">menu</i>
            </Link>
            <div className="card card card-default scrollspy border-radius-6 fixed-width">
              <div className="card-content chat-content p-0">
                <div className="sidebar-left sidebar-fixed animate fadeUp animation-fast">
                  <div className="sidebar animate fadeUp">
                    <div className="sidebar-content">
                      <div
                        id="sidebar-list"
                        className="sidebar-menu chat-sidebar list-group position-relative"
                      >
                        <div className="sidebar-list-padding app-sidebar">
                          <div className="sidebar-header">
                            <div className="row valign-wrapper">
                              <div className="col s2 media-image pr-0">
                                <img
                                  src={this.props.user.avatar}
                                  alt=""
                                  className="circle z-depth-2 responsive-img"
                                />
                              </div>
                              <div className="col s10">
                                <p className="m-0 blue-grey-text text-darken-4 font-weight-700">
                                  {this.props.user.username}
                                </p>
                                <p className="m-0 info-text">
                                  {this.props.user.email}
                                </p>
                                <Link
                                  to="home"
                                  onClick={this.logout}
                                  className="m-0 info-text"
                                >
                                  Logout
                                </Link>
                              </div>
                              <span className="option-icon">
                                <i className="material-icons">more_vert</i>
                              </span>
                            </div>
                          </div>
                          <div className="sidebar-search animate fadeUp">
                            <div className="search-area">
                              <i className="material-icons mr-2 search-icon">
                                search
                              </i>
                              <input
                                type="text"
                                placeholder="Search Chat"
                                className="app-filter"
                                id="chat_filter"
                              />
                            </div>
                            <div className="add-user">
                              <Link to="home">
                                <i className="material-icons mr-2 add-user-icon">
                                  person_add
                                </i>
                              </Link>
                            </div>
                          </div>
                          <div className="sidebar-content sidebar-chat ps ps--active-y">
                            <div className="chat-list">
                              {this.state.users.map((user, i) => {
                                if (user.uid !== this.state.uid) {
                                  return (
                                    <div
                                      key={i}
                                      className="chat-user animate fadeUp delay-1"
                                    >
                                      <div className="user-section">
                                        <div className="row valign-wrapper">
                                          <div className="col s2 media-image online pr-0">
                                            <img
                                              src={user.avatar}
                                              alt=""
                                              className="circle z-depth-2 responsive-img"
                                            />
                                          </div>
                                          <div className="col s10">
                                            <Link to={"/home/" + user.uid}>
                                              <p className="m-0 blue-grey-text text-darken-4 font-weight-700">
                                                {user.displayName}
                                              </p>
                                              <p className="m-0 info-text">
                                                {user.email}
                                              </p>
                                            </Link>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="info-section">
                                        <div className="star-timing">
                                          <div className="favorite">
                                            <i className="material-icons amber-text">
                                              star
                                            </i>
                                          </div>
                                          <div className="time">
                                            <span>2.38 pm</span>
                                          </div>
                                        </div>
                                        {/* <span className="badge badge pill red">4</span> */}
                                      </div>
                                    </div>
                                  );
                                }
                              })}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="chat-content-area animate fadeUp">
                  {this.props.uuid ? (
                    <div>
                      <div className="chat-header">
                        {this.getDetails()}

                        <span className="option-icon">
                          {this.state.typing ? (
                            <span>typing...</span>
                          ) : (
                            <span />
                          )}

                          <span className="favorite">
                            <i className="material-icons">star_outline</i>
                          </span>

                          <i className="material-icons">more_vert</i>
                        </span>
                      </div>

                      <div className="chat-area ps">
                        <div className="chats">
                          <div className="chats">
                            {this.state.messages.map((item, i) => {
                              
                              console.log(item.receiver);
                              console.log(this.state.uid);

                              if (item.uid !== this.state.uid) {
                                return (
                                  <div key={i} className="chat chat-right">
                                    <div className="chat-avatar">
                                      <Link className="avatar">
                                        <img
                                          src={item.avatar}
                                          class="circle"
                                          alt="avatar"
                                        />
                                      </Link>
                                    </div>
                                    <div className="chat-body">
                                      <div className="chat-text">
                                        <p>{item.message}</p>
                                      </div>
                                    </div>
                                  </div>
                                );
                              } else {
                                return (
                                  <div key={i} className="chat">
                                    <div className="chat-avatar">
                                      <Link className="avatar">
                                        <img
                                          src={item.avatar}
                                          className="circle"
                                          alt="avatar"
                                        />
                                      </Link>
                                    </div>
                                    <div className="chat-body">
                                      <div className="chat-text">
                                        <p>{item.message}</p>
                                      </div>
                                    </div>
                                  </div>
                                );
                              }
                            })}
                          </div>
                        </div>
                        <div
                          className="ps__rail-x"
                          style={{ left: "0px", bottom: "0px" }}
                        >
                          <div
                            className="ps__thumb-x"
                            tabIndex="0"
                            style={{ left: "0px", width: "0px" }}
                          />
                        </div>
                        <div
                          className="ps__rail-y"
                          style={{ top: "0px", height: "225px", right: "0px" }}
                        >
                          <div
                            className="ps__thumb-y"
                            tabIndex="0"
                            style={{ top: "0px", height: "0px" }}
                          />
                        </div>
                      </div>

                      <div className="chat-footer">
                        <form
                          action="javascript:void(0);"
                          className="chat-input"
                        >
                          <input
                            id="message"
                            type="text"
                            value={this.state.message}
                            onChange={this.handleMessageChange}
                            onKeyPress={this.displayTyping}
                            onBlur={this.handleBlur}
                            placeholder="Type message here.."
                            className="message"
                          />
                          <Link
                            to="#"
                            onClick={this.sendMessage}
                            className="btn waves-effect waves-light send"
                          >
                            Send
                          </Link>
                        </form>
                      </div>
                    </div>
                  ) : (
                    <div>Click on a user to start a conversation</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ChatView;
