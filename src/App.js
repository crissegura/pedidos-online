import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Carrito from './componentes/carrito';
import Header from './componentes/header';
import Inicio from './componentes/inicio';
import MostrarProductos from './componentes/mostrarproductos';
import Subir from './componentes/subirproducto';
import {CartProvider} from './componentes/cartcontext';
import ConfirmarPedido from './componentes/confirmarpedido';
import TerminarPedido from './componentes/terminarpedido';


function App() {

  return (
    <div className="App">
       <CartProvider>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path='/' element={<Inicio />} />
            <Route path='/subir' element={<Subir />} />
            <Route path='/productos/:categoria' element={<MostrarProductos />} />
            <Route path='/carrito' element={<Carrito />} />
            <Route path='/confirmarpedido' element={<ConfirmarPedido />} />
            <Route path='/terminarpedido/:id' element={<TerminarPedido />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </div>
  );
}

export default App;
