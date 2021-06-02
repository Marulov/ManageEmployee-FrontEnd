import React from "react"
import { EmployeeContext } from "../contexts/EmployeeContext"
import { useContext, useState, useEffect } from "react"
import { Button, Modal, OverlayTrigger, Tooltip } from "react-bootstrap"
import EditForm from "./EditForm"


const Employee = ({ employee }) => {

    const { dispatch } = useContext(EmployeeContext)

    const [showModal, setShowModal] = useState(false)
    const handleCloseModal = () => setShowModal(false)
    const handleShowModal = () => setShowModal(true)

    // useEffect => employees dizisinde herhangi bir olay olduğunda handleClose metodunu çalıştırır.
    useEffect(() => {
        handleCloseModal()
    }, [employee])

    return (
        <React.Fragment>

            <td>{employee.name}</td>
            <td>{employee.email}</td>
            <td>{employee.address}</td>
            <td>{employee.phone}</td>
            <td>

                <OverlayTrigger
                    overlay = {
                        <Tooltip id={`tooltip-top`}>
                            Edit
                        </Tooltip>
                    }>
                    <button onClick={handleShowModal} className="btn text-warning btn-act" data-toggle="modal"><i className="material-icons">&#xE254;</i></button>
                </OverlayTrigger>
                
                <OverlayTrigger
                    overlay = {
                        <Tooltip id={`tooltip-top`}>
                            Delete
                        </Tooltip>
                    }>
                <button onClick={() => dispatch({type: 'remove_employee', id: employee.id})} className="btn text-danger btn-act" data-toggle="modal"><i className="material-icons">&#xE872;</i></button>
                </OverlayTrigger>

            </td>

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header className="modal-header" closeButton>
                    <Modal.Title>
                        Edit Employee
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <EditForm theEmployee={employee}/>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

        </React.Fragment>
    )
}

export default Employee