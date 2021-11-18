import React, { useState } from 'react'
/* import axios from "axios"; */
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Products.css';
import { productos } from './data'

const Products = () => {

  const [data, setData] = useState(productos);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [modalInsertar, setModalInsertar] = useState(false);

  const [productSeleccionado, setProductSeleccionado] = useState({
    id: '',
    nombre: '',
    categoria: '',
    descripcion: '',
    cantidad: 0,
    precio_unitario: 0,
    picture: ''
  });

  const seleccionarProducto = (elemento, caso) => {
    setProductSeleccionado(elemento);
    (caso === 'Editar') ? setModalEditar(true) : setModalEliminar(true)
  }

  const handleChange = e => {
    const { name, value } = e.target;
    setProductSeleccionado((prevState) => ({
      ...prevState,
      [name]: value
    }));
  }

  const editar = () => {
    var dataNueva = data;
    // eslint-disable-next-line array-callback-return
    dataNueva.map((prod) => {
      if (prod.id === productSeleccionado.id) {
        prod.nombre = productSeleccionado.nombre;
        prod.categoria = productSeleccionado.categoria;
        prod.descripcion = productSeleccionado.descripcion;
        prod.cantidad = productSeleccionado.cantidad;
        prod.precio_unitario = productSeleccionado.precio_unitario;
        prod.picture = productSeleccionado.picture;
      }
    });
    setData(dataNueva);
    setModalEditar(false);
  }

  const eliminar = () => {
    setData(data.filter(prod => prod.id !== productSeleccionado.id));
    setModalEliminar(false);
  }

  const abrirModalInsertar = () => {
    setProductSeleccionado(null);
    setModalInsertar(true);
  }

  const insertar = () => {
    var valorInsertar = productSeleccionado;
    valorInsertar.id = data[data.length - 1].id + 1;
    var dataNueva = data;
    dataNueva.push(valorInsertar);
    setData(dataNueva);
    setModalInsertar(false);
  }

  return (
    <div className="container">
      <h2 className="paddingH2">Products</h2>
      <br />
      <button className="btn btn-success" onClick={() => abrirModalInsertar()}>New Product</button>
      <br /><br />
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Category</th>
            <th>Description</th>
            <th>Quantity</th>
            <th>Unit price</th>
            <th>Picture</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((elemento) => (

            <tr key={elemento.id}>
              <td>{elemento.id}</td>
              <td>{elemento.nombre}</td>
              <td>{elemento.categoria}</td>
              <td>{elemento.descripcion}</td>
              <td>{elemento.cantidad}</td>
              <td>{elemento.precio_unitario}</td>
              <td><img src={`${process.env.PUBLIC_URL}/img/${elemento.picture}`} alt={elemento.nombre} width="50px" className="img-fluid" /></td>
              <td><button className="btnEdit" onClick={() => seleccionarProducto(elemento, 'Editar')} ><i className="fas fa-edit"></i></button>
                <button className="btnEdit" onClick={() => seleccionarProducto(elemento, 'Eliminar')}><i className="fas fa-trash-alt"></i></button>
              </td>
            </tr>
          ))
          }
          {console.log(data)}
        </tbody>
      </table>
      <Modal isOpen={modalEditar}>
        <ModalHeader>
          <div>
            <h3>Editar Producto</h3>
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
              value={productSeleccionado && productSeleccionado.id}
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
              name="categoria"
              value={productSeleccionado && productSeleccionado.categoria}
              onChange={handleChange}
            />
            {/*  <select className="form-select" aria-label="Default select example" name="role" >
              <option >Seleccionar Rol</option>
              <option value="1">Admin</option>
              <option value="2">Views</option>
            </select> */}
            <br />
            <label>Descripcion</label>
            <input
              className="form-control"
              type="text"
              name="descripcion"
              value={productSeleccionado && productSeleccionado.descripcion}
              onChange={handleChange}
            />
            <br />
            <label>Cantidad</label>
            <input
              className="form-control"
              type="number"
              name="cantidad"
              value={productSeleccionado && productSeleccionado.cantidad}
              onChange={handleChange}
            />
            <br />
            <label>Precio unitario</label>
            <input
              className="form-control"
              type="number"
              name="precio_unitario"
              value={productSeleccionado && productSeleccionado.precio_unitario}
              onChange={handleChange}
            />
            <br />
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary" onClick={() => editar()}>
            Actualizar
          </button>
          <button
            className="btn btn-danger"
            onClick={() => setModalEditar(false)}
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
          <button className="btn btn-danger" onClick={() => eliminar()}>
            Sí
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => setModalEliminar(false)}
          >
            No
          </button>
        </ModalFooter>
      </Modal>


      <Modal isOpen={modalInsertar}>
        <ModalHeader>
          <div>
            <h3>Insert Product</h3>
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
              value={data[data.length - 1].id + 1}
            />
            <br />

            <label>Name</label>
            <input
              className="form-control"
              type="text"
              name="nombre"
              value={productSeleccionado ? productSeleccionado.nombre : ''}
              onChange={handleChange}
            />
            <br />

            <label>Category</label>
            <input
              className="form-control"
              type="text"
              name="categoria"
              value={productSeleccionado ? productSeleccionado.categoria : ''}
              onChange={handleChange}
            />
            <br />
            <label>Description</label>
            <input
              className="form-control"
              type="text"
              name="categoria"
              value={productSeleccionado ? productSeleccionado.descripcion : ''}
              onChange={handleChange}
            />
            <br />
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary"
            onClick={() => insertar()}>
            Insert
          </button>
          <button
            className="btn btn-danger"
            onClick={() => setModalInsertar(false)}
          >
            Cancel
          </button>
        </ModalFooter>
      </Modal>
    </div>
  )

}
export default Products
