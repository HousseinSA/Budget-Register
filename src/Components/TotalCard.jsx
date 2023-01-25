import {useAppContext} from "../context/AppContext"
import BudgetCard from "./BudgetCard"
// import budgetCard and useAppContext to get the function and values
export default function TotalCard() {
    // getting the values of budgets and expenses 
  const {budgets, expenses} = useAppContext()
//   reduce funciton to calucle all the amount to expense and budgets 
  const max = budgets.reduce((total, amount) => {
    return total + amount.max
  }, 0)
  const expenseAmount = expenses.reduce((total, amount) => {
    return total + amount.expenseAmount
  }, 0)
  if (max === 0) return null
//   return the total budget card with amount and max values
  return <BudgetCard name="Total" gray amount={expenseAmount} max={max} />
}
