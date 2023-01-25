export const currencyFormatter = new Intl.NumberFormat(undefined, {
  style: "currency",
  currency: "usd",
  minimumFractionDigits: 0,
})
// the variable that add the dollar sign to the number 
