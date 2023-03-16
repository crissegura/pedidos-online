import { useContext } from "react"
import { CartContext } from "./cartcontext";
import {useNavigate} from 'react-router-dom'

const TerminarPedido = ( ) => {

    const navigation = useNavigate()

    const {cliente,cart, getTotal, borrarCliente} = useContext(CartContext)
    
    let ncliente = cliente[0].nombre
    let dcliente = cliente[0].direccion

    

    const gustosEmp = []

    cart.map((pedido)=>{
        pedido.gustos.map((gusto)=>{
            gusto.cantidad>0?
                gustosEmp.push(gusto.gusto+' X'+gusto.cantidad+'  ')
            :
                <></>
        })
    })

    //let agregarespacios =  gustosEmp.replace(/,/g,' ')


    const Pedido = ( ) => {
        return cart.map((pedido)=>{
            return `${pedido.nombre} x${pedido.cantidad}%0A`
        })
    }

    const inicio = ( ) => {
        window.location.href = '/'
    }


    const texto = `https://api.whatsapp.com/send?phone=541150622071&text=*Nuevo%20pedido*%0ACliente%3A%20${ncliente}%0ADirección:%20${dcliente}%0A*Pedido%3A*%0A${Pedido()}Gustos%20de%20empanadas:%0A${gustosEmp}%0A*Total:%20$${getTotal()}*`
    
    let sincoma =  texto.replace(/,/g,'')

    

    const finalizar = ( ) => {
        window.open(sincoma)
        setTimeout(inicio,2500)
    }

    const volverAConfirmar = ( ) => {
        borrarCliente()
        navigation('/confirmarpedido')
    }
    

    return(
        <div className="divTerminarPedido">
            <button className="btnPedir cats" onClick={volverAConfirmar}>
                ❰
            </button>
            <h5 style={{marginTop:'1rem'}}>Cliente: {ncliente}</h5>
            <h5>Dirección: {dcliente}</h5>
            <h5>Total ${getTotal()}</h5>
            <h5>Pedido:</h5>
            {
                cart.map((npedido)=>{
                    return <div key={npedido.id}>
                        <h6 className="h6Pedido">{npedido.nombre} x{npedido.cantidad}</h6>
                        <div className="get">
                            
                            {
                                npedido.gustos.map((gusto)=>{
                                    return gusto.cantidad>0?
                                        <div className="mostrarGustosTerminar">
                                        <p className="mx-2">-{gusto.gusto} x{gusto.cantidad}</p>
                                        </div>
                                    :   
                                        <p></p>
                                })
                            }
                            
                        </div>
                    </div>
                })
            }
            <button className="btnPedir" onClick={finalizar}>
                Finalizar pedido
            </button>
        </div>
    )

}

export default TerminarPedido;