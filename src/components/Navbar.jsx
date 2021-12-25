import React from 'react';
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink,
} from './NavbarElements';
  
const Navbar = () => {
  return (
    <>
      <Nav>
        <Bars />
  
        <NavMenu>
          <NavLink to='/offers' activeStyle>
            Teklifler
          </NavLink>
          <NavLink to='/policies' activeStyle>
            Sigorta Politikalım
          </NavLink>
          <NavLink to='/add-pet' activeStyle>
            Evcil Hayvan Ekle
          </NavLink>
          <NavLink to='/askida-sigorta' activeStyle>
            Askıda Sigorta
          </NavLink>
          <NavLink to='/veterinaries' activeStyle>
            Veterinerler
          </NavLink>
          <NavLink to='/red-alert-corner' activeStyle>
            Kırmızı Alarm Köşesi
          </NavLink>
          <NavLink to='/sign-up' activeStyle>
            Sign Up
          </NavLink>
          {/* Second Nav */}
          {/* <NavBtnLink to='/sign-in'>Sign In</NavBtnLink> */}
        </NavMenu>
        <NavBtn>
          <NavBtnLink to='/signin'>Sign In</NavBtnLink>
        </NavBtn>
      </Nav>
    </>
  );
};
  
export default Navbar;