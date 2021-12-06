import React from 'react';
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';
import moment from 'moment';

class EditComponent extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      role:[],
      campUsername: "",
      campPassword:"",
      campEmail:"",
      campName:"",
      campLastname:"",
      campCreationDate:"",
      selectRole:0
    }
  }

  componentDidMount(){
    this.loadRole()
  }

  loadRole(){
    const url="http://localhost:3001/api/role/list"
    axios.get(url)
    .then(res => {
      if(res.data.success){
        const data = res.data.data;
        this.setState({ role:data });
      }
      else{
        alert("Erorr web services ")
      }
    })
    .catch(error => {
      alert(error)
    });
  }

  sendSave(){
    //validacion
    if (this.state.selectRole===0) {
      alert("Seleccione el tipo de Role")
    }
    else if (this.state.campName==="") {
       alert("Digite el campo de  nombre")
    }
    else if (this.state.campLastname==="") {
      alert("Digite el campo de apellido")
    }
    else if (this.state.campEmail==="") {
      alert("Digite el campo de email")
    }
    else if (this.state.campUsername==="") {
       alert("Digite el campo de User")
    }
    else if (this.state.campPassword==="") {
       alert("Digite el campo de password")
    }
    else if (this.state.campCreationDate==="") {
       alert("Digite el campo de fecha de creacion")
    }
    else {
 
      const baseUrl = "http://localhost:3001/api/employee/create"
 
      const datapost = {
        username : this.state.campUsername,
        password : this.state.campPassword,
        email : this.state.campEmail,
        name : this.state.campName,
        lastname : this.state.campLastname,
        creationDate : this.state.campCreationDate,
        role  : this.state.selectRole
      }
 
      axios.post(baseUrl,datapost)
      .then(response=>{
        if (response.data.success===true) {
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })
          
          Toast.fire({
            icon: 'success',
            title: `${response.data.message }`//'Signed in successfully'
          })
        }
        else {
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })
          Toast.fire({
            icon: 'error',
            title: `${response.data.message }`
          })
        }
      }).catch(error=>{
        alert("Error "+error)
      })
 
    }
 
  }

 render(){
   return (
     <div className="container">
       <h2 className="paddingH2">Crear Usuario</h2>
       <div class="form">
       <div class="form-group col-8">
           <label for="formGroupExampleInput2">Name</label>
           <input type="text" class="form-control"  placeholder="Name" value={this.state.campName} 
           onChange={(value)=> this.setState({campName:value.target.value})}/>
         </div>
         <div class="form-group col-8">
           <label for="formGroupExampleInput2">LastName </label>
           <input type="text" class="form-control"  placeholder="LastName" value={this.state.campLastname} 
           onChange={(value)=> this.setState({campLastname:value.target.value})}/>
         </div>
         <div class="form-group col-8">
           <label for="inputEmail4">Email</label>
           <input type="email" class="form-control"  placeholder="Email" value={this.state.campEmail} 
           onChange={(value)=> this.setState({campEmail:value.target.value})}/>
         </div>
         <div class="form-group col-8">
           <label for="formGroupExampleInput2">Username </label>
           <input type="text" class="form-control"  placeholder="Username" value={this.state.campUsername} 
           onChange={(value)=> this.setState({campUsername:value.target.value})}/>
         </div>
         <div class="form-group col-8">
           <label for="inputPassword4">Password </label>
           <input type="password" class="form-control"  placeholder="Password" value={this.state.campPassword} 
           onChange={(value)=> this.setState({campPassword:value.target.value})}/>
         </div>
         <div class="form-group col-8">
           <label for="formGroupExampleInput2">Creation Date </label>
           <input type="date" class="form-control"  placeholder="Creation Date" value={/* this.state.campCreationDate= */ moment().format('YYYY-MM-DD')} 
           onChange={(value)=> this.setState({campCreationDate:value.target.value})} disabled/>
           
           {/* <input id="today" type="date"  value={moment().format('YYYY-MM-DD')}/> */}
              {/* {document.getElementById('today').value = moment().format('YYYY-MM-DD')} */}
         </div>
       </div>
       <div class="form-row">
         <div class="form-group col-8">
           <label for="exampleFormControlSelect1">Role</label>
           <select class="form-select" aria-label="Default select example" onChange={(value)=> this.setState({selectRole:value.target.value})}>
             <option selected>Seleccionar rol </option>
             {
                this.state.role.map(elemento=>(
                  <option key ={elemento.id}   value={elemento.id }>{elemento.role} </option>
                ))
              }
             
           </select>
         </div>
       </div>
       <br></br>
       <button type="submit" class="btn btn-primary" onClick={()=>this.sendSave()}>Save</button>
     </div>
   );
 }
}


export default EditComponent;