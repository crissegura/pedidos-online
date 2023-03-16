import { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import {useNavigate} from 'react-router-dom';
import { CartContext } from './cartcontext';
import Carrito from './media/carrito.png'


function Header() {

  const navigation = useNavigate()

  const {getTotalProductos} = useContext(CartContext);


  return (
    <>
      <Navbar className='Navbar' variant="dark">
        <Container>
          <div className='headerContenido'>
            <h4 onClick={()=>navigation('/')} className='nombreLugarHeader'>
                Pizza-onLine
            </h4>
            <div style={{color:'white'}}>
              {getTotalProductos()} <img onClick={()=>navigation('/carrito')} className='imgCarrito' src={Carrito} alt="" />
            </div>
          </div>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;

