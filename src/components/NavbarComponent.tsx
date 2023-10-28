import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ContainerNavbar } from '../styles/styled';
import Button from '@mui/material/Button';
import img from './gifs/image_processing20191010-8437-1c0migc.gif';

const NavbarComponent = () => {
  let location = useLocation();
  let pathname = location.pathname;
  const [thisPage, setThisPage] = useState(true);

  useEffect(() => {
    if(pathname === '/home'){
      setThisPage(true)
    }
    else{
      setThisPage(false)
    }
  },[pathname])


  return (
    <ContainerNavbar>
      <img src={img} width='70vmin' />
      <div>
        <Link to="/home">
          <Button
            style={{
              backgroundColor: "#DDDDDD",
              color: "#001f3f",
              fontSize: thisPage ? '0.8rem' : '0.6rem'
              
            }}
            size="small" variant="contained">
            Hezi
          </Button>
        </Link>
        <Link to="/favorites">
          <Button
            size="small" style={{
              fontSize: !thisPage ? '0.8rem' : '0.6rem',
              backgroundColor: "#DDDDDD",
              color: "#001f3f",
              marginLeft: "1rem"
              
            }} variant="contained">
            Favorites
          </Button>
        </Link>
      </div>
    </ContainerNavbar>
  );
};

export default NavbarComponent;

