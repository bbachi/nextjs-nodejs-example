import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Header } from "./Header";
import { Users } from "./Users";
import { DisplayBoard } from "./DisplayBoard";
import CreateUser from "./CreateUser";
import {
  getAllUsers,
  createUser,
  createPayment,
} from "../services/UserService";

class App extends Component {
  state = {
    user: {},
    users: [],
    numberOfUsers: 0,
    payment: {},
  };

  createUser = (e) => {
    createUser(this.state.user).then((response) => {
      console.log(response);
      this.setState({ numberOfUsers: this.state.numberOfUsers + 1 });
    });
  };

  getAllUsers = () => {
    getAllUsers().then((users) => {
      console.log(users);
      this.setState({ users: users, numberOfUsers: users.length });
    });
  };

  onChangeForm = (e) => {
    let user = this.state.user;
    if (e.target.name === "firstname") {
      user.firstName = e.target.value;
    } else if (e.target.name === "lastname") {
      user.lastName = e.target.value;
    } else if (e.target.name === "email") {
      user.email = e.target.value;
    }
    this.setState({ user });
  };

  createPayment = (e) => {
    createPayment().then((response) => {
      console.log(response);

      this.setState({ payment: { ...response } });
      if (response) {
        window.location.href = response.url;
      }
    });
  };

  render() {
    return (
      <div className="App">
        <Header></Header>
        <div className="container mrgnbtm">
          <div className="row">
            <div className="col-md-8">
              <CreateUser
                user={this.state.user}
                onChangeForm={this.onChangeForm}
                createUser={this.createUser}
              ></CreateUser>
            </div>
            <div className="col-md-4">
              <DisplayBoard
                numberOfUsers={this.state.numberOfUsers}
                getAllUsers={this.getAllUsers}
              ></DisplayBoard>
            </div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "3em",
          }}
        >
          <button
            type="button"
            onClick={this.createPayment}
            className="btn btn-danger"
          >
            Create Payment
          </button>
        </div>

        <div className="row mrgnbtm">
          <Users users={this.state.users}></Users>
        </div>
      </div>
    );
  }
}

export default App;
