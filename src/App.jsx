import React, {useState} from "react"
import {Button, Container, Stack} from "react-bootstrap"
import BudgetCard from "./Components/BudgetCard"
import BudgetModal from "./Components/BudgetModal"
import ExpenseModal from "./Components/ExpenseModal"
import TotalCard from "./Components/TotalCard"
import UncategorizedBudgetCard from "./Components/UncategorizedBudgetCard"
import ViewExpenseModal from "./Components/ViewExpneseModal"
import {DefaultCategory, useAppContext} from "./context/AppContext"
// import all the components and functions need to app component
export default function App() {
  // useStates for the click eventListner to show or hide Modals and getting the budgetiD 
  const {budgets, getBudgetId} = useAppContext()
  const [budgetModalState, setBudgetModalState] = useState(false)
  const [expenseModalState, setExpenseModalState] = useState(false)
  const [expenseBudgetId, setExpenseBudgetId] = useState()
  const [ViewExpenseId, setViewExpenseId] = useState()
  // function to handel expenseModalState and getting the budgetId to ExpenseBudgetId
  function handelnewExpense(budgetId) {
    setExpenseModalState(true)
    setExpenseBudgetId(budgetId)
  }

  return (
    <>
    {/* main container for the app  */}
      <Container className="my-4">
        <Stack direction="horizontal" gap="2" className="fs-2">
          <div className="me-auto">
            Budget <span className="text-primary fw-bold">Register</span>
          </div>
          <div className=" d-flex gap-2">
            {/* click eventListner for budgetModalState */}
            <Button variant="primary" onClick={() => setBudgetModalState(true)}>
              Add Budget
            </Button>
            {/* click eventListner for handelNewExpense function */}
            <Button variant="outline-primary" onClick={handelnewExpense}>
              Add Expense
            </Button>
          </div>
        </Stack>
        <div
          className="my-4"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, min-max(300px, 1fr))",
            gap: "1rem",
          }}>
            {/* loop function for budget */}
          {budgets.map((budget) => {
// getting all the amount of expense of budget and calculate them
            const amount = getBudgetId(budget.id).reduce(
              (total, currentValue) => total + currentValue.expenseAmount,
              0
            )
            // return the budgetCard of all budget in cards
            return (
              <BudgetCard
                key={budget.id}
                name={budget.name}
                max={budget.max}
                amount={amount}
                addExpense={() => handelnewExpense(budget.id)}
                onViewExpense={() => setViewExpenseId(budget.id)}
              />
            )
          })}
       {/* custom budgetCard for uncategorized budgets*/}
          <UncategorizedBudgetCard
            addExpense={() => handelnewExpense(DefaultCategory)}
            onViewExpense={() => setViewExpenseId(DefaultCategory)}
          />
          {/* total card to calculat all the expense on the budget amount */}
          <TotalCard />
        </div>
      </Container>
      {/* modal section  */}
      {/* adding budget modal  */}
      <BudgetModal
        show={budgetModalState}
        handelClose={() => setBudgetModalState(false)}
      />
      {/* adding expense modal  */}
      <ExpenseModal
        show={expenseModalState}
        handelClose={() => setExpenseModalState(false)}
        defaultBudgetId={expenseBudgetId}
      />
      {/* view an expense modals  */}
      <ViewExpenseModal
        budgetId={ViewExpenseId}
        handelClose={() => setViewExpenseId()}
      />
    </>
  )
}
