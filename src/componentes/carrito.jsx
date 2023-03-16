import { Button } from "react-bootstrap";
import { useContext } from "react";
import { CartContext } from "./cartcontext";
import Delete from './media/delete.png'
import { useNavigate } from "react-router-dom";

const Carrito = ( ) => {

    const navigation = useNavigate()

    const {cart,clearCart,borrarProducto, getTotal} = useContext(CartContext);


    return(
        
            cart.length>0?
                <div className="carrito">
                    <div className="totalPedir">
                    <h3>Total: ${getTotal()}</h3>
                    <button className="btnConfirmar" onClick={()=>navigation('/confirmarpedido')}>
                        Confirmar
                    </button>
                    </div>
                {
                    cart.map((producto)=>{
                        return <div className="cardCarrito" key={producto.nombre}>
                        <h3>{producto.nombre}</h3>
                        <div style={{display:'flex',alignItems:'baseline',justifyContent:'space-evenly'}}>
                            <p >Cantidad: {producto.cantidad}</p>
                            <p className="mx-3" >Precio: {producto.precio*producto.cantidad}</p>
                            <button className="btnDelete" onClick={()=>borrarProducto(producto.id)}>
                                <img 
                                    className="iconDelete"
                                    src={Delete} 
                                    alt="" 
                                />
                            </button>
                        </div>
                        </div>
                    })
                
                }
                <div style={{textAlign:'center'}}>
                    <button className="btnPedir" onClick={clearCart}>
                        Cancelar pedido
                    </button>
                </div>
            </div>
        :
        <div style={{textAlign:'center',margin:'2rem'}}>
            <h3>Tu pedido está vacio</h3>
            <button className="btnPedir" onClick={()=>navigation('/')}>
                Comenzar pedido
            </button>
        </div>

    )

}

export default Carrito;