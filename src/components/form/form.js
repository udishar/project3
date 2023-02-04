import React, { useState } from "react";
import CustomButton from "../../atoms/button/button";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import TwitterIcon from "@mui/icons-material/Twitter";
import CustomInputFields from "../../atoms/InputFields/input";
import FormStyle from "../form/form.module.css";
import GoogleIcon from "@mui/icons-material/Google";
import AppleIcon from "@mui/icons-material/Apple";
import { Link } from "react-router-dom";
import {
  isValidEmail,
  isValidPass,
  isValidPhone,
  usernameValidation,
} from "../../Helper/validtion";
import { useRecoilState } from "recoil";
import { userInfo } from "../../atom";
import { useNavigate } from "react-router-dom";


export default function Form() {
  const placeholderEmail = "Enter Username Here..";
  const placeholderPass = "Enter Password Here..";
  // here value could be email,username , phone number
  // const [uniqueId,setUniqueId]=useState("")
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useRecoilState(userInfo);

  let navigate = useNavigate();
  const routeChange = () => {
    let path = "/";
    navigate(path);
  };

  // function handleEmail(inputEmail) {
  //   console.log(inputEmail)
  //   setEmail(inputEmail);
  // }
  function handlePassword(inputPass) {
    setPassword(inputPass);
  }

  // function handlePhone(inputPhone) {
  //   console.log(inputPhone)
  //   setPhone(inputPhone);
  // }
  function handleUsername(inputUsername) {
    console.log(inputUsername);
    setUsername(inputUsername);
  }

  // const isEmailValid = isValidEmail(email);
  // if(isEmailValid=="Valid Email"){
  //   value=email

  // }
  //let isPhoneNumberValid = isValidPhone(phone);
  // if(isPhoneNumberValid=="Valid Phone number"){
  //   value=email
  // }
  const isUsernameValid = usernameValidation(username);
  // if(isUsernameValid=="Valid Username"){
  //   value=email
  // }

  const isPasswordValid = isValidPass(password);

  const userData = JSON.parse(localStorage.getItem("userData")) || [];

  function handleSubmit() {
    let flag = true;
    for (let i = 0; i < userData.length; i++) {
      if (username) {
        if (userData[i].username == username) {
          flag = false;
          // console.log(userData[i].username, username);
          // console.log(userData[i].password, password);

          if (userData[i].password == password) {
            setLoggedIn({ ...loggedIn, isUserLoggedIn: true });
            // console.log(loggedIn.isUserLoggedIn , "after login")
            let a = alert("YOU ARE SUCCESSFULLY LOGGED IN");
        //      userData[i].isUserLoggedIn=true // =================================
        //     console.log(userData[i] , "okokoko");
        //  loginUser=userData[i]
        
            if (typeof a == "undefined") {
              routeChange();
            }
          } else {
            alert("INCORRECT PASSWORD");
            break;
          }
        }
      }
      // if(phone){
      //   if (userData[i].phoneNumber == phone) {
      //     flag=false
      //     if (userData[i].password == password) {
      //       setLoggedIn({ ...loggedIn, isUserLoggedIn: true });
      //       alert("YOU ARE SUCCESSFULLY LOGGED IN");
      //     } else {
      //       alert("INCORRECT PASSWORD");
      //       break;
      //     }
      //   }
      // }
      // if(username){
      //   if (userData[i].username == username) {
      //     flag=false
      //     if (userData[i].password == password) {
      //       setLoggedIn({ ...loggedIn, isUserLoggedIn: true });
      //       alert("YOU ARE SUCCESSFULLY LOGGED IN");

      //     } else {
      //       alert("INCORRECT PASSWORD");

      //       break;
      //     }
      //   }
      // }
    }
    if (flag) {
      alert("USER NOT FOUND");
    }
    userData.push({
      email: email,
      password: password,
      isUserLoggedIn: loggedIn.isUserLoggedIn,
    });
  }
  return (
    <Dialog
      open
      className={FormStyle.dialog}
      PaperProps={{
        style: {
          borderRadius: "20px",
        },
      }}
    >
      <div className={FormStyle.icon}>
        <TwitterIcon
          className={FormStyle.image}
          sx={{ fontWeight: "700px", fontSize: "2rem" }}
        />
      </div>

      <div className={FormStyle.container}>
        <DialogTitle
          className={FormStyle.title}
          sx={{ fontWeight: "900px", fontSize: "2rem" }}
        >
          Sign in to Twitter
        </DialogTitle>
        <div className={FormStyle.btn1}>
          <GoogleIcon />

          <CustomButton buttonText="Sign in with Google" />
        </div>

        <div className={FormStyle.btn2}>
          <AppleIcon />
          <CustomButton text="Sign in with Apple" />
        </div>

        <h5 className={FormStyle.heading1}>
          -------------------------- or --------------------------
        </h5>
        <div className={FormStyle.in}>
          <CustomInputFields
            abc={placeholderEmail}
            handleChange={handleUsername}
            type="text"
            style={{ marginBottom: "10px" }}
          />
          {isUsernameValid}

          <CustomInputFields
            abc={placeholderPass}
            handleChange={handlePassword}
            type="password"
          />
          {isPasswordValid}
        </div>
        <div className={FormStyle.btn3}>
          <CustomButton
            texted="Submit"
            style={{ backgroundColor: "black", color: "white" }}
            onClicking={handleSubmit}
          />
        </div>
        <div className={FormStyle.btn4}>
          <CustomButton texting="Forgot password?" />
        </div>
        <div className={FormStyle.login}>
          <p>Don't have an account?</p>
          <Link to="/signup" className={FormStyle.link}>
            {" "}
            Sign up
          </Link>
        </div>
      </div>
    </Dialog>
  );
}
