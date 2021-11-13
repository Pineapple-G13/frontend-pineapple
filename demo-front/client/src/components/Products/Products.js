import React, {useState } from 'react'
/* import axios from "axios"; */
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Products = () => {

    const productos = [
        { id: 1, nombre: "Papa", categoria: "fruta",descripcion:"nose soy una papa",cantidad:244,precio_unitario:20 },
        { id: 2, nombre: "pera", categoria: "fruta",descripcion:"nose soy una pera",cantidad:244,precio_unitario:20 },
        { id: 3, nombre: "manzana", categoria: "fruta",descripcion:"nose soy una manzana",cantidad:244,precio_unitario:20 },
        { id: 4, nombre: "zanahoria", categoria: "fruta",descripcion:"nose soy una zanahoria",cantidad:244,precio_unitario:20 },
        { id: 5, nombre: "ssss", categoria: "fruta",descripcion:"nose soy una sssss",cantidad:244,precio_unitario:20 },
        { id: 6, nombre: "hola", categoria: "fruta",descripcion:"lorem input",cantidad:244,precio_unitario:20 },
        { id: 7, nombre: "Calabaza", categoria: "fruta",descripcion:"dadadsaa",cantidad:244,precio_unitario:20 },
        { id: 8, nombre: "MESA", categoria: "fruta",descripcion:"asdadaaaaaadasdasda",cantidad:244,precio_unitario:20 },
        { id: 9, nombre: "Agua", categoria: "fruta",descripcion:"nose soy una papa",cantidad:244,precio_unitario:20 },
        ];

    const [data, setData] = useState(productos);
    const [modalEditar, setModalEditar] = useState(false);
    const [modalEliminar, setModalEliminar] = useState(false);
    const [modalInsertar, setModalInsertar] = useState(false);

    const [productSeleccionado, setProductSeleccionado] = useState({
        id: '',
        nombre: '',
        categoria: '',
        descripcion:'',
        cantidad:0,
        precio_unitario:0
        });
        
    const seleccionarPais=(elemento, caso)=>{
        setProductSeleccionado(elemento);
        (caso==='Editar')?setModalEditar(true):setModalEliminar(true)
    }
        
    const handleChange=e=>{
        const {name, value}=e.target;
        setProductSeleccionado((prevState)=>({
        ...prevState,
        [name]: value
        }));
    }
        
    const editar=()=>{
        var dataNueva=data;
        // eslint-disable-next-line array-callback-return
        dataNueva.map((prod) =>{
            if(prod.id ===productSeleccionado.id){
                prod.nombre=productSeleccionado.nombre;
                prod.categoria=productSeleccionado.categoria;
                prod.descripcion=productSeleccionado.descripcion;
                prod.cantidad=productSeleccionado.cantidad;
                prod.precio_unitario=productSeleccionado.precio_unitario
            }
        });
        setData(dataNueva);
        setModalEditar(false);
    }
        
          const eliminar =()=>{
            setData(data.filter(prod=>prod.id!==productSeleccionado.id));
            setModalEliminar(false);
          }
        
          const abrirModalInsertar=()=>{
            setProductSeleccionado(null);
            setModalInsertar(true);
          }
        
          const insertar =()=>{
            var valorInsertar=productSeleccionado;
            valorInsertar.id=data[data.length-1].id+1;
            var dataNueva = data;
            dataNueva.push(valorInsertar);
            setData(dataNueva);
            setModalInsertar(false);
          }
        
        return (
            <div className="container">
                <h2>Productos</h2>
                <br />
                <button className="btn btn-success" onClick={()=>abrirModalInsertar()}>New Product</button>
                <br /><br />
                <table className="table table-bordered">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Categoria</th>
                        <th>Descripcion</th>
                        <th>Cantidad</th>
                        <th>Precio Unitario</th>
                        <th>Acciones</th>
                    </tr>
                    </thead>
                    <tbody>
                    {data.map(elemento=>(
                        <tr>
                        <td>{elemento.id}</td>
                        <td>{elemento.nombre}</td>
                        <td>{elemento.categoria}</td>
                        <td>{elemento.descripcion}</td>
                        <td>{elemento.cantidad}</td>
                        <td>{elemento.precio_unitario}</td>
                        <td><button className="btn btn-primary" onClick={()=>seleccionarPais(elemento, 'Editar')}>Editar</button> {"   "} 
                        <button className="btn btn-danger" onClick={()=>seleccionarPais(elemento, 'Eliminar')}>Eliminar</button></td>
                        </tr>
                    ))
                    }
                    </tbody>
                </table>
                <Modal isOpen={modalEditar}>
        <ModalHeader>
          <div>
            <h3>Editar País</h3>
          </div>
        </ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>ID</label>
            <input
              className="form-control"
              readOnly
              type="text"
              name="id"
              value={productSeleccionado && setProductSeleccionado.id}
            />
            <br />

            <label>Nombre</label>
            <input
              className="form-control"
              type="text"
              name="nombre"
              value={productSeleccionado && productSeleccionado.nombre}
              onChange={handleChange}
            />
            <br />
            <label>Categoria</label>
            <input
              className="form-control"
              type="text"
              name="nombre"
              value={productSeleccionado && productSeleccionado.categoria}
              onChange={handleChange}
            />
            <br />
            <label>Descripcion</label>
            <input
              className="form-control"
              type="text"
              name="nombre"
              value={productSeleccionado && productSeleccionado.descripcion}
              onChange={handleChange}
            />
            <br />
            <label>Cantidad</label>
            <input
              className="form-control"
              type="number"
              name="categoria"
              value={productSeleccionado && productSeleccionado.cantidad}
              onChange={handleChange}
            />
            <br />
            <label>Precio unitario</label>
            <input
              className="form-control"
              type="number"
              name="categoria"
              value={productSeleccionado && productSeleccionado.precio_unitario}
              onChange={handleChange}
            />
            <br />
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary" onClick={()=>editar()}>
            Actualizar
          </button>
          <button
            className="btn btn-danger"
            onClick={()=>setModalEditar(false)}
          >
            Cancelar
          </button>
        </ModalFooter>
      </Modal>


      <Modal isOpen={modalEliminar}>
        <ModalBody>
          Estás Seguro que deseas eliminar el producto {productSeleccionado && productSeleccionado.nombre}
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-danger" onClick={()=>eliminar()}>
            Sí
          </button>
          <button
            className="btn btn-secondary"
            onClick={()=>setModalEliminar(false)}
          >
            No
          </button>
        </ModalFooter>
      </Modal>


        <Modal isOpen={modalInsertar}>
        <ModalHeader>
          <div>
            <h3>Insertar Producto</h3>
          </div>
        </ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>ID</label>
            <input
              className="form-control"
              readOnly
              type="text"
              name="id"
              value={data[data.length-1].id+1}
            />
            <br />

            <label>Nombre</label>
            <input
              className="form-control"
              type="text"
              name="nombre"
              value={productSeleccionado ? productSeleccionado.nombre: ''}
              onChange={handleChange}
            />
            <br />

            <label>Categoria</label>
            <input
              className="form-control"
              type="text"
              name="categoria"
              value={productSeleccionado ? productSeleccionado.categoria: ''}
              onChange={handleChange}
            />
            <br />
            <label>Descripcion</label>
            <input
              className="form-control"
              type="text"
              name="categoria"
              value={productSeleccionado ? productSeleccionado.descripcion: ''}
              onChange={handleChange}
            />
            <br />
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary"
          onClick={()=>insertar()}>
            Insertar
          </button>
          <button
            className="btn btn-danger"
            onClick={()=>setModalInsertar(false)}
          >
            Cancelar
          </button>
        </ModalFooter>
      </Modal>
            </div>
        )
    
}
export default Products
