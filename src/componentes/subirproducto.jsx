import { useState } from "react";
import { Button, Form } from "react-bootstrap";

const Subir = ( ) => {

    const [nombre, setNombre] = useState([])
    const [descripcion, setDescripcion] = useState([])
    const [categoria, setCategoria] = useState([])
    const [precio, setPrecio] = useState([])
    const [stock, setStock] = useState([])
    const [file, setFile] = useState(null)

    const getNombre = ( e ) =>{
        setNombre(e.target.value)
    }
    const getDescripcion = ( e ) =>{
        setDescripcion(e.target.value)
    }
    const getCategoria = ( e ) =>{
        setCategoria(e.target.value)
    }
    const getPrecio = ( e ) =>{
        setPrecio(e.target.value)
    }
    const getStock = ( e ) =>{
        setStock(e.target.value)
    }
    const getFile = ( e ) => {
        setFile(e.target.files[0])
    }

    const enviar = ( e ) => {
        e.preventDefault()
        //hago una validación
        if(!nombre||!file){
          alert('Por favor, intenta nuevamente completando todos los campos.')
          return
        }
        //formateo el archivo
        const formdata = new FormData()
        formdata.append('nombre',nombre)
        formdata.append('descripcion',descripcion)
        formdata.append('categoria',categoria)
        formdata.append('precio',precio)
        formdata.append('stock',stock)
        formdata.append('image',file)
        //enviar el archivo
        fetch('http://localhost:6500/post/comidas',{
            method:'POST',
            body:formdata
        })
         .then(res => res.text())
         .then(res => console.log('RES ',res))
        console.log(nombre);
        console.log(descripcion);
        console.log(categoria);
        console.log(precio);
        console.log(stock);
        console.log(formdata);
        //hay que volver el estado a NULL
        setFile(null)
        //poner vacio el input
        document.getElementById('foto').value = null
        document.getElementById('nombre').value = ''
        document.getElementById('categoria').value = ''
        document.getElementById('precio').value = ''
        document.getElementById('stock').value = ''
        document.getElementById('descripcion').value = ''
      }

    return(
        <div style={{display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column',textAlign:'center'}}> 
            <h3>
                Subir 
            </h3>
            <form style={{width:'25rem'}} >
                <Form.Label>Seleccioná una foto</Form.Label>
                <Form.Control type="file" onChange={getFile} id="foto" />
                <br />
                <Form.Label>Nombre</Form.Label>
                <Form.Control type="text" placeholder="nombre" id="nombre" onChange={getNombre}/>
                <br />
                <Form.Label>Descripcion</Form.Label>
                <Form.Control type="text" placeholder="descripcion" id="descripcion" onChange={getDescripcion}/>
                <br />
                <Form.Label>Categoria</Form.Label>
                <Form.Control type="text" placeholder="categoria" id="categoria" onChange={getCategoria}/>
                <br />
                <Form.Label>Precio</Form.Label>
                <Form.Control type="text" placeholder="precio" id="precio" onChange={getPrecio}/>
                <br />
                <Form.Label>Stock</Form.Label>
                <Form.Control type="number" placeholder="stock" id="stock" onChange={getStock}/>
                <br />
                
                <Button type="submit" onClick={enviar}>
                    Subir
                </Button>
            </form>
        </div>
    )
}

export default Subir;