import * as React from "react"
import {
  Box,
  Text,
  Heading,
  VStack,
  FormControl,
  Input,
  Select,
  Link,
  Button,
  HStack,
  Center,
  NativeBaseProvider,
} from "native-base"
import { owner, veterinary } from "../constants"
import { makeGetRequest } from "../util";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from "./Navbar";
import ClaimsTable from "./ClaimsTable";

export const ClaimsPage = () => {
  let [username, setUsername] = React.useState("initial");
  let [password, setPassword] = React.useState("initial");
  let [userType, setUserType] = React.useState("initial");

  function handleChange(e, func){
    func(e.target.value);
  }

  function handleSelectChange(e, func){
    func(e);
  }


  async function signIn(){
    let res;
    console.log(userType)
    if(userType.toLowerCase() === owner.toLowerCase())
      res = await makeGetRequest("/users/get_user_by_credentials/?user=" + username + "&password=" + password);
    else
      res = await makeGetRequest("/vets/get_user_by_credentials/?user=" + username + "&password=" + password);
    let user = res.data
    if(user.length == 0)
        toast("Invalid credentials")
    else
      toast("Successfull login")
    console.log(username + " " + password)
  }

  return (
   <div>
     <Navbar></Navbar>
     <ClaimsTable></ClaimsTable>
   </div>
  )
}

