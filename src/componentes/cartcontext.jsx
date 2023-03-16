import { createContext , useState } from "react";

export const CartContext = createContext({})

const {Provider} = CartContext

export const CartProvider = ({defaultValue = [], children }) => {

    const [cart, setCart] = useState(defaultValue);
    const [cliente, setCliente] = useState([]);

    const clearCart = () =>{
        setCart([])
    }

    const borrarCliente = () =>{
        setCliente([])
    }

    const borrarProducto = ( nombre ) => {
        const newCart = [...cart].filter(elemento=> elemento.nombre !== nombre)
        setCart(newCart)
    }

    const getTotal=()=>{
        let total = 0
        cart.forEach((element)=>{
            total = total + (element.cantidad * element.precio)
        })
        return total;
    }

    const getTotalProductos=()=>{
        let cantidad = 0
        cart.forEach((element)=>{
            cantidad += element.cantidad
        })
        return cantidad;
    }

    const isInCart = (id) =>{
        return cart.find((elemento)=> elemento.id === id)
    }

    const context = {
        cart,
        setCart,
        clearCart,
        borrarProducto,
        getTotal,
        getTotalProductos,
        cliente,
        isInCart,
        borrarCliente
    }

    return  (
        <Provider value={context}>
            {children}
        </Provider>
    )
}