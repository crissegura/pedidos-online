import { useContext, useState } from 'react';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import { CartContext } from './cartcontext';

const ConfirmarPedido = ( ) => {

    const navigation = useNavigate()

    const {cliente} = useContext(CartContext)

    const [nombre, setNombre] = useState()
    const [direccion, setDireccion] = useState()
    const [numero, setNumero] = useState()

    const getNombre = ( e ) => {
        setNombre(e.target.value)
    }
    const getDireccion = ( e ) => {
        setDireccion(e.target.value)
    }
    const getNumero = ( e ) => {
        setNumero(e.target.value)
    }

    let generarId = new Date()
    
    const continuar = ( e ) => {
        e.preventDefault()
        const avanzar = ( ) => {
            cliente.push({id:generarId, nombre: nombre, direccion: direccion+' N°'+numero})
            navigation(`/terminarpedido/${generarId}`)
        }
        nombre===undefined|direccion===undefined|numero===undefined?
            alert('Por favor completa todos los campos.')
        :
            avanzar()
    }

    return(
        <div className="p-3">
            <Form>
                <Form.Group className="mb-3" >
                    <Form.Label>Nombre y apellido</Form.Label>
                    <Form.Control   type="text" placeholder="Lionel Messi" onChange={getNombre}   />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Dirección</Form.Label>
                    <Form.Control type="text" placeholder="Calle" onChange={getDireccion}  />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Número</Form.Label>
                    <Form.Control  type="text" placeholder="1234" onChange={getNumero} />
                </Form.Group>
                
                <button className="btnPedir" type="submit" onClick={continuar}>
                    Continuar
                </button>
            </Form>
        </div>
    )

}

export default ConfirmarPedido;