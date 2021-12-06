import React, { Component } from 'react';
import { Link } from "react-router-dom";
import axios from "axios"; 
import moment from 'moment';
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2'
import './User.css';

const baseurl ="http://localhost:3001";

class Users extends Component {

  constructor(props){
    super(props);
    this.state = {
      listEmployee:[]
    }
  }

  componentDidMount(){
    this.loadEmployee()
  }


  loadEmployee(){
    const url=baseurl+"/api/employee/list"
    axios.get(url)
    .then(res => {
      if(res.data.success){
        const data = res.data.data;
        this.setState({ listEmployee:data });
      }
      else{
        alert("Erorr web services ")
      }
    })
    .catch(error => {
      alert("ERROR: "+ error)
    });
  }


  onDelete(id){
    Swal.fire({
      title: 'Eliminar',
      text: "Estas seguro de que desea eliminar el usuario?",
      icon: 'warning',
      //width: '30rem',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar'
    }).then((result) => {
      if (result.isConfirmed) {
       this.sendDelete(id)
      }
    })

  }

  sendDelete(userId) {
     // url de backend
     const urlDelete = baseurl+"/api/employee/delete"    // parameter data post
     // network
     axios.post(urlDelete,{
       id:userId
     })
    .then(response =>{
      if (response.data.success) {
        Swal.fire(
          'Eliminado!',
          'El usuario ha sido eliminado.',
          'success'
        )
        this.loadEmployee()
      }
    })
    .catch ( error => {
      alert("Error : "+error)
    })
  }

  render(){
    return (
      <div>
        <div className="container">
          <h2 className="paddingH2">Users</h2>
            <br />
            <Link className="btn btn-success"  to="/users/form">Nuevo usuario</Link>
          {/* <button className="btn btn-success" onClick={()=>{ this.setState({form:null,tipoModal:'insertar'}); this.modalInsertar()}}>New User</button> */}
            <br /><br />
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>#</th>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Email</th>
                <th>Usename</th>
                <th>Fecha de creacion</th>
                <th className="text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
            {this.state.listEmployee.map((data)=>{
              return(
                <tr key={data.id}>
                    <td>{data.id}</td>
                    <td>{data.name}</td>
                    <td>{data.lastname}</td>
                    <td>{data.email}</td>
                    <td>{data.username}</td>
                    <td>{moment(data.creationDate).format("YYYY-MM-DD")}</td>
                    <td>
                      <Link to={"/edit/"+data.id} ><button className="btnEdit"><i className="fas fa-edit"></i></button></Link>
                      <button className="btnEdit" onClick={()=>this.onDelete(data.id)}><i className="fas fa-trash-alt"></i></button>
                    </td>
                </tr>
              )
            })}
            </tbody>
          </table>
      </div>
    </div> 
    )
  }
}

export default Users
