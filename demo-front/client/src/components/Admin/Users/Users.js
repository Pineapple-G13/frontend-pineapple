import React, {useState } from 'react'
/* import axios from "axios"; */
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {users} from '../Products/data'

const Users = () => {
    const [data, setData] = useState(users);
    const [modalEditar, setModalEditar] = useState(false);
    const [modalEliminar, setModalEliminar] = useState(false);
    const [modalInsertar, setModalInsertar] = useState(false);

    const [userSeleccionado, setUserSeleccionado] = useState({
        id: '',
        username: '',
        password: '',
        email:'',
        name:'',
        lastname:'',
        creationDate:'',
        role:''
        });
        
    const seleccionarProducto=(elemento, caso)=>{
        setUserSeleccionado(elemento);
        (caso==='Editar')?setModalEditar(true):setModalEliminar(true)
    }
        
    const handleChange=e=>{
        const {name, value}=e.target;
        setUserSeleccionado((prevState)=>({
        ...prevState,
        [name]: value
        }));
    }

    const editar=()=>{
        var dataNueva=data;
        // eslint-disable-next-line array-callback-return
        dataNueva.map((item) =>{
            if(item.id ===userSeleccionado.id){
                item.username=userSeleccionado.username;
                item.password=userSeleccionado.password;
                item.email=userSeleccionado.email;
                item.name=userSeleccionado.name;
                item.lastname=userSeleccionado.lastname;
                item.creationDate=userSeleccionado.creationDate;
                item.role=userSeleccionado.role;
            }
        });
        setData(dataNueva);
        setModalEditar(false);
    }
        
          const eliminar =()=>{
            setData(data.filter(prod=>prod.id!==userSeleccionado.id));
            setModalEliminar(false);
          }
        
          const abrirModalInsertar=()=>{
            setUserSeleccionado(null);
            setModalInsertar(true);
          }
        
          const insertar =()=>{
            var valorInsertar=userSeleccionado;
            valorInsertar.id=data[data.length-1].id+1;
            var dataNueva = data;
            dataNueva.push(valorInsertar);
            setData(dataNueva);
            setModalInsertar(false);
          }
        


    return (
        <div>
            <div className="container">
                <h2 className="paddingH2">Users</h2>
                <br />
                <button className="btn btn-success" onClick={()=>abrirModalInsertar()}>New User</button>
                <br /><br />
                <table className="table table-bordered">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Usename</th>
                        <th>Creation date</th>
                        <th>Acciones</th>
                    </tr>
                    </thead>
                    <tbody>
                    {data.map((elemento,key)=>(
                        <tr>
                          <td>{key=elemento.id}</td>
                          <td>{elemento.username}</td>
                          <td>{elemento.creationDate}</td>
                          <td><button className="btnEdit" onClick={()=>seleccionarProducto(elemento, 'Editar')} ><i className="fas fa-edit"></i></button>
                              <button className="btnEdit" onClick={()=>seleccionarProducto(elemento, 'Eliminar')}><i className="fas fa-trash-alt"></i></button>
                          </td>
                        </tr>
                    ))
                    }
                    </tbody>
                </table>
                <Modal isOpen={modalEditar}>
        <ModalHeader>
          <div>
            <h3>Edit User</h3>
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
              value={userSeleccionado && userSeleccionado.id}
            />
            <br />

            <label>Username</label>
            <input
              className="form-control"
              type="text"
              name="username"
              value={userSeleccionado && userSeleccionado.username}
              onChange={handleChange}
            />
            <br />
            <label>Password</label>
            <input
              className="form-control"
              type="text"
              name="password"
              value={userSeleccionado && userSeleccionado.password}
              onChange={handleChange}
            />
            <br />
            <label>Email</label>
            <input
              className="form-control"
              type="text"
              name="email"
              value={userSeleccionado && userSeleccionado.email}
              onChange={handleChange}
            />
            <br />
            <label>Name</label>
            <input
              className="form-control"
              type="text"
              name="name"
              value={userSeleccionado && userSeleccionado.name}
              onChange={handleChange}
            />
            <br />
            <label>Lastname</label>
            <input
              className="form-control"
              type="text"
              name="lastname"
              value={userSeleccionado && userSeleccionado.lastname}
              onChange={handleChange}
            />
            <br />
            <label>Creation date</label>
            <input
              className="form-control"
              type="date"
              name="creationDate"
              value={userSeleccionado && userSeleccionado.creationDate}
              onChange={handleChange}
            />
            <br />
            <label>Role</label>
            <select className="form-select" aria-label="Default select example" name="role" >
              <option >Seleccionar Rol</option>
              <option value="1">Admin</option>
              <option value="2">Views</option>
            </select>
            {/* <input
              className="form-control"
              type="text"
              name="role"
              value={userSeleccionado && userSeleccionado.role}
              onChange={handleChange}
            /> */}
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
          Estás Seguro que deseas eliminar el usuario {userSeleccionado && userSeleccionado.nombre}
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
            <h3>Insert User</h3>
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

            <label>Username</label>
            <input
              className="form-control"
              type="text"
              name="username"
              value={userSeleccionado ? userSeleccionado.username: ''}
              onChange={handleChange}
            />
            <br />

            <label>Password</label>
            <input
              className="form-control"
              type="text"
              name="password"
              value={userSeleccionado ? userSeleccionado.password: ''}
              onChange={handleChange}
            />
            <br />
            <label>Email</label>
            <input
              className="form-control"
              type="text"
              name="email"
              value={userSeleccionado ? userSeleccionado.email: ''}
              onChange={handleChange}
            />
            <br />
            <label>Name</label>
            <input
              className="form-control"
              type="text"
              name="name"
              value={userSeleccionado ? userSeleccionado.name: ''}
              onChange={handleChange}
            />
            <br />
            <label>Lastname</label>
            <input
              className="form-control"
              type="text"
              name="lastname"
              value={userSeleccionado ? userSeleccionado.lastname: ''}
              onChange={handleChange}
            />
            <br />
            <label>Creation Date</label>
            <input
              className="form-control"
              type="date"
              name="creationDate"
              value={userSeleccionado ? userSeleccionado.creationDate: ''}
              onChange={handleChange}
            />
            <br />
            <label>Role</label>

            <select className="form-select" aria-label="Default select example" name="role" >
              <option selected >Seleccionar Rol</option>
              <option value="1">Admin</option>
              <option value="2">Views</option>
            </select>
           {/*  <input
              className="form-control"
              type="text"
              name="role"
              value={userSeleccionado ? userSeleccionado.role: ''}
              onChange={handleChange}
            /> */}
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
        </div>
    )
}

export default Users
