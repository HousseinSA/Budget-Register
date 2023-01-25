import {Button, Modal, Stack} from "react-bootstrap"
import {DefaultCategory, useAppContext} from "../context/AppContext"
import {currencyFormatter} from "../Utils"
// import utils and react-bootstrap styling and defaultCat value and useAppContext to the values
export default function ViewExpenseModal({budgetId, handelClose}) {
  // getting all the needed functions and values from appcontext component
  const {budgets, getBudgetId, removeBudget, removeExpnese} = useAppContext()
  // making condition if budgetId == defaultCard or not 
  const budget =
    budgetId === DefaultCategory
      ? {name: DefaultCategory, budgetId: DefaultCategory}
      : budgets.find((b) => b.id === budgetId)
      // getting the expense but the budgetId 
  const expense = getBudgetId(budgetId)

  return (
    <>
    {/* modal container for viewExpense */}
      <Modal show={budgetId} className="p-2" onHide={handelClose}>
  
        <Modal.Header closeButton={handelClose}>
          <Modal.Title>
            <Stack direction="horizontal" gap="2">
              <div> {budget?.name}</div>
              {/* if budgetId notEqual to defaultCat so the buttons will be shown */}
              {budgetId !== DefaultCategory && (
                // onClick event to delete an budget 
                <Button
                  variant="outline-danger"
                  onClick={() => {
                    removeBudget(budget)
                    handelClose()
                  }}>
                  Delete
                </Button>
              )}
            </Stack>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Stack direction="vertical" gap="2">
            {/* loop throught the budget expenses */}
            {expense.map((exp) => {
              return (
                <Stack direction="horizontal" gap="2" key={exp.id}>
                  <div className="me-auto fs-4">{exp.discreption}</div>
                  <div className="me-2 fs-5">
                    {/* formatting the expense amount  */}
                    {currencyFormatter.format(exp.expenseAmount)}
                  </div>
                  {/* deleting the expense  */}
                  <Button
                    variant="outline-danger"
                    onClick={() => removeExpnese(exp)}>
                    &times;
                  </Button>
                </Stack>
              )
            })}
          </Stack>
        </Modal.Body>
      </Modal>
    </>
  )
}
