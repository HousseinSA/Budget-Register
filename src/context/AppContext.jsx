import React, {useContext} from "react"
import {v4 as uuid} from "uuid"
import useLocalStorage from "../CustomHooks/useLocalStorage"
// import all the neede values and functions
// creating new React context
const createContext = React.createContext()
// useAppContext hook to get all the constext values
export function useAppContext() {
  return useContext(createContext)
}
// default Category value
export const DefaultCategory = "Uncategorized"
export default function AppContext({children}) {
  // states for budges and expneses that using useLocalS hook
  const [budgets, setBudgets] = useLocalStorage("budget", [])
  const [expenses, setExpenses] = useLocalStorage("expense", [])
  // adding budget hook 
  function addBudget({name, max}) {
    // add new budget and check that there is match of budget
    setBudgets((prevBudget) => {
      if (prevBudget.find((prevB) => prevB.name === name)) return prevBudget
      return [...prevBudget, {id: uuid(), name, max}]
    })
  }
  // adding new expense  
  function addExpense({discreption, budgetId, expenseAmount}) {
    setExpenses((prevExpenses) => {
      return [
        ...prevExpenses,
        {id: uuid(), discreption, budgetId, expenseAmount},
      ]
    })
  }
  // getting the expenses of purticaler budget
  function getBudgetId(budgetId) {
    return expenses.filter((expense) => {
      return expense.budgetId === budgetId
    })
  }
  // remove budget 
  function removeBudget({id}) {
    // see if budged is delete then make the expense to uncategory budget
    setExpenses((prevExpenses) => {
      return prevExpenses.map((expense) => {
        if (expense.budgetId !== id) return expense
        return {...expense, budgetId: DefaultCategory}
      })
    })
    setBudgets((prevBudgets) => {
      return prevBudgets.filter((budget) => budget.id !== id)
    })
  }
  // remove expense function
  function removeExpnese({id}) {
    setExpenses((prevExpenses) => {
      return prevExpenses.filter((expense) => expense.id !== id)
    })
  }
  return (
    <createContext.Provider
    // all the values of context Provider
      value={{
        budgets,
        expenses,
        addBudget,
        addExpense,
        getBudgetId,
        removeExpnese,
        removeBudget,
      }}>
      {children}
    </createContext.Provider>
  )
}
