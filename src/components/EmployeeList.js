import Employee from "./Employee";
import { useContext, useState, useEffect } from "react";
import { EmployeeContext } from "../contexts/EmployeeContext";
import { Button, Modal, Alert } from "react-bootstrap";
import AddForm from "./AddForm";
import Pagination from "./Pagination";

const EmployeeList = () => {

    //const employees = useContext(EmployeeContext).employees
    const { sortedEmployees } = useContext(EmployeeContext)

    //Modal ile ilgili state kodları
    const [showModal, setShowModal] = useState(false)
    const handleCloseModal = () => setShowModal(false)
    const handleShowModal = () => setShowModal(true)

    //Alert ile ilgili state kodları
    const [showAlert, setShowAlert] = useState(false)
    const handleShowAlert = () => {
        setShowAlert(true)
        setTimeout(() => {
            setShowAlert(false)
        }, 3000);
    }

    //Pagination ile ilgili işlemler
    const [currentPage, setCurrentPage] = useState(1)
    const [employeesPerPage] = useState(3)

    const indexOfLastEmployee = currentPage * employeesPerPage
    const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage 
    const currentEmployees = sortedEmployees.slice(indexOfFirstEmployee, indexOfLastEmployee)
    const totalPagesNum = Math.ceil(sortedEmployees.length / employeesPerPage)


    // useEffect => employees dizisinde herhangi bir olay olduğunda handleClose metodunu çalıştırır.
    useEffect(() => {
        handleCloseModal()

        // üsteki metot çalıştığında return et 
        return () => {
            handleShowAlert()
        }
    }, [sortedEmployees])

    return (
        <>
            <div className="table-title">
                <div className="row">
                    <div className="col-sm-6">
                        <h2>Manage <b>Employees</b></h2>
                    </div>
                    <div className="col-sm-6">
                        <Button onClick={handleShowModal} className="btn btn-success text-white" data-toggle="modal"><i className="material-icons">&#xE147;</i> <span>Add New Employee</span></Button>
                    </div>
                </div>
            </div>

            <Alert show={showAlert} variant="success" dismissible> 
                Employee list successfully updated.
            </Alert>

            <table className="table table-striped table-hover">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Address</th>
                        <th>Phone</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        currentEmployees.map((employee) => (
                            <tr key={employee.id}>
                                <Employee employee={employee} />
                            </tr>
                        ))
                    }
                </tbody>
            </table>

            <Pagination 
                pages={totalPagesNum}
                setCurrentPage={setCurrentPage} 
                currentEmployees={currentEmployees}
                sortedEmployees={sortedEmployees}  />

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header className="modal-header" closeButton>
                    <Modal.Title>
                        Add Employee
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <AddForm />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default EmployeeList;