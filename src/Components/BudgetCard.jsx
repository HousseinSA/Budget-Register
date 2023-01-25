import React from "react"
import {Button, Card, ProgressBar} from "react-bootstrap"
import {currencyFormatter} from "../Utils"
// importing all the needed functions and values
export default function BudgetCard({
  name,
  amount,
  max,
  addExpense,
  gray,
  onViewExpense,
}) {
  // condition to see if the classname is big or small the amount the chaniging the background of cards
  const className = []
  if (amount > max) {
    className.push("bg-danger", "bg-opacity-10")
  } else if (gray) {
    className.push("bg-light")
  }
  return (
    <>
      <Card>
    
        <Card.Body className={className.join(" ")}>
          <Card.Title className="d-flex justify-content-between align-items-baseline fw-normal mb-3  ">
            <div className="me-auto">{name}</div>
            <div> {currencyFormatter.format(amount)}</div>
            <div className="text-muted fs-6 ms-2">
              {/* condition to see if max is deffined that show the max value */}
              {max && "/" + currencyFormatter.format(max)}
            </div>
          </Card.Title>
          {/* condition to see is max there then show the progress bar */}
          {max && (
            <ProgressBar
              className="rounded-pill"
              variant={handelVariant(amount, max)}
              min={0}
              max={max}
              now={amount}
            />
          )}
          {/* condition to see if addExpense is there then show the button  */}
          {addExpense && (
            <div className="d-flex justify-content-end alingn-items-baseline gap-2 mt-4 ">
              <Button variant="outline-primary" onClick={addExpense}>
                Add Expense
              </Button>
              <Button variant="outline-secondary" onClick={onViewExpense}>
                View Expense
              </Button>
            </div>
          )}
        </Card.Body>
      </Card>
    </>
  )
}
// function to handel the variant of progress bar
function handelVariant(amount, max) {
  const percentage = amount / max
  if (percentage < 0.5) {
    return "primary"
  }
  if (percentage < 0.8) {
    return "warning"
  }
  return "danger"
}
