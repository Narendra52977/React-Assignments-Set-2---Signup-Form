import React, { Component, useState } from "react";
import "../styles/App.css";
export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      gender: "male",
      phoneno: "",
      pwd: "",
      Errormsg: ""
    };
  }

  handleChange = (event) => {
    let stateCopy = { ...this.state };

    stateCopy[event.target.name] = event.target.value;
    this.setState(stateCopy);
  };
  handleClick = () => {
    console.log(this.state);
    let name = this.state.name;
    let email = this.state.email;
    let gender = this.state.gender;
    let phoneno = this.state.phoneno;
    let pwd = this.state.pwd;
    //console.log(name, email, gender, phoneno, pwd);
    if (!name || !email || !gender || !phoneno || !pwd) {
      this.setState({ Errormsg: "All fields are mandatory" });
      return;
    }
    let cnt1 = 0;
    let cnt2 = 0;
    for (let i = 0; i < name.length; i++) {
      if (
        (name[i] >= "a" && name[i] <= "z") ||
        (name[i] >= "A" && name[i] <= "Z")
      ) {
        cnt1++;
      } else if (Number(name[i]) >= 0 && Number(name[i]) <= 9) {
        cnt2++;
      }
      if (cnt1 && cnt2) {
        break;
      }
    }

    if (!cnt1 || !cnt2) {
      this.setState({ Errormsg: "Name is not alphanumeric" });
      return;
    }
    if (this.state.email.indexOf("@") < 1) {
      this.setState({ Errormsg: "Email must contain @" });
      return;
    }
    if (
      this.state.gender !== "male" &&
      this.state.gender !== "female" &&
      this.state.gender !== "other"
    ) {
      this.setState({ Errormsg: "Please identify as male, female or others" });
      return;
    }
    let pattern = /^[0-9]+$/;
    if (!this.state.phoneno.match(pattern)) {
      this.setState({ Errormsg: "Phone Number must contain only numbers" });
      return;
    }
    if (this.state.pwd.length < 6) {
      this.setState({ Errormsg: "Password must contain atleast 6 letters" });
      return;
    }

    this.setState({
      Errormsg: "Hello " + email.substring(0, email.indexOf("@"))
    });
  };
  render() {
    return (
      <div>
        <div>{this.state.Errormsg}</div>
        <label>Name:</label>
        <input data-testid="name" name="name" onChange={this.handleChange} />
        <label>email:</label>
        <input data-testid="email" name="email" onChange={this.handleChange} />

        <label>gender:</label>
        <input
          data-testid="gender"
          name="gender"
          value={this.state.gender}
          onChange={this.handleChange}
        />

        <label>phoneno:</label>
        <input
          data-testid="phoneNumber"
          name="phoneno"
          onChange={this.handleChange}
        />

        <label>password:</label>
        <input
          data-testid="password"
          type="password"
          name="pwd"
          onChange={this.handleChange}
        />

        <button type="submit" data-testid="submit" onClick={this.handleClick}>
          Submit
        </button>
      </div>
    );
  }
}
