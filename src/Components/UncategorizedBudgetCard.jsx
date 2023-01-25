import {DefaultCategory, useAppContext} from "../context/AppContext"
import BudgetCard from "./BudgetCard"
// importing budgetCard , and defaultCat and useAppContext to get the values
export default function UncategorizedBudgetCard({onViewExpense, addExpense}) {
  // getting the getBudgetId function with useAppContext
  const {getBudgetId} = useAppContext()
  // calculate the amount  defaultCat expneses 
  const amount = getBudgetId(DefaultCategory).reduce((total, amount) => {
    return total + amount.expenseAmount
  }, 0)
  if (amount === 0) return null
  return (
    <BudgetCard
      name={DefaultCategory}
      onViewExpense={onViewExpense}
      amount={amount}
      gray
      addExpense={addExpense}
    />
  )
}
