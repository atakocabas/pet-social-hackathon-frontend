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
import Footer from './footer';


const mockData = [{"avatar":"http://dummyimage.com/143x100.png/ff4444/ffffff","first_name":"Jennie","last_name":"Strutt","rate":1,"big_image":"http://dummyimage.com/112x100.png/5fa2dd/ffffff","background":"Extirpation of Matter from Right Vocal Cord, Perc Approach","date":"5/20/2021"},
{"avatar":"http://dummyimage.com/134x100.png/5fa2dd/ffffff","first_name":"Janeta","last_name":"Goforth","rate":2,"big_image":"http://dummyimage.com/230x100.png/cc0000/ffffff","background":"Inspection of Right Metatarsal-Tarsal Joint, Perc Approach","date":"12/14/2021"},
{"avatar":"http://dummyimage.com/248x100.png/dddddd/000000","first_name":"Anastasie","last_name":"Kahn","rate":3,"big_image":"http://dummyimage.com/205x100.png/dddddd/000000","background":"Excision of Cerebellum, Open Approach, Diagnostic","date":"2/25/2021"},
{"avatar":"http://dummyimage.com/250x100.png/cc0000/ffffff","first_name":"Derrek","last_name":"Bullant","rate":4,"big_image":"http://dummyimage.com/195x100.png/cc0000/ffffff","background":"Fusion Lumsac Jt w Intbd Fus Dev, Post Appr A Col, Open","date":"12/5/2021"},
{"avatar":"http://dummyimage.com/188x100.png/cc0000/ffffff","first_name":"Marc","last_name":"Ledstone","rate":5,"big_image":"http://dummyimage.com/226x100.png/cc0000/ffffff","background":"Drainage of Sigmoid Colon with Drainage Device, Endo","date":"5/13/2021"},
{"avatar":"http://dummyimage.com/160x100.png/ff4444/ffffff","first_name":"Adela","last_name":"Fanshawe","rate":6,"big_image":"http://dummyimage.com/104x100.png/5fa2dd/ffffff","background":"Dilate R Ext Iliac Art, Bifurc, w 4 Drug-elut, Perc","date":"7/13/2021"},
{"avatar":"http://dummyimage.com/235x100.png/ff4444/ffffff","first_name":"Lizzy","last_name":"Hirsthouse","rate":7,"big_image":"http://dummyimage.com/249x100.png/cc0000/ffffff","background":"CT Scan Port/Splanch Vein w Oth Contrast, Unenh, Enhance","date":"5/4/2021"},
{"avatar":"http://dummyimage.com/128x100.png/5fa2dd/ffffff","first_name":"Ives","last_name":"Feronet","rate":8,"big_image":"http://dummyimage.com/207x100.png/5fa2dd/ffffff","background":"Insert Infusion Dev in Epididymis/Sperm Cord, Via Opening","date":"2/14/2021"},
{"avatar":"http://dummyimage.com/101x100.png/ff4444/ffffff","first_name":"Imelda","last_name":"Haibel","rate":9,"big_image":"http://dummyimage.com/128x100.png/ff4444/ffffff","background":"Removal of Extraluminal Device from Heart, Open Approach","date":"4/5/2021"},
{"avatar":"http://dummyimage.com/179x100.png/5fa2dd/ffffff","first_name":"Caressa","last_name":"Gallgher","rate":10,"big_image":"http://dummyimage.com/244x100.png/5fa2dd/ffffff","background":"Occlusion of Gastric Vein with Intralum Dev, Open Approach","date":"5/29/2021"}]
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


const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));
const fakeInfo  = ['']


export default function RedAlarm({user}) {
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
                alert("Evcil hayvan??n??z ba??ar??yla eklendi!")
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
            const deletePet = await axios.delete("/pets/");
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

    <div style={{ display: 'flex', height: '100%' }}>
      <div style={{ flexGrow: 1, marginTop: "1rem", marginBottom: "3rem", marginLeft: "2.5rem", gridTemplateColumns: "repeat(4, 1fr)", display: "grid", gridRowGap: "2rem", justifyContent: "center" }}>
      {mockData.map((data) => <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={data.first_name + " " + data.last_name}
        subheader={data.date}
      />
      <CardMedia
        component="img"
        height="300"
        image={data.big_image}
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
         {data.background}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
        <StarIcon />
        </IconButton>
        <IconButton aria-label="add to favorites">
          <StarIcon />
        </IconButton>
        <IconButton aria-label="add to favorites">
          <StarIcon />
        </IconButton>
        <IconButton aria-label="add to favorites">
            <StarHalfIcon />
        </IconButton>
        <IconButton aria-label="add to favorites">
          <StarBorderIcon />
        </IconButton>
       
        <ExpandMore
          aria-label="show more"
        >
          <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        </ExpandMore>
      </CardActions>
    </Card>)}
      <div style={{height: "100px"}}></div>
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
          <span className="form-span">Ya??</span>
          <Field 
                      className="form-control"
                        type="number"
                        name="age"
                        autoComplete="current-text"
                      />
                      <span className="form-span">??sim</span>
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
                      <span className="form-span">T??r</span>
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
                      <span className="form-span">Hastal??k Durumu</span>
                        <Field 
                      className="form-control"
                        type="text"
                        name="chronicalIllnesses"
                        autoComplete="current-text"
                      />
                      <span className="form-span">A???? Durumu</span>
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
                <p>Evcil hayvan??n??z?? silmek istedi??inize emin misiniz?</p>
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
                <h4 style={{fontSize: "2rem", textAlign: "center"}}>{currentData.name} isimli evcil hayvan??n??z</h4>
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
                    <span className="form-span">Ya??</span>
                    <Field 
                      className="form-control"
                        type="number"
                        name="age"
                        placeholder={currentData.age}
                        autoComplete="current-text"
                      />
                      <span className="form-span">??sim</span>
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
                      <span className="form-span">T??r</span>
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
                      <span className="form-span">Hastal??k Durumu</span>
                        <Field 
                      className="form-control"
                        type="text"
                        name="ilness"
                        autoComplete="current-text"
                        placeholder={currentData.chronicalIllnesses}
                      />
                      <span className="form-span">A???? Durumu</span>
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
                    }>De??i??tir</Button>
          <Button variant="contained"  style={{marginLeft: "1rem"}} onClick={handleCloseThird}>Kapat</Button>
          </div>
        </Box>
      </Modal>
      
   
    </Container>
    <Footer />
  
  </div>
    );
}
