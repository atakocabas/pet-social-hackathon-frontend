import * as React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Paper from "@mui/material/Paper";
import { Button, Box } from "@mui/material";
import Modal from "@mui/material/Modal";
import ResponsiveAppBar from './NewNavBar';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import { Formik, Form, Field } from 'formik';
import './customCss.css'
import { styled } from '@mui/material/styles';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import { useNavigate } from 'react-router-dom';
import Footer from './footer';





export default function RedAlarm({user}) {
  let navigate = useNavigate();
    const [isLoaded, setLoaded] = useState(false);
    const [data, setData] = useState([]);
    const [open, setOpen] = useState(false);
    const [openSecond, setOpenSecond] = useState(false);
    const [openThird, setOpenThird] = useState(false);
    const [currentData, setCurrentData] = useState(false)
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
      setExpanded(!expanded);
    };

   

  return( 
      <div>
        
      <ResponsiveAppBar user={user}/>
      <Container maxWidth="m">

    <div style={{ display: 'flex', height: '100%' }}>
      <div style={{ flexGrow: 1, marginTop: "1rem", marginBottom: "3rem", marginLeft: "2.5rem", gridTemplateColumns: "repeat(4, 1fr)", display: "grid", gridRowGap: "2rem", justifyContent: "center" }}>
     
      <div style={{height: "100px"}}></div>
      </div>
      
     </div>

      
   
    </Container>
    <Footer />
  
  </div>
    );
}
