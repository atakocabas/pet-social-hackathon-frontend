import * as React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Card, Button, Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { DataGrid } from '@mui/x-data-grid';
import { useDemoData } from '@mui/x-data-grid-generator';
import ResponsiveAppBar from './NewNavBar';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import { Formik, Form, Field } from 'formik';
import './customCss.css'
import Footer from './footer';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};



const tableHead  = ['Isim', 'Yaş', 'Tip', 'Cins',  'Kronik Hastalık', "Aşı Durumu", 'Sigorta Durumu' ," ", " "]
export default function ClaimsTable({user}) {
    const [isLoaded, setLoaded] = useState(false);
    const [data, setData] = useState([]);
    const [open, setOpen] = useState(false);
    const [openSecond, setOpenSecond] = useState(false);
    const [openThird, setOpenThird] = useState(false);
    const [currentData, setCurrentData] = useState(false)

    const [notFound, setNotFound] = useState(false);
    const handleClose = () => setOpen(false);
    const handleCloseSecond = () => setOpenSecond(false);
    const handleCloseThird = () => setOpenThird(false);
    ///useEffectleData Al

    const getAnimals = async (userId) => {
        const getData = await axios.get(`pets/get_pets_of_user/?id=${userId}`);
        console.log(getData.data)
        if (getData.data.length === 0) {
            setNotFound(true)
            setLoaded(true)
        }
        else {
            await setData(getData.data)
            setLoaded(true)

        }
       
    };
 
    useEffect(() => {
        getAnimals(1)
      

    }, [])
    const addPet = async (values) => {
        try {
            const addPet = await axios.post("/pets/", values)
            if (addPet.statusText === "Created") {
                alert("Evcil hayvanınız başarıyla eklendi!")
                setData((data) => [...data, addPet.data])
                handleClose()
            } else {
                alert("Hata.")
            }

        } catch (err) {
            console.log(err)

        }
    }
    const deletePet = async (petId) => {
        
        try {
            const deletePet = await axios.delete(`/pets/${petId}`);
            setData((data) => data.filter((data) => data.id !== petId))

        } catch (err) {
            console.log(err)

        }
       
        
        
        //send request
    }
    const editPet = async (pet) => {
        console.log(pet)
    }

  return( 
      <div>
        
      <ResponsiveAppBar user={user}/>
      <Container maxWidth="m">
    <div style={{  width: '100%' }}>
    <div style={{ height: 75, width: '100%', display: "flex", alignItems: "center", justifyContent: "end" }}>
        <Button variant="contained" style={{textTransform: "capitalize"}} onClick={() => setOpen(true)}>Evcil Hayvanımı Ekle</Button>
    </div>
        
    <div style={{ display: 'flex', height: '100%' }}>
        
      <div style={{ flexGrow: 1, marginTop: "1rem", marginBottom: "3rem" }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
                {tableHead.map((name) =>   <TableCell align="left">{name}</TableCell>)}
         
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoaded === true ? data.map((data) => 
             <TableRow
             key={data.id}
                       sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                     >
                       <TableCell component="th" scope="row">
                         {data.name}
                       </TableCell>
                       <TableCell align="left">{data.age}</TableCell>
                       <TableCell align="left">{data.type}</TableCell>
                       <TableCell align="left">{data.breed}</TableCell>
                       <TableCell align="left">{data.chronicalIllnesses}</TableCell>
                       <TableCell align="left">{data.vaccineStatus}</TableCell>
                       <TableCell align="left">{data.insurance}</TableCell>
                       <TableCell align="left"><Button variant="contained" style={{textTransform: "capitalize"}} onClick={() => {
                           setCurrentData(data)
                           setOpenThird(true)
                       }}>Değiştir</Button></TableCell>
                       <TableCell align="left"><Button variant="contained" style={{textTransform: "capitalize"}} onClick={() => {
                           setCurrentData(data.id)
                           setOpenSecond(true)
                       }}>Sil</Button></TableCell>
                
                     </TableRow>
            ) : <></>}
            {notFound === false ? "" : <h3 style={{textAlign: "center"}}>Kayıtlı evcil hayvanınız bulanamadı.</h3>}
                    
            
        
  
          </TableBody>
        </Table>
      </TableContainer>
      <div style={{height: "100px"}}></div>
      </div>
    </div>
    </div>
    <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ ...style, width: 300 }}>
            <Formik  initialValues={{
            age: "",
            name:"",
            gender: "",
            breed: "",
            type: "",
            chronicalIllnesses: "",
            vaccineStatus: "",
            insurance:""
        }} onSubmit={(values) => addPet(values)}>
            <Form>
          <h2 id="child-modal-title">Yeni evcil hayvan ekle</h2>
          <span className="form-span">Yaş</span>
          <Field 
                      className="form-control"
                        type="number"
                        name="age"
                        autoComplete="current-text"
                      />
                      <span className="form-span">İsim</span>
                        <Field 
                      className="form-control"
                        type="text"
                        name="name"
                        autoComplete="current-text"
                      />
                      <span className="form-span">Cinsiyet</span>
                        <Field 
                      className="form-control"
                        type="text"
                        name="gender"
                        autoComplete="current-text"
                      />
                      <span className="form-span">Tür</span>
                        <Field 
                      className="form-control"
                        type="text"
                        name="breed"
                        autoComplete="current-text"
                      />
                      <span className="form-span">Tip</span>
                        <Field 
                      className="form-control"
                        type="text"
                        name="type"
                        autoComplete="current-text"
                      />
                      <span className="form-span">Hastalık Durumu</span>
                        <Field 
                      className="form-control"
                        type="text"
                        name="chronicalIllnesses"
                        autoComplete="current-text"
                      />
                      <span className="form-span">Aşı Durumu</span>
                        <Field 
                      className="form-control"
                        type="text"
                        name="vaccineStatus"
                        autoComplete="current-text"
                      />
                      <span className="form-span">Sigorta Durumu</span>
                        <Field 
                      className="form-control"
                        type="text"
                        name="insurance"
                        autoComplete="current-password"
                      />
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
        <Box sx={{ ...style, width: 200 }}>
                <p>Evcil hayvanınızı silmek istediğinize emin misiniz?</p>
                <Button variant="contained"   color="error" onClick={() => {
                    deletePet(currentData)
                    handleCloseSecond()
                }
                    }>Evet</Button>
          <Button variant="contained"  style={{marginLeft: "1rem"}} onClick={handleCloseSecond}>Kapat</Button>
        </Box>
      </Modal>
      <Modal
        open={openThird}
        onClose={handleCloseThird}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ ...style, width: 400 }}>
                <h4 style={{fontSize: "2rem", textAlign: "center"}}>{currentData.name} isimli evcil hayvanınız</h4>
                <Formik 
                initialValues={{
                    age: "",
                    name:"",
                    gender: "",
                    breed: "",
                    type: "",
                    chronicalIllnesses: "",
                    vaccineStatus: "",
                    insurance:""
                }}
                
                onSubmit={(values) => console.log(values)}>
                    <Form>
                    <span className="form-span">Yaş</span>
                    <Field 
                      className="form-control"
                        type="number"
                        name="age"
                        placeholder={currentData.age}
                        autoComplete="current-text"
                      />
                      <span className="form-span">İsim</span>
                        <Field 
                      className="form-control"
                        type="text"
                        name="name"
                        placeholder={currentData.name}
                        autoComplete="current-text"
                      />
                      <span className="form-span">Cinsiyet</span>
                        <Field 
                      className="form-control"
                        type="text"
                        name="gender"
                        placeholder={currentData.gender}
                        autoComplete="current-text"
                      />
                      <span className="form-span">Tür</span>
                        <Field 
                      className="form-control"
                        type="text"
                        name="breed"
                        placeholder={currentData.breed}
                        autoComplete="current-text"
                      />
                      <span className="form-span">Tip</span>
                        <Field 
                      className="form-control"
                        type="text"
                        name="type"
                        placeholder={currentData.type}
                        autoComplete="current-text"
                      />
                      <span className="form-span">Hastalık Durumu</span>
                        <Field 
                      className="form-control"
                        type="text"
                        name="ilness"
                        autoComplete="current-text"
                        placeholder={currentData.chronicalIllnesses}
                      />
                      <span className="form-span">Aşı Durumu</span>
                        <Field 
                      className="form-control"
                        type="text"
                        name="vaccineStatus"
                        autoComplete="current-text"
                        placeholder={currentData.vaccineStatus}
                      />
                      <span className="form-span">Sigorta Durumu</span>
                        <Field 
                      className="form-control"
                        type="text"
                        name="insurance"
                        autoComplete="current-password"
                        placeholder={currentData.insurance}
                      />

                    </Form>
                </Formik>
          
                <div style={{marginTop: "1rem"}}>
                <Button variant="contained"   color="success" onClick={() => {
                   editPet(currentData)
                    handleCloseThird()
                }
                    }>Değiştir</Button>
          <Button variant="contained"  style={{marginLeft: "1rem"}} onClick={handleCloseThird}>Kapat</Button>
          </div>
        </Box>
      </Modal>
  
    </Container>
    <Footer />
  
  
  </div>
    );
}
