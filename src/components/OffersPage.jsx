import * as React from "react"
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Button, Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { CardActionArea, CardActions } from '@mui/material';
import { owner, veterinary } from "../constants"
import { makeGetRequest } from "../util";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from "./Navbar";
import ClaimsTable from "./ClaimsTable";

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

export const OffersPage = () => {
  let [username, setUsername] = React.useState("initial");
  let [password, setPassword] = React.useState("initial");
  let [userType, setUserType] = React.useState("initial");

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true)
  }  ;
  const handleClose = () => setOpen(false);

  function handleChange(e, func){
    func(e.target.value);
  }

  function handleSelectChange(e, func){
    func(e);
  }


  return (
   <div>
     <Navbar></Navbar>
     <h1 style={{textAlign: "center"}}>Hayvan dostunuzun türünü seçin:</h1>
     <Card style={{float: "left", padding: 50}} sx={{ maxWidth: 345 }}>
      <CardActionArea onClick={handleOpen}>
        <CardMedia
          component="img"
          height="140"
          image="/dogs.jpg"
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Köpek
          </Typography>
          <Typography variant="body2" color="text.secondary">
            
          </Typography>
        </CardContent>
      </CardActionArea>
     
    </Card>
    <Card style={{float: "left", padding: 50}} sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image="/cat.jpg"
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Kedi
          </Typography>
          <Typography variant="body2" color="text.secondary">
            
          </Typography>
        </CardContent>
      </CardActionArea>
     
    </Card>
    <Card style={{float: "left", padding: 50}} sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image="/others.jpg"
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Diğer
          </Typography>
          <Typography variant="body2" color="text.secondary">
            
          </Typography>
        </CardContent>
      </CardActionArea>
    
    </Card>
    <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Modal>
   </div>
  )
}

