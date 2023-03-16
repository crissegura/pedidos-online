import { useContext } from "react"
import { CartContext } from "./cartcontext";

const TerminarPedido = ( ) => {

    const {cliente,cart, getTotal} = useContext(CartContext)
    
    let ncliente = cliente[0].nombre
    let dcliente = cliente[0].direccion

    const Pedido = ( ) => {
        return cart.map((pedido)=>{
            return `${pedido.nombre} x${pedido.cantidad}%0A`
        })
    }

    const inicio = ( ) => {
        window.location.href = '/'
    }


    const texto = `https://api.whatsapp.com/send?phone=541150622071&text=*Nuevo%20pedido*%0ACliente%3A%20${ncliente}%0ADirección:%20${dcliente}%0A*Pedido%3A*%0A${Pedido()}*Total:%20$${getTotal()}*`
    
    let sincoma =  texto.replace(/,/g,'')

    

    const finalizar = ( ) => {
        window.open(sincoma)
        setTimeout(inicio,2500)
    }
    

    return(
        <div className="divTerminarPedido">
            <h5>Cliente: {ncliente}</h5>
            <h5>Dirección: {dcliente}</h5>
            <h5>Total ${getTotal()}</h5>
            <h5>Pedido:</h5>
            {
                cart.map((npedido)=>{
                    return <div key={npedido.id}>
                        <h6 className="h6Pedido">{npedido.nombre} x{npedido.cantidad}</h6>
                    </div>
                })
            }
            <button className="btnPedir" onClick={finalizar}>
                Finalizar
            </button>
        </div>
    )

}

export default TerminarPedido;