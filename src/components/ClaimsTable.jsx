import * as React from 'react';
import {useState, useEffect} from 'react'
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Card, Button, Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { makeGetRequest } from '../util';


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



export default function ClaimsTable() {
  const [claims, setClaims] = useState([]);
  const [tableRowsArray, setTableRowsArray] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false)
  const [open, setOpen] = React.useState(false);
  const [data, setData] = useState([]);
  const handleOpen = (e) => {
    console.log(e.target) 
    setOpen(true)
  };

  const handleClose = () => setOpen(false);

  useEffect(() => {
    const res= axios.get("/claims/get_claims_of_user/?id=1")
    res
      .then((resp) => {
        return resp.data
      })
      .then((data) => {
        setIsLoaded(true)
        setData(data)
        console.log(data, "123213")
      })
  }, [])


  return (
    <div>
    <Card style={{width: "75%", margin: 100, height: "100%"}} variant="outlined">
       <Typography style={{float: "left"}} gutterBottom variant="h5" component="div">
          Taleplerim 
        </Typography>
        <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
     <Button style={{float: "right"}}>Add Claim</Button>
     </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Başlık</TableCell>
              <TableCell align="right">Hayvan</TableCell>
              <TableCell align="right">Tarih</TableCell>
              <TableCell align="right">Statüs</TableCell>
              <TableCell align="right">İşlemler</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoaded === true ? data.map((data) => 
             <TableRow
             key={data.id}
                       sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                     >
                       <TableCell component="th" scope="row">
                         {data.description}
                       </TableCell>
                       <TableCell align="right">{data.pet_name}</TableCell>
                       <TableCell align="right">2021-12-25</TableCell>
                       <TableCell align="right">{data.status}</TableCell>
                       <TableCell align="right"> <Button onClick={(e) => handleOpen(e)} description={data.description}>Detay</Button> </TableCell>
                     </TableRow>
            ) : <></>}
                    
            
        
  
          </TableBody>
        </Table>
      </TableContainer>
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
      <ToastContainer/>
    </div>
  );
}