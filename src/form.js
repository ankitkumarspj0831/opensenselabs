import React, { Component } from "react";
import classes from "./form.module.css";

class Form extends Component {
  state = {
    name: "",
    phone: "",
    email: "",
    bio: "",
    dob: "",
    gender: "",
    nameError: "",
    phoneError: "",
    emailError: "",
    bioError: "",
    dobError: "",
    genderError: "",
    nameValid: false,
    phoneValid: true,
    emailValid: false,
    dobValid: false,
    bioValid: true,
    genderValid: false,
  };

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
    // Validation for name
    if (event.target.name === "name") {
      let name = event.target.value;
      var letters = /^[A-Za-z\s]+$/;
      if (name === "") {
        this.setState({ nameError: "Name cannot be empty.", nameValid: false });
      } else if (name.match(letters)) {
        if (name.length <= 20) {
          // Valid Name
          this.setState({ nameError: "", nameValid: true });
        } else {
          this.setState({
            nameError: "Name cannot be greater than 20",
            nameValid: false,
          });
        }
      } else {
        this.setState({
          nameError: "Name should not include any special character.",
          nameValid: false,
        });
      }
    }
    // Validation for phone
    if (event.target.name === "phone") {
      let phone = event.target.value;
      if (!isNaN(phone)) {
        if (phone.length === 10) {
          // Valid Phone
          this.setState({ phoneError: "", phoneValid: true });
        }
        if (phone.length > 10) {
          this.setState({
            phoneError: "Phone number should be 10 digits long.",
            phoneValid: false,
          });
        }
      } else {
        this.setState({
          phoneError: "Only numerical value allowed.",
          phoneValid: false,
        });
      }
    }
    // Validation for bio
    if (event.target.name === "bio") {
      var bio = event.target.value;
      if (bio.length > 60) {
        this.setState({
          bioError: "Should not contain more than 60 words.",
          bioValid: false,
        });
      } else {
        this.setState({ bioError: "", bioValid: true });
      }
    }
    // Validation for email
    if (event.target.name === "email") {
      let email = event.target.value;
      var atpos = email.indexOf("@");
      var dotpos = email.lastIndexOf(".");
      if (email === "") {
        this.setState({
          emailError: "Email shouldn't be empty.",
          emailValid: false,
        });
      } else {
        if (atpos < 1 || dotpos - atpos < 2) {
          this.setState({ emailError: "Invalid email.", emailValid: false });
        } else {
          // Valid Email
          this.setState({ emailError: "", emailValid: true });
        }
      }
    }
    // Date Validation
    if (event.target.name === "dob") {
      var date = event.target.value;
      if (date === "") {
        this.setState({
          dobError: "Date Of Birth cannot be empty",
          dobValid: false,
        });
      } else {
        // Valid Date
        this.setState({ dobError: "", dobValid: true });
      }
    }
    // Gender validation
    if (event.target.name === "gender") {
      var gender = event.target.value;
      if (gender === "") {
        this.setState({
          genderError: "Select one option.",
          genderValid: false,
        });
      } else {
        // Gender Selected
        this.setState({ genderError: "", genderValid: true });
      }
    }
  };

  resett = () => {
    document.getElementById("myform").reset();
    this.setState({
      nameValid: false,
      phoneValid: true,
      emailValid: false,
      dobValid: false,
      bioValid: true,
      genderValid: false,
    });
  };

  onSubmit = (event) => {
    event.preventDefault();
    localStorage.setItem("name", this.state.name);
    localStorage.setItem("phone", this.state.phone);
    localStorage.setItem("email", this.state.email);
    localStorage.setItem("bio", this.state.bio);
    localStorage.setItem("dob", this.state.dob);
    localStorage.setItem("gender", this.state.gender);
    alert("Form Data stored in Local Storage.");
    this.resett();
  };
  render() {
    let button;
    if (
      this.state.nameValid &&
      this.state.phoneValid &&
      this.state.dobValid &&
      this.state.bioValid &&
      this.state.genderValid &&
      this.state.emailValid
    ) {
      button = <input type="submit"></input>;
    } else {
      button = null;
    }
    return (
      <div style={{ width: "50%" }} className={classes.container}>
        <center>
          <form onSubmit={this.onSubmit} id="myform">
            <p className={classes.label}>Name</p>
            <input
              className={classes.InputElement}
              type="text"
              name="name"
              placeholder="Name"
              onChange={this.onChange}
            />
            <div className={classes.error}>{this.state.nameError}</div>
            <br />
            Phone:
            <input
              className={classes.InputElement}
              type="text"
              name="phone"
              placeholder="Phone"
              onChange={this.onChange}
            />
            <div className={classes.error}>{this.state.phoneError}</div>
            <br />
            Email:
            <input
              className={classes.InputElement}
              type="email"
              name="email"
              placeholder="Email"
              onChange={this.onChange}
            />
            <div className={classes.error}>{this.state.emailError}</div>
            <br />
            Bio:
            <textarea
              className={classes.InputElement}
              name="bio"
              placeholder="Bio"
              onChange={this.onChange}
            />
            <div className={classes.error}>{this.state.bioError}</div>
            <br />
            DateOfBirth:
            <input
              className={classes.InputElement}
              type="date"
              name="dob"
              onChange={this.onChange}
            />
            <div className={classes.error}>{this.state.dobError}</div>
            <br />
            Gender:
            <select
              name="gender"
              onChange={this.onChange}
              className={classes.Dropdown}
            >
              <option value="" defaultValue disabled>
                Select Option
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            <br />
            {button}
            <br />
            <input type="button" value="Reset Form" onClick={this.resett} />
          </form>
        </center>
      </div>
    );
  }
}

export default Form;
