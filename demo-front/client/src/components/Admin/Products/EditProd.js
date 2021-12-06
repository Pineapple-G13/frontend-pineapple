import React, { useState,useEffect} from 'react';
import { useParams } from 'react-router'
import axios from 'axios' 
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2'; 

const EditProd = () => {
  const { id } = useParams()
  //const history = useHistory()

  const [categoria, setCategory]=useState([]);
  const [stringCate,setStringCate]=useState('')
  const [name, setName]=useState('')
  const [description, setDescription]=useState('')
  const [quantity, setQuantity]=useState(0)
  const [unit_price, setUnit_price]=useState(0)
  const [categoryId, setCategoryId]=useState(0)
  const [picture, setPicture]=useState('')

  useEffect(() => {
    const getDataById = async () => {
      const {data}= await axios.get(`http://localhost:3001/api/product/${id}`)
      //console.log('dato:'+data[0])
      setName(data.name)
      setDescription(data.description)
      setQuantity(data.quantity)
      setUnit_price(data.unit_price)
      setPicture(data.picture)
      setCategoryId(data.categoryId)
      setStringCate(data.category.category)
      //}
    }

    getDataById();
    loadCategory();
  },[id])

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
  const updateHandler = async (e) => {

    e.preventDefault()
   
    // update by put request
    const formData = new FormData()
    formData.append('name', name)
    formData.append('description', description)
    formData.append('quantity', quantity)
    formData.append('unit_price', unit_price)
    formData.append('categoryId', categoryId)
    formData.append('picture', picture)

    const response = await axios.put(`http://localhost:3001/api/product/${id}`, formData)

    //history.push('/products')
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
        title: /* `${response.data.message }` */'Actualizado correctamente'
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
        title: /* `${response.data.message }` */ 'Error no se pudo guardar'
      })
    }     

  }

  return (
    <div className="container">
      <h2 className="paddingH2">Editar Producto</h2>
      <form id="form" onSubmit={updateHandler}  encType='multipart/form-data'  >
        <div class="form-group col-8">
          <label for="formGroupExampleInput">Nombre</label>
          <input type="text" class="form-control" id="formGroupExampleInput" placeholder="Nombre"  name="name" value={name} 
          onChange={(e) => setName(e.target.value)}/>
        </div>
        <div class="form-group col-8">
          <label for="inputState">Categoria</label>
          <select class="form-select" aria-label="Default select example" name="categoryId" onChange={(e) => setCategoryId(e.target.value)}>
          <option selected value={categoryId}>{stringCate}</option>
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
        <button type="submit" class="btn btn-primary">Actualizar</button>
      </form>
    </div>
  )
}


export default EditProd;