import React, {useState } from 'react'
import axios from "axios";
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


 
        return (
            <div>
               

            </div>
        )
    
}
export default Products
