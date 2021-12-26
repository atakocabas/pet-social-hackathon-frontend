import * as React from 'react';
import {useState, useEffect} from 'react'
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import {Select, MenuItem, Input} from "@mui/material";
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
import {Field, Form, Formik} from "formik";
import {Dropdown} from "react-bootstrap";
import {useNavigate} from "react-router-dom";


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
  const [isLoaded2, setIsLoaded2] = useState(false)
  const [open, setOpen] = React.useState(false);
  const [data, setData] = useState([]);
  const [filePath, setFilePath] = useState('');
  const [animalID, setAnimalID] = useState(-1)
  const [descr, setDescr] = useState('')

  const handleSubmit = () => {

  }
  const handleFileChange = (e, func) =>{
    func(e.target.files)
  }

  const handleChange = (e, func) => {
    func(e.target.value)
  }
  const handleOpen = (e) => {
    console.log(e.target) 
    setOpen(true)
  };
  const handleOpenSecond = (e) => {
    setOpenSecond(true)
  }
  const navigate = useNavigate();
  const[petsOfUser, setPetsOfUser] = useState([]);
  const [openSecond, setOpenSecond] = useState(false);
  const [description, setDescription] = useState("deneme");
  const [openThird, setOpenThird] = useState(false);

  const handleCloseSecond = () => setOpenSecond(false);
  const handleCloseThird = () => setOpenThird(false);
  const [records, setRecords] = useState([]);

  async function addClaim(values){
    //let fileData = fs.readSync(filePath)
    let filename = "/files/"+ filePath.name
    let petId = animalID
    let petName = "Soprano"
    let status = "Open"
    /*await axios.post("http://localhost:8000/claims/", {pet_id: petId, status: status, description: description})
        .then((resp) => {
          toast("Talebiniz alındı. Görmek için sayfayı yenileyin.")
        })
    console.log(filePath)
    console.log(description)
    console.log(animalID)*/
    let obj = {}
    obj["id"] = 1
    obj["description"] = description
    obj["pet_name"] = petName
    obj["status"] = status
    obj["file"] = "files/WhatsApp_Image_2021-12-22_at_22.16.04.jpg"

    records.push(obj)
    setRecords(records)
  }
  const getPets = async () => {
    const getPet = await axios.get(`/pets/get_pets_of_user/?id=1`)
    const result = getPet.data;
    await setPetsOfUser(result)
    setIsLoaded2(true)
    console.log(result)
    result.map((x) => console.log(x.name, x.id))
  }

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

    getPets()

  }, [])



  return (
    <div>
    <Card style={{width: "75%", margin: 100, height: "100%"}} variant="outlined">
       <Typography style={{float: "left"}} gutterBottom variant="h5" component="div">
          Taleplerim
        </Typography>
      <Button onClick={handleOpen} style={{float: "right"}}>Add Claim</Button>
        <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
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
                       <TableCell align="right"> <a href={data.file ? "http://localhost:8000/" + data.file : ""}>{data.file ? "Detay" : "-"}</a> </TableCell>
                     </TableRow>
            ) : <></>}

            {isLoaded === true ? records.map((data) =>
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
                  <TableCell align="right"> <a href={data.file ? "http://localhost:8000/" + data.file : ""}>{data.file ? "Detay" : "-"}</a> </TableCell>
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
        <Box sx={{ ...style, width: 300 }}>
          <Formik  initialValues={{
            pet: "",
            description:"",
            file: null,
          }} onSubmit={(values) => addClaim(values)}>
            <Form>
              <h2 id="child-modal-title">Talep Aç</h2>
              <span className="form-span">Hangi hayvanınız için bu operasyonu yapmak istiyorsunuz?
                   </span>
              <Select
                  onChange={(e) => handleChange(e, setAnimalID)}
                  className="form-control"
                  type="number"
                  name="pet"
                  autoComplete="current-text"
              >
                 {isLoaded2 === true ? petsOfUser.map((e) =>
                       <MenuItem value={e.id}>{e.name}</MenuItem>
                   ) : <></>
                   }
                  </Select>
              <span className="form-span">Talebinizi kısaca açıklar mısınız?</span>
              <Input
                  onChange={(e) => handleChange(e, setDescription)}
                  className="form-control"
                  type="text"
                  name="description"
                  autoComplete="current-text"
              />
              <span className="form-span">Yetkili kurumdan alınmış faturalarınızı aşağıdan yükleyebilirsiniz.</span>
              <Input type="file" onChange={(e) => handleFileChange(e, setFilePath)}/>
              <div>
                <Button  type="submit" variant="contained"   color="success">Kaydet</Button>
                <Button  variant="contained"  onClick={handleClose} style={{marginLeft: "2rem"}}>Kapat</Button>
              </div>
            </Form>
          </Formik>
        </Box>
      </Modal>
      <Modal
          open={openSecond}
          onClose={handleCloseSecond}
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