import LoginPage from './components/LoginPage';
import { BrowserRouter as Router, Routes, 
  Route, Navigate,} from "react-router-dom";
import { ClaimsPage } from './components/ClaimsPage';
import {OffersPage} from './components/OffersPage';
import AskidaSigorta from './components/AskidaSigorta';
import Checkout from './lib/Checkout';
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
          <Route path="/offers" element={<OffersPage/>} />
          <Route path="/askida-sigorta" element={<AskidaSigorta/>} />
          <Route path="/checkout" element={<Checkout/>} />
        </Routes>
      </Router>
   
  );
}

export default App;
