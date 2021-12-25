import LoginPage from './components/LoginPage';
import { BrowserRouter as Router, Routes, 
  Route, Navigate,} from "react-router-dom";
import { ClaimsPage } from './components/ClaimsPage';

function App() {
  return (
      <Router>
        <Routes>
          {/* This route is for home component 
          with exact path "/", in component props 
          we passes the imported component*/}
          <Route path="/" element={<LoginPage/>} />
            
          {/* This route is for about component 
          with exact path "/about", in component 
          props we passes the imported component*/}
          <Route path="/dashboard" element={<ClaimsPage/>} />
         
        </Routes>
      </Router>
   
  );
}

export default App;
