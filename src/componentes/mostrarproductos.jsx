import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {CartContext} from './cartcontext'
import { productos } from "./productos";
import Modal from 'react-bootstrap/Modal';
import { ToastContainer, toast } from 'react-toastify';

const MostrarProductos = ( ) => {

    const {cart} = useContext(CartContext);

    const {categoria} = useParams()

    const navigation = useNavigate()

    const notify = () => toast.success('¡Producto agregado!', {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
    });

    const masde12 = () => toast.error('Seleccionaste más de 12 empanadas.', {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
    });

    const masde6 = () => toast.error('Seleccionaste más de 6 empanadas.', {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
    });



    let [cantidad, setCantidad] = useState(1)

    let [carne, setCarne] = useState(0)
    let [jyq, setJyq] = useState(0)
    let [pollo, setPollo] = useState(0)
    let [caprese, setCaprese] = useState(0)
    let [humita, setHumita] = useState(0)

    const sumarCant = ( ) => {
        setCantidad(cantidad+1)
    }

    const restarCant = ( ) => {
        cantidad===1?setCantidad(1): setCantidad(cantidad-1)
    }

    const filtrarCategoria = productos.filter((cat)=>cat.categoria===categoria)

    const [show, setShow] = useState(false);
    const [showe, setShowe] = useState(false);

    const [nombreProd, setnombreProd] = useState()
    const [precioProd, setPrecioProd] = useState()
    const [descripcionProd, setDescripcionProd] = useState()

    const handleClose = () => setShow(false);
    const handleShow = (producto) => {
        setnombreProd(producto.nombre)
        setPrecioProd(producto.precio)
        setDescripcionProd(producto.descripcion)

        producto.nombre.toLowerCase().includes('empanada')?
            setShowe(true)
        :
            setShow(true);
    }

    const handleClosee = () => setShowe(false);
    

    const agregarAlCarrito = (nombreProd,precioProd,cantidad) => {

        let ver = cart.find((pedido)=>pedido.nombre===nombreProd)

        const sumarAlPedido = () => {

            let totalEmpanadas = carne+pollo+humita+jyq+caprese

            //nombreProd.toLowerCase().includes('docena') 

            if(nombreProd.toLowerCase().includes('docena')&&totalEmpanadas>12){
                masde12()
            } else if(nombreProd.toLowerCase().includes('media')&&totalEmpanadas>6){
                masde6()
            }else{
                cart.push({nombre:nombreProd,precio:precioProd,cantidad:cantidad,
                    gustos: [{gusto:'Carne',cantidad:carne},{gusto:'JyQ',cantidad:jyq},{gusto:'Pollo',cantidad:pollo},{gusto:'Caprese',cantidad:caprese},{gusto:'Humita',cantidad:humita}]
                })
                handleClose()
                handleClosee()
                navigation(`/productos/${categoria}`)
                notify()
                setCantidad(1)
                setCarne(0)
                setJyq(0)
                setCaprese(0)
                setPollo(0)
                setHumita(0)
            }
        }

        const sumarCantAlPedido = () => {
            ver.cantidad = ver.cantidad + cantidad
            handleClose()
            handleClosee()
            navigation(`/productos/${categoria}`)
            notify()
            setCantidad(1)
            setCarne(0)
            setJyq(0)
            setCaprese(0)
            setPollo(0)
            setHumita(0)  
        }
        ver===undefined?
            sumarAlPedido()
        :
            sumarCantAlPedido()
    }

    return(
        <div className="contenedorProductos">

            <button className="btnPedir" onClick={()=>navigation('/')}>
                ❰
            </button>

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

            {/* MODAL EMPANADAS  */ }
            <Modal show={showe} onHide={handleClosee}>
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
                    <div>
                        <h6 style={{marginTop:'2rem'}}>Seleccionar gustos:</h6>
                        <div className="btnCantEmpanadas">
                            <p>Carne: {carne} </p>
                            <div>
                                <button className="btnrestar mx-2" onClick={()=>carne===0?setCarne(0):setCarne(carne-1)}>
                                    -
                                </button>
                                <button className="btnsumar" onClick={()=>setCarne(carne+1)}>
                                    +
                                </button>
                            </div>
                        </div>
                        <div className="btnCantEmpanadas">
                            <p>JyQ: {jyq}</p>
                            <div>
                                <button className="btnrestar mx-2" onClick={()=>jyq===0?setJyq(0):setJyq(jyq-1)}>
                                    -
                                </button>
                                <button className="btnsumar" onClick={()=>setJyq(jyq+1)}>
                                    +
                                </button>
                            </div>
                        </div>
                        <div className="btnCantEmpanadas">
                            <p>Pollo: {pollo}</p>
                            <div>
                                <button className="btnrestar mx-2" onClick={()=>pollo===0?setPollo(0):setPollo(pollo-1)}>
                                    -
                                </button>
                                <button className="btnsumar" onClick={()=>setPollo(pollo+1)}>
                                    +
                                </button>
                            </div>
                        </div>
                        <div className="btnCantEmpanadas">
                            <p>Caprese: {caprese}</p>
                            <div>
                                <button className="btnrestar mx-2" onClick={()=>caprese===0?setCaprese(0):setCaprese(caprese-1)}>
                                    -
                                </button>
                                <button className="btnsumar" onClick={()=>setCaprese(caprese+1)}>
                                    +
                                </button>
                            </div>
                        </div>
                        <div className="btnCantEmpanadas">
                            <p>Humita: {humita}</p>
                            <div>
                                <button className="btnrestar mx-2" onClick={()=>humita===0?setHumita(0):setHumita(humita-1)}>
                                    -
                                </button>
                                <button className="btnsumar" onClick={()=>setHumita(humita+1)}>
                                    +
                                </button>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer style={{fontFamily:'Marko One'}}>
                <button className="btnPedir" onClick={()=>agregarAlCarrito(nombreProd,precioProd,cantidad)}>
                    Agregar a mi pedido
                </button>
                </Modal.Footer>
            </Modal>
            <ToastContainer />       
        </div>
    )
}

export default MostrarProductos;