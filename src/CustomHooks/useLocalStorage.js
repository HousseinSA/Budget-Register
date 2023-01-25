import {useEffect, useState} from "react"
// useLocalStorage hooks to add data to local Storage 
export default function useLocalStorage(type, defaultValue) {
  const [value, setValue] = useState(() => {
    const jsonValue = localStorage.getItem(type)
    if (jsonValue !== null) return JSON.parse(jsonValue)
    if (typeof defaultValue === "function") return defaultValue()
    return defaultValue
  })
  useEffect(() => {
    localStorage.setItem(type, JSON.stringify(value))
  }, [value, type])
  return [value, setValue]
}
