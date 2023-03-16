import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {CartContext} from './cartcontext'
import { productos } from "./productos";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const MostrarProductos = ( ) => {

    const {cart,isInCart} = useContext(CartContext);

    const {categoria} = useParams()

    const navigation = useNavigate()

    let [cantidad, setCantidad] = useState(1)

    const sumarCant = ( ) => {
        setCantidad(cantidad+1)
    }

    const restarCant = ( ) => {
        cantidad===1?setCantidad(1): setCantidad(cantidad-1)
    }

    const filtrarCategoria = productos.filter((cat)=>cat.categoria===categoria)

    const [show, setShow] = useState(false);

    const [nombreProd, setnombreProd] = useState()
    const [precioProd, setPrecioProd] = useState()
    const [descripcionProd, setDescripcionProd] = useState()

    const handleClose = () => setShow(false);
    const handleShow = (producto) => {
        setnombreProd(producto.nombre)
        setPrecioProd(producto.precio)
        setDescripcionProd(producto.descripcion)
        setShow(true);
    }

    const agregarAlCarrito = (nombreProd,precioProd,cantidad) => {
        let ver = cart.find((pedido)=>pedido.nombre===nombreProd)
        ver===undefined?
            cart.push({nombre:nombreProd,precio:precioProd,cantidad:cantidad})
        :
            ver.cantidad = ver.cantidad + cantidad
        navigation('/')
    }

    return(
        <div className="contenedorProductos">

            {
                productos.length!==0?
                    <div>
                        {
                            filtrarCategoria.map((producto)=>{
                                return <div key={producto.id} className="cardMostrarProductos">
                                    <div className="textoCardMostrarProductos">
                                            <h3 className="tituloCard">
                                                {producto.nombre}
                                            </h3>
                                            <p className="my-2 px-2">
                                                {producto.descripcion}
                                            </p>
                                            <p className="px-2">
                                                ${producto.precio}
                                            </p>
                                            <button className="btnPedir" onClick={()=>handleShow(producto)}>Agregar</button>
                                    </div>
                                    <img className="imgCard" 
                                            src={producto.foto} alt={'Imagen producto '+producto.nombre} 
                                        />
                                    </div>
                            })
                        }
                    </div>
                :
                    <div>
                        cargando....
                    </div>
            }

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title style={{fontFamily:'Marko One'}}>Agregar {nombreProd}</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{fontFamily:'Marko One'}}>
                    <p>
                        Descripción: {descripcionProd}
                    </p>
                    <p>
                        ${precioProd}
                    </p>
                    <div className="btnsCantidad">
                        <p>Cantidad: {cantidad}</p>
                        <button className="btnrestar mx-2" onClick={restarCant}>
                            -
                        </button>
                        <button className="btnsumar" onClick={sumarCant}>
                            +
                        </button>
                    </div>
                </Modal.Body>
                <Modal.Footer style={{fontFamily:'Marko One'}}>
                <button className="btnPedir" onClick={()=>agregarAlCarrito(nombreProd,precioProd,cantidad)}>
                    Agregar a mi pedido
                </button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default MostrarProductos;