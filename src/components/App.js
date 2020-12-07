import React, { Component, useState } from "react";
import "../styles/App.css";

const App = () => {
  const [input, setInput] = useState({
    name: "",
    email: "",
    gender: "male",
    phoneno: "",
    pwd: ""
  });

  const [Errormsg, setErrormsg] = useState("");
  const handleChange = (event) => {
    let inputCopy = { ...input };
    inputCopy[event.target.name] = event.target.value;
    setInput(inputCopy);
  };
  const handleClick = () => {
    let name = input.name;
    let email = input.email;
    let gender = input.gender;
    let phoneno = input.phoneno;
    let pwd = input.pwd;
    console.log(name, email, gender, phoneno, pwd);
    if (!name || !email || !gender || !phoneno || !pwd) {
      setErrormsg("All fields are mandatory");
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
      setErrormsg("Name is not alphanumeric");
      return;
    }
    if (email.indexOf("@")<1) {
      setErrormsg("Email must contain @");
      return;
    }
    if (gender !== "male" && gender !== "female" && gender !== "other") {
      setErrormsg("Please identify as male, female or others");
      return;
    }
    let pattern = /^[0-9]+$/;
    if (!phoneno.match(pattern)) {
      setErrormsg("Phone Number must contain only numbers");
      return;
    }
    if (pwd.length < 6) {
      setErrormsg("Password must contain atleast 6 letters");
      return;
    }

    setErrormsg("Hello " + email.substring(0,email.indexOf("@")));
  };
  return (
    <div id="main">
      <div>{Errormsg}</div>
      <label>Name:</label>
      <input data-testid="name" name="name" onChange={handleChange} />
      <label>email:</label>
      <input data-testid="email" name="email" onChange={handleChange} />

      <label>gender:</label>
      <input
        data-testid="gender"
        name="gender"
        value={input.gender}
        onChange={handleChange}
      />

      <label>phoneno:</label>
      <input data-testid="phoneNumber" name="phoneno" onChange={handleChange} />

      <label>password:</label>
      <input
        data-testid="password"
        type="password"
        name="pwd"
        onChange={handleChange}
      />

      <button type="submit" data-testid="submit" onClick={handleClick}>
        Submit
      </button>
    </div>
  );
};

export default App;
