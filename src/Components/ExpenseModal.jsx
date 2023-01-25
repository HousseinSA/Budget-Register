import React from "react"
import {useRef} from "react"
import {Button, Form, Modal} from "react-bootstrap"
import {DefaultCategory, useAppContext} from "../context/AppContext"
// getting the needed values and function 
export default function ExpenseModal({show, handelClose, defaultBudgetId}) {
  // gettings the budgets and adding new expense function
  const {addExpense, budgets} = useAppContext()
  const discreptionRef = useRef()
  const amountRef = useRef()
  const budgetIdRef = useRef()
  // function to handel adding new expnese
  function handelSubmit(e) {
    e.preventDefault()
    addExpense({
      discreption: discreptionRef.current.value,
      expenseAmount: parseFloat(amountRef.current.value),
      budgetId: budgetIdRef.current.value,
    })
  }
  return (
    <>
      <Modal show={show} className="p-2" onHide={handelClose}>
        <Form onSubmit={handelSubmit}>
          <Modal.Header closeButton={handelClose}>
            <div className="fs-4 me-auto"> New Expense</div>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="discreption">
              <Form.Label>Discreption</Form.Label>
              <Form.Control type="text" required ref={discreptionRef} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="expenseAmount">
              <Form.Label>Expense Amount</Form.Label>
              <Form.Control
                type="number"
                min={0}
                step={0.1}
                required
                ref={amountRef}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="expenseAmount">
              <Form.Label> Choose Budget</Form.Label>
              <Form.Select defaultValue={defaultBudgetId}  ref={budgetIdRef}>
                 <option value={DefaultCategory}>{DefaultCategory}</option>
                 {/* lopping trhought the budgets to get the options budgetId */}
                {budgets.map((budget) => {
                  return (
                    <option key={budget.id} value={budget.id}>
                      {budget.name}
                    </option>
                  )
                })}
              </Form.Select>
            </Form.Group>
            <div className="d-flex justify-content-end">
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
