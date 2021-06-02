import React from "react";
import { Button, Form } from "react-bootstrap";
import { EmployeeContext } from "../contexts/EmployeeContext"
import { useContext, useState } from "react"

const EditForm = ({ theEmployee }) => {

    const { dispatch } =  useContext(EmployeeContext)

    const employee = theEmployee
    const id = employee.id

    const [name, setName] = useState(employee.name)
    const [email, setEmail] = useState(employee.email)
    const [address, setAddress] = useState(employee.address)
    const [phone, setPhone] = useState(employee.phone)

    const updatedEmployee = {id, name, email, address, phone}

    const handleSubmit = (event) => {
        event.preventDefault()
        //updateEmployee(id, updatedEmployee)
        dispatch({type: 'update_employee', id, updatedEmployee})
    }


    return(
        <Form onSubmit={handleSubmit}> 
            <Form.Group>
                <Form.Control value={name} name="name" onChange={(event) => setName(event.target.value)}  type="text" placeholder="Name *" required/>
            </Form.Group>
            <Form.Group>
                <Form.Control value={email} name="email" onChange={(event) => setEmail(event.target.value)} type="email" placeholder="Email *" required/>
            </Form.Group>
            <Form.Group>
                <Form.Control value={address} name="address" onChange={(event) => setAddress(event.target.value)} as="textarea" placeholder="Address *" row={3}/>
            </Form.Group>
            <Form.Group>
                <Form.Control value={phone}  name="phone" onChange={(event) => setPhone(event.target.value)} type="text" placeholder="Phone"/>
            </Form.Group>

            <Button variant="success" type="submit" block>
                Edit Employee
            </Button>
        </Form>
    );
}

export default EditForm;


