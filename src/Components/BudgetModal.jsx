import React from "react"
import {useRef} from "react"
import {Button, Form, Modal} from "react-bootstrap"
import {useAppContext} from "../context/AppContext"
// importing the needed  componetns for the budgetModal
export default function BudgetModal({show, handelClose}) {
  // getting the addBudget function to add new budget
  const {addBudget} = useAppContext()
  const nameRef = useRef()
  const amountRef = useRef()
  // function to handel adding the budget
  function handelSubmit(e) {
    e.preventDefault()
    addBudget({
      name: nameRef.current.value,
      max: parseFloat(amountRef.current.value),
    })
  }
  return (
    <>
      <Modal show={show} onHide={handelClose} className="p-2">
        <Form onSubmit={handelSubmit}>
          <Modal.Header closeButton={handelClose}>
            <Modal.Title className="fs-4 me-auto"> New Budget</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" required ref={nameRef} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="amount">
              <Form.Label>Amount</Form.Label>
              <Form.Control
                type="number"
                min={0}
                step={0.1}
                required
                ref={amountRef}
              />
            </Form.Group>
            <div className="d-flex justify-content-end">
              {/* click event to close the modal  */}
              <Button type="submit" onClick={handelClose}>
                Add
              </Button>
            </div>
          </Modal.Body>
        </Form>
      </Modal>
    </>
  )
}
