import React, { Component } from 'react'
import { Link } from "react-router-dom";
import axios from "axios"; 
import 'bootstrap/dist/css/bootstrap.min.css';
import './Products.css'; 
import Swal from 'sweetalert2' 

class Products extends Component {
  constructor(props){
    super(props);
    this.state = {
      listProduct:[]
    }
  }

  async loadProduct(){
    const { data } = await axios.get('http://localhost:3001/api/product/allProducts')
          console.log(data)
        this.setState({listProduct:data})
  }

  componentDidMount(){
    this.loadProduct()
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
    // network
    axios.delete(`http://localhost:3001/api/product/${userId}`)
   .then(response =>{
    if (response.status === 200) {
       Swal.fire(
         'Eliminado!',
         'El usuario ha sido eliminado.',
         'success'
       )
       this.loadProduct()
     }
   })
   .catch ( error => {
     alert("Error : "+error)
   })
 }
  /* async handleDelete(id){
    await axios.delete(`/api/products/${id}`)
  } */

  render(){
    return (
    <div className="container">
      <h2 className="paddingH2">Productos</h2>
      <br />
        <Link className="btn btn-success"  to="/products/form">Nuevo Producto</Link>
      <br /><br />
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Categoria</th>
            <th>Descripcion</th>
            <th>Cantidad</th>
            <th>Precio por unidad</th>
            <th>Imagen</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
         {this.state.listProduct.map((data)=>{
              return(
                <tr key={data.id}>
                    <td>{data.id}</td>
                    <td>{data.name}</td>
                    <td>{data.category.category}</td>
                    <td>{data.description}</td>
                    <td>{data.quantity}</td>
                    <td>{data.unit_price}</td>
                    <td><img src={'http://localhost:3001/'+data.picture} alt={data.name} width="80px" className="img-fluid" /></td>
                    {<td>
                      <Link to={"/products/edit/"+data.id} ><button className="btnEdit"><i className="fas fa-edit"></i></button></Link>
                      <button className="btnEdit" onClick={()=>this.onDelete(data.id)}><i className="fas fa-trash-alt"></i></button>
                    </td>}
                </tr>
              )
            })}
        </tbody>
      </table>
    </div>
    )
  }
}
export default Products
