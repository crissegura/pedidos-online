import { createContext , useState } from "react";

export const CartContext = createContext({})

const {Provider} = CartContext

export const CartProvider = ({defaultValue = [], children }) => {

    const [cart, setCart] = useState(defaultValue);
    const [cliente, setCliente] = useState([]);

    const clearCart = () =>{
        setCart([])
    }

    const borrarProducto = ( id ) => {
        const newCart = [...cart].filter(elemento=> elemento.id !== id)
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
        let total = 0
        cart.forEach((element)=>{
            total = total + 1
        })
        return total;
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
        isInCart
    }

    return  (
        <Provider value={context}>
            {children}
        </Provider>
    )
}