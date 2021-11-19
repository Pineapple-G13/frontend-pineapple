import React, { Component } from 'react';
import axios from "axios"; 
import {  Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
/* import {users} from '../Products/data' */

const url="http://localhost:3001/api/users/";

class Users extends Component {

  state={
    data:[],
    modalInsertar:false,
    modalEliminar:false,
    form:{
      id:'',
      username: '',
      password: '',
      email:'',
      name:'',
      lastname:'',
      creationDate:'',
      id_role:'',
      tipoModal:''
    }
  }

  peticionGet=()=>{
    axios.get(url).then(response=>{
     this.setState({data : response.data})
    }).catch(error=>{
      console.log(error.message)
    })
  }

  peticionPost=async()=>{
    delete this.state.form.id;
    await axios.post(url,this.state.form).then(response=>{
      this.modalInsertar();
      this.peticionGet();
    }).catch(error=>{
      console.log(error.message)
    })
  }

  peticionPut=()=>{
    axios.put(url+this.state.form.id,this.state.form).then(response=>{
      this.modalInsertar();
      this.peticionGet();
      //hacer el catch de esta peticion
    })
  }

  peticionDelete=()=>{
    axios.delete(url+this.state.form.id).then(response=>{
      this.setState({modalEliminar:false});
      this.peticionGet();
      //hacer el catch
    })
  }
  modalInsertar=()=>{
    this.setState({modalInsertar: !this.state.modalInsertar});
  }

  seleccionarUsuario=(usuario)=>{
    this.setState({
      tipoModal:'actualizar',
      form:{
        id: usuario.id,
        username: usuario.username,
        password: usuario.password,
        email: usuario.email,
        name: usuario.name,
        lastname: usuario.lastname,
        creationDate: usuario.creationDate,
        id_role: usuario.id_role
      }
    })
  }
  handleChange= async e=>{
    e.persist();
    await this.setState({
      form:{
        ...this.state.form,
        [e.target.name]:e.target.value
      }
    });
    //console.log(this.state.form)
  }
  componentDidMount(){
  this.peticionGet();
  }


        
  render(){
    const {form}=this.state;
    return (
      <div>
        <div className="container">
          <h2 className="paddingH2">Users</h2>
            <br />
          <button className="btn btn-success" onClick={()=>{ this.setState({form:null,tipoModal:'insertar'}); this.modalInsertar()}}>New User</button>
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
              {this.state.data.map((elemento)=>{
              return(
                <tr key={elemento.id}>
                    <td>{elemento.id}</td>
                    <td>{elemento.username}</td>
                    <td>{elemento.creationDate}</td>
                    <td>
                      <button className="btnEdit" onClick={()=>{this.seleccionarUsuario(elemento);this.modalInsertar()}} ><i className="fas fa-edit"></i></button>
                      <button className="btnEdit" onClick={()=>{this.seleccionarUsuario(elemento); this.setState({modalEliminar:true})}}><i className="fas fa-trash-alt"></i></button>
                    </td>
                </tr>
              )
              })}
            </tbody>
          </table>


           {/*---------------------INSERTAR -----------------------------*/}
          <Modal  isOpen={this.state.modalInsertar} >
            <ModalHeader>
              <div><h3>Insert User</h3></div>
            </ModalHeader>
            <ModalBody>
              <div className="form-group">
                <label>ID</label>
                <input className="form-control" readOnly type="text"name="id" value={form ? form.id : this.state.data.length +1}
                  /* value={data[data.length-1].id+1} */
                />
                <br />

                <label>Username</label>
                <input className="form-control" type="text" name="username" onChange={this.handleChange} value={form?form.username:''}/>
                <br />
                <label>Password</label>
                <input className="form-control" type="text" name="password" onChange={this.handleChange} value={form ? form.password :''}
                  /* value={userSeleccionado ? userSeleccionado.password: ''}*//>
                <br />
                <label>Email</label>
                <input className="form-control" type="text" name="email" onChange={this.handleChange} value={form ? form.email :''}
                 /*  value={userSeleccionado ? userSeleccionado.email: ''} */ />
                <br />
                <label>Name</label>
                <input className="form-control" type="text" name="name" onChange={this.handleChange} value={form ? form.name :''}
                 /*  value={userSeleccionado ? userSeleccionado.name: ''} *//>
                <br />
                <label>Lastname</label>
                <input className="form-control" type="text" name="lastname" onChange={this.handleChange} value={form ? form.lastname :''}
                />
                <br />
                <label>Creation Date</label>
                <input className="form-control" type="date" name="creationDate" onChange={this.handleChange} value={form ? form.creationDate :''}
                  /* value={userSeleccionado ? userSeleccionado.creationDate: ''} *//>
                <br />
                <label>Role</label>
              {/*   <select className="form-select" aria-label="Default select example" name="id_role" onChange={this.handleChange} value={form ? form.id_role : ''}>
                  <option selected >Seleccionar Rol</option>
                  <option value="1">Admin</option>
                  <option value="2">Views</option>
                </select>  */}
                <input className="form-control"type="text" name="id_role" onChange={this.handleChange} value={form ? form.id_role : ''}/> 
                <br />
            </div>
            </ModalBody>
            <ModalFooter>
              {
              this.state.tipoModal ==='insertar' ?               
              <button className="btn btn-primary"onClick={()=>this.peticionPost()} >Insertar </button> : 
              <button className="btn btn-primary" onClick={()=>this.peticionPut()}>Actualizar </button>
              } 
              <button className="btn btn-danger" onClick={()=>this.modalInsertar()}> Cancelar</button>
           
            </ModalFooter>
        </Modal>

         {/*-------------------ELIMINAR ---------------------*/}

         <Modal  isOpen={this.state.modalEliminar} >
            <ModalBody>
              Estás Seguro que deseas eliminar el usuario {form && form.username} ?
            </ModalBody>
            <ModalFooter>
              <button className="btn btn-danger" onClick={()=>this.peticionDelete()}> Sí </button>
              <button className="btn btn-secondary" onClick={()=>this.setState({modalEliminar:false})}> No </button>
            </ModalFooter>
          </Modal>
      </div>
    </div> 
    )
  }
}

export default Users
