import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
const pages = ['Teklifler', 'Sigorta Politikalarim', 'Evcil Hayvan Ekle', 'Askıda Sigorta Satın Alma', "Veterinerler", "Askıda Sigorta Raporları"];
const links = ['offers', 'policies', 'add-pet', 'askida-sigorta', 'veterinaries', "askida-sigorta-reports"]
const settings = ['Profile'];

const ResponsiveAppBar = ({userName, logout}) => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigate = useNavigate();
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const [anchorElNavSecond, setAnchorElNavSecond] = React.useState(null);
  const [anchorElUserSecond, setAnchorElUserSecond] = React.useState(null);

  const handleOpenNavMenuSecond = (event) => {
    setAnchorElNavSecond(event.currentTarget);
  };
  const handleOpenUserMenuSecond = (event) => {
    setAnchorElUserSecond(event.currentTarget);
  };

  const handleCloseNavMenuSecond = () => {
    setAnchorElNavSecond(null);
  };

  const handleCloseUserMenuSecond = () => {
    setAnchorElUserSecond(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            style={{padding: "1rem"}}
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
          >
              <img src="https://customerssizeandme.s3.eu-central-1.amazonaws.com/anadolulogo.svg" width="150px" alt="anadoluSigortaLogo" onClick={() => navigate("/dashboard")} />
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page, index) => (
                  <Link to={`/` + links[index]} style={{textDecoration: "none"}}>
                <MenuItem key={page} onClick={handleCloseNavMenu} >
                  <Typography textAlign="center" style={{textTransform: "capitalize", fontWeight: 700}}>{page}</Typography>
                </MenuItem>
                </Link>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
          >
            <img  src="https://customerssizeandme.s3.eu-central-1.amazonaws.com/anadolulogo.svg" width="250px" alt="anadoluSigortaLogo" />
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page, index) => (
                <Link  to={`/` + links[index]} style={{textDecoration: "none"}}>
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block', textTransform: "capitalize", fontWeight: 700 }}
              >
                {page}
              </Button>
              </Link>
            ))}
              <Box sx={{ flexGrow: 0 }}>
       
              <IconButton onClick={handleOpenUserMenuSecond} sx={{ p: 0 }}>
              <Button
                key={"redAlertCorner"}
                onClick={handleCloseNavMenuSecond}
                sx={{ my: 2, color: 'white', display: 'block', textTransform: "capitalize", fontWeight: 700 }}
              >
                Kırmızı Alarm Köşesi
              </Button>
              </IconButton>
          
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUserSecond}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUserSecond)}
              onClose={handleCloseUserMenuSecond}
            >
            <Link  to="/red-alert-corner-hotels" style={{textDecoration: "none"}} onClick={() => handleCloseUserMenuSecond()}>
            <MenuItem key={"otels"}>
                
                  <Typography textAlign="center" style={{textDecoration: "none", color: "black"}}>Oteller</Typography>
               
                </MenuItem>
                </Link>
                
                <Link  to="/red-alert-corner-walkers" style={{textDecoration: "none"}}  onClick={() => handleCloseUserMenuSecond()}>
                <MenuItem key={"walkers"} onClick={() => {
             
            }}>
                  <Typography textAlign="center" style={{textDecoration: "none", color: "black"}}>Walkerlar</Typography>
                 
                </MenuItem>
                </Link>
            </Menu>
          </Box>
          </Box>
          
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}

            <MenuItem key={"logout"} onClick={ () => {
                logout();
                handleCloseNavMenu()
            }}>
                  <Typography textAlign="center">Çıkış yap</Typography>
                </MenuItem>
            </Menu>
          </Box>    
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;