import React from "react";
import { Button, Form } from "react-bootstrap";
import { EmployeeContext } from "../contexts/EmployeeContext"
import { useContext, useState } from "react"

const AddForm = () => {

    //const  addEmployee  =  useContext(EmployeeContext).addEmployee
    const { dispatch } =  useContext(EmployeeContext)

    // Her bir Form.Control için ayrı ayrı state oluşturularak yapılırsa 1. yöntem bu
    // const [name, setName] = useState("")
    // const [email, setEmail] = useState("")
    // const [address, setAddress] = useState("")
    // const [phone, setPhone] = useState("")

    // hepsini aynı state içerisinde ekleme 2. yöntem
    const [newEmployee, setNewEmployee] = useState({
        name:"", email:"", address:"", phone:""
    })

    const { name, email, address, phone} = newEmployee

    const onInputCahnge = (e) => {
        setNewEmployee({...newEmployee, [e.target.name]: e.target.value})
    }


    const handleSubmit = (e) => {
        e.preventDefault()
        //addEmployee(name, email, address, phone)
        
        dispatch({type: 'add_employee', employee: {
            name, email, address, phone
        }})
    }


    return(
        <Form onSubmit={handleSubmit}> 
            <Form.Group>
                <Form.Control value={name} name="name" onChange={(e) => onInputCahnge(e)} type="text" placeholder="Name *" required/>
            </Form.Group>
            <Form.Group>
                <Form.Control value={email} name="email" onChange={(e) => onInputCahnge(e)} type="email" placeholder="Email *" required/>
            </Form.Group>
            <Form.Group>
                <Form.Control value={address} name="address" onChange={(e) => onInputCahnge(e)} as="textarea" placeholder="Address *" row={3}/>
            </Form.Group>
            <Form.Group>
                <Form.Control value={phone} name="phone" onChange={(e) => onInputCahnge(e)} type="text" placeholder="Phone"/>
            </Form.Group>

            <Button variant="success" type="submit" block>
                Add New Employee
            </Button>
        </Form>
    );
}

export default AddForm;


