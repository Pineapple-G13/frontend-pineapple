import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import axios from 'axios';
import Swal from 'sweetalert2';

const baseUrl = "http://localhost:3001/api"

class EditComponent extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      role:[],
      dataEmployee:{},
      campUsername: "",
      campPassword:"",
      campEmail:"",
      campName:"",
      campLastname:"",
      campCreationDate:"",
      stringRole:"",
      selectRole:0
    }
  }

  sendUpdate(){
    //  get parameter id
    let userId = this.props.match.params.id;
    // url de backend
    const url=baseUrl+"/employee/update/"+userId
    // parametros de datos post
    const datapost = {
      username : this.state.campUsername,
      password : this.state.campPassword,
      email : this.state.campEmail,
      name : this.state.campName,
      lastname : this.state.campLastname,
      creationDate : this.state.campCreationDate,
      role  : this.state.selectRole
    }

    axios.post(url,datapost)
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
        alert("Error")
      }
    }).catch(error=>{
      alert("Error "+error)
    })

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

  componentDidMount(){
    //parametro de id del usuario
    let userId = this.props.match.params.id;
    const url = baseUrl+"/employee/get/"+userId
    axios.get(url)
    .then(res=>{
      if (res.data.success) {
        const data = res.data.data[0]
        this.setState({
          dataEmployee:data,
          campUsername:data.username,
          campPassword: data.password,
          campEmail:data.email,
          campName:data.name,
          campLastname:data.lastname,
          campCreationDate:data.creationDate,
          stringRole:data.role.role,
          selectRole:data.roleId
        })
        console.log(JSON.stringify(data.role.role))
      }
      else {
        alert("Error web service")
      }
    })
    .catch(error=>{
      alert("Error server "+error)
    })
    this.loadRole()
  }
 render(){
   return (
     <div className="container">
       <h2 className="paddingH2">Editar Usuario</h2>
       <div class="form">
        <div class="form-group col-8">
           <label for="inputPassword4">Name</label>
           <input type="text" class="form-control"  placeholder="Name" value={this.state.campName} 
           onChange={(value)=> this.setState({campName:value.target.value})}/>
         </div>
         <div class="form-group col-8">
           <label for="inputPassword4">LastName </label>
           <input type="text" class="form-control"  placeholder="LastName" value={this.state.campLastname} 
           onChange={(value)=> this.setState({campLastname:value.target.value})}/>
         </div>
         <div class="form-group col-8">
           <label for="inputEmail4">Email</label>
           <input type="email" class="form-control"  placeholder="Email" value={this.state.campEmail} 
            onChange={(value)=> this.setState({campEmail:value.target.value})}/>
         </div>
         <div class="form-group col-8">
           <label for="inputPassword4">Username </label>
           <input type="text" class="form-control"  placeholder="Username" value={this.state.campUsername} 
           onChange={(value)=> this.setState({campUsername:value.target.value})}/>
         </div>
         <div class="form-group col-8">
           <label for="inputPassword4">Password </label>
           <input type="password" class="form-control"  placeholder="Password" value={this.state.campPassword} 
           onChange={(value)=> this.setState({campPassword:value.target.value})}/>
         </div>
         <div class="form-group col-8">
           <label for="inputPassword4">Creation Date </label>
           <input type="date" class="form-control"  placeholder="Creation Date" value={this.state.campCreationDate} 
           onChange={(value)=> this.setState({campCreationDate:value.target.value})} disabled />
         </div>
       </div>
       <div class="form-row">
         <div class="form-group col-8">
           <label for="inputState">Role</label>
           <select class="form-select" aria-label="Default select example" onChange={(value)=> this.setState({selectRole:value.target.value})}>
             <option selected value={this.state.dataEmployee.roleId}>{this.state.stringRole}</option>
              {
                this.state.role.map(elemento=>(
                  <option key ={elemento.id}   value={elemento.id }>{elemento.role} </option>
                ))
              }
           </select>
         </div>
        </div>
       <br></br>
       <button type="submit" class="btn btn-primary" onClick={()=>this.sendUpdate()}>Update</button>
     </div>
   );
 }
}


export default EditComponent;