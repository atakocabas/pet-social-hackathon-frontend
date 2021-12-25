import LoginPage from './components/LoginPage';
import { useState, useEffect }  from "react"
import { BrowserRouter as Router, Routes, 
  Route, Navigate} from "react-router-dom";
import { ClaimsPage } from './components/ClaimsPage';
import AddPet from './components/addPet';

function App() {
/*   const history = useHistory(); */

  const [user, setUser] = useState(null)
/*   useEffect(() => {
    if (user === null) {
      history.push("/")

    } else {
      console.log("loggedIn")
    }

  }, [user]) */
  return (
      <Router>
        <Routes>
          {/* This route is for home component 
          with exact path "/", in component props 
          we passes the imported component*/}
          <Route path="/addPet" element={<AddPet  user={user}/>} />
          <Route path="/dashboard" element={<ClaimsPage/>} />
          <Route path="/" element={<LoginPage/>} />
            
          {/* This route is for about component 
          with exact path "/about", in component 
          props we passes the imported component*/}
     


        </Routes>
      </Router>
   
  );
}

export default App;
