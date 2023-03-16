import Pizzas from './media/pizzas.avif'
import Empanadas from './media/empanadas.jpg'
import Postre from './media/postre.jpg'
import Bebidas from './media/bebidas.jpg'
import Carrito from './media/carrito.jpg'
import { useNavigate } from 'react-router-dom'

const Inicio = ( ) => {

    const navigation = useNavigate()
    
    return(
        <div className="inicio">
            <div className="cardInicio" onClick={()=>navigation('/productos/pizzas')}>
                <h3 className='tituloInicioCards'>PIZZAS</h3>
                <img  className='imgInicioCard' src={Pizzas} alt="" />
            </div>
            <div className="cardInicio" onClick={()=>navigation('/productos/empanadas')}>
                <h3 className='tituloInicioCards'>EMPANADAS</h3>
                <img  className='imgInicioCard' src={Empanadas} alt="" />
            </div>
            <div className="cardInicio" onClick={()=>navigation('/productos/bebidas')}>
                <h3 className='tituloInicioCards'>BEBIDAS</h3>
                <img  className='imgInicioCard' src={Bebidas} alt="" />
            </div>
            <div className="cardInicio" onClick={()=>navigation('/productos/postres')}>
                <h3 className='tituloInicioCards'>POSTRES</h3>
                <img  className='imgInicioCard' src={Postre} alt="" />
            </div>
            <div className="cardInicio" onClick={()=>navigation('/carrito')} >
                <h3 className='tituloInicioCards'>MI PEDIDO</h3>
                <img  className='imgInicioCard' src={Carrito} alt="" />
            </div>
        </div>
    )

}

export default Inicio;