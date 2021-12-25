import * as React from "react"
import { owner, veterinary } from "../constants"
import { makeGetRequest } from "../util";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from "./Navbar";
import { Card, Button, Box } from '@mui/material';
import ClaimsTable from "./ClaimsTable";
import NewNavBar from "./NewNavBar";
import {Field, Form, Formik} from "formik";
import Modal from "@mui/material/Modal";
import {useState} from "react";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export const ClaimsPage = () => {

  function handleChange(e, func){
    func(e.target.value);
  }

  function handleSelectChange(e, func){
    func(e);
  }

  return (
   <div>
     <NewNavBar/>

     <ClaimsTable></ClaimsTable>

   </div>
  )
}

