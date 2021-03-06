import * as React from "react"
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Button, Box, TextField } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { CardActionArea, CardActions, Radio, FormControl, FormControlLabel, FormLabel, RadioGroup, TextareaAutosize } from '@mui/material';
import { owner, veterinary } from "../constants"
import { makeGetRequest } from "../util";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ClaimsTable from "./ClaimsTable";
import ReactDOM from 'react-dom';
import NewNavBar from "./NewNavBar";

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
  let [type, setAnimalType] = React.useState("initial");
  
  let [gender, setGender] = React.useState("male");
  let [breed, setBreed] = React.useState("breed");
  let [age, setAge] = React.useState(0)
  let [isAdopted, setIsAdopted] = React.useState(false)
  let [yearsSinceAdpoted, setYearsSinceAdopted] = React.useState(1)
  let [redAlertsIncluded, setRedAlertsIncluded] = React.useState(false)
  let [chronicalIllnesses, setChronicalIllnesses] = React.useState(" ")
  let [loading, setLoading] = React.useState(false)
  const [open, setOpen] = React.useState(false);
  const handleOpen = (e) => {
    setAnimalType(e.target.value)
    setOpen(true)
  }  ;
  const handleClose = () => setOpen(false);

  function handleChange(e, func){
    func(e.target.value);
  }

  function handleSubmit(){
    toast("Tahmini sigorta paketiniz az sonra ekranda g??r??necektir. L??tfen ekrandan ayr??lmay??n...")
    setTimeout(() => {
      const yazi = React.createElement('h5', {}, 'Verdi??iniz bilgilere g??re ayl??k tahmini 200 TL sigorta ??creti ??deyecesiniz. Sigorta kapsam??n?? g??rmek i??in');
      const link = React.createElement('a', {href: "https://pumpkin-assets.s3.amazonaws.com/pdfs/Sample_Policy_AccidentIllness.pdf"}, " t??klay??n??z")
      const buttonToContact = React.createElement("button", {href: "tel:+1800229933"}, "??leti??im")
      const buttonToShare = React.createElement("button", {href: "tel:+1800229933"}, "Teklifi Payla??")
      
      const br = React.createElement("br")
      const container = React.createElement('div', {}, [yazi, link, br, buttonToContact, buttonToShare]);
      
      ReactDOM.render(
        container,
        document.getElementById('offerBox')
      );
    }, 2000);
   
  }

  function handleSelectChange(e, func){
    func(e);
  }


  return (
   <div>
     <NewNavBar/>
     <h1 style={{textAlign: "center"}}>Hayvan dostunuzun t??r??n?? se??in:</h1>
     <Card value="dog" style={{float: "left", padding: 50}} sx={{ maxWidth: 345 }}>
      <CardActionArea onClick={handleOpen}>
        <CardMedia
          component="img"
          height="140"
          image="/dogs.jpg"
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            K??pek
          </Typography>
          <Typography variant="body2" color="text.secondary">
            
          </Typography>
        </CardContent>
      </CardActionArea>
     
    </Card>
    <Card value="cat" onClick={handleOpen} style={{float: "left", padding: 50}} sx={{ maxWidth: 345 }}>
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
    <Card value="other" onClick={handleOpen} style={{float: "left", padding: 50}} sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image="/others.jpg"
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Di??er
          </Typography>
          <Typography variant="body2" color="text.secondary">
            
          </Typography>
        </CardContent>
      </CardActionArea>
    
    </Card>
    <Modal
        style = {{overflowY: "auto"}}
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <div id="offerBox">
      <FormControl component="fieldset">
      <FormLabel component="legend">Cinsiyet</FormLabel>
      <RadioGroup onChange={(e) => handleChange(e, setGender)} row aria-label="gender" name="row-radio-buttons-group">
        <FormControlLabel value="female" control={<Radio />} label="Female" />
        <FormControlLabel value="male" control={<Radio />} label="Male" />
  
      </RadioGroup>
      <FormLabel component="legend">Cins</FormLabel>
      <TextField
              onChange={(e) => handleChange(e, setBreed)}
              required
              style={{float: "left"}}
              id="outlined-required"
              label="Required"
              placeholder="King Charles Superior"
            />
      <FormLabel component="legend">Age</FormLabel>
      <TextField
              required
              onChange={(e) => handleChange(e, setAge)}
              style={{float: "left"}}
              id="outlined-required"
              label="Required"
            />
       <FormLabel component="legend">Sahiplenildi mi?</FormLabel>
      <RadioGroup onChange={(e) => handleChange(e, setIsAdopted)} row aria-label="gender" name="row-radio-buttons-group">
        <FormControlLabel value="yes" control={<Radio />} label="Evet" />
        <FormControlLabel value="no" control={<Radio />} label="Hay??r" />
    
      </RadioGroup>
      <FormLabel component="legend">E??er sahiplenildiyse ka?? y??ld??r sizinle?</FormLabel>
      <TextField
              onChange={(e) => handleChange(e, setYearsSinceAdopted)}
              required
              style={{float: "left"}}
              id="outlined-required"
            />
     
      <FormLabel component="legend">Sigortan??z??n k??rm??z?? alarmlar?? da kapsamas??n?? ister misiniz?</FormLabel>
      <RadioGroup onChange={(e) => handleChange(e, setRedAlertsIncluded)} row aria-label="gender" name="row-radio-buttons-group">
        <FormControlLabel value="yes" control={<Radio />} label="Evet" />
        <FormControlLabel value="no" control={<Radio />} label="Hay??r" />
      
      </RadioGroup>

      <FormLabel component="legend">Kronik hastal??klar?? varsa listeyelebilir misiniz?</FormLabel>
      <TextareaAutosize
      onChange={(e) => handleChange(e, setChronicalIllnesses)}
      aria-label="empty textarea"
      placeholder="Empty"
      style={{ width: 200 }}
    />

      <LoadingButton
        onClick={handleSubmit}
        loading={loading}
        loadingPosition="end"
        variant="contained"
      >
        Send
      </LoadingButton>
    </FormControl>
        
        
      </div>
      </Box>
        </Box>
      </Modal>
      <ToastContainer/>
   </div>
  )
}

