import React, { useState,useEffect} from 'react';
import axios from 'axios' 
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2'; 

const FormProd = () => {

  const [categoria,setCategory]=useState([]);
  /* const [formValues, setFormValues] = useState({
    name:'',
    description :'' ,
    quantity : 0,
    unit_price :'',
    categoryId :0
  }) */
  const [name,setName]=useState('')
  const [description,setDescription]=useState('')
  const [quantity,setQuantity]=useState(0)
  const [unit_price,setUnit_price]=useState(0)
  const [categoryId,setCategoryId]=useState(0)
  const [picture,setPicture]=useState('')

  const clearState = () => {
    setCategory([])
    setName('')
    setDescription('')
    setQuantity(0)
    setUnit_price(0)
    setCategoryId(0)
    setPicture('')
  }
  useEffect(() => {
    loadCategory()
  }, [])

  const loadCategory =()=>{
  axios.get('http://localhost:3001/api/category/list')
    .then(res => {
      if(res.data.success){
        const data = res.data.data;
        setCategory( data );
        console.log(data)
      }
      else{
        alert("Erorr web services ")
      }
    })
    .catch(error => {
      alert(error)
    });
  }


  const _handleSubmit = async (e) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('name', name)
    formData.append('description', description)
    formData.append('quantity', quantity)
    formData.append('unit_price', unit_price)
    formData.append('categoryId', categoryId)
    formData.append('picture', picture)
    const response =await axios.post('http://localhost:3001/api/product/addProduct', formData)

      if (response.status === 200) {
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
          title: /* `${response.data.message }` */'Signed in successfully'
        })
        e.target.reset()
        clearState()
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
          title: /* `${response.data.message }` */ 'Error no se pudo guardar'
        })
      }     
  }
   return (
    <div className="container">
      <h2 className="paddingH2">Crear Producto</h2>
      <form id="form" onSubmit={_handleSubmit}    method="POST" encType='multipart/form-data'  >
        <div class="form-group col-8">
          <label for="formGroupExampleInput2">Nombre</label>
          <input type="text" class="form-control" id="formGroupExampleInput" placeholder="Nombre"  name="name" value={name} 
          onChange={(e) => setName(e.target.value)}/>
        </div>
        <div class="form-group col-8">
          <label for="exampleFormControlSelect1">Categoria</label>
          <select class="form-select" aria-label="Default select example" name="categoryId" onChange={(e) => setCategoryId(e.target.value)}>
             <option selected>Seleccionar categoria </option>
              {categoria.map((elemento)=>{
                  return (
                    <option key ={elemento.id}  value={elemento.id }>{elemento.category} </option>
                  )
                })}
          </select>
        </div>
        <div class="form-group col-8">
          <label for="formGroupExampleInput2">Descripcion</label>
          <input type="text" class="form-control" id="formGroupExampleInput" placeholder="Descripcion" name="description" value={description} 
          onChange={(e) => setDescription(e.target.value)}/>
        </div>
        <div class="form-group col-8">
          <label for="formGroupExampleInput2">Cantidad</label>
          <input type="number" class="form-control" id="formGroupExampleInput" placeholder="Cantidad" name='quantity' 
          value={quantity}  onChange={(e) => setQuantity(e.target.value)} />
        </div>
        <div class="form-group col-8">
          <label for="formGroupExampleInput2">Precio por unidad</label>
          <input type="number" class="form-control" id="formGroupExampleInput" placeholder="Precio por unidad" name="unit_price" 
          value={unit_price}  onChange={(e) => setUnit_price(e.target.value)} />
        </div>
        <div class="form-group col-8">
          <label for="formGroupExampleInput2">Imagen</label>  
          <input type="file"  class="form-control" name='picture' onChange={(e) => setPicture(e.target.files[0])}  />
        </div>
         <br></br>
        <button type="submit" class="btn btn-danger">Cancelar</button>
        <button type="submit" class="btn btn-primary">Crear</button>
      </form>
    </div>
   )
 }

export default FormProd;