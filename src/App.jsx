import { useState } from 'react'
import Display from './Display'
import Keypad from './Buttons'
import calculate from './logic'
import "./App.sass"

const Calculator = () => {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const commands = {
    "=": () => {
      setOutput(calculate(input))
      setInput("")
    },
    "AC": () => {
      setInput("")
      setOutput("")
    }
  }

  const handleInput = (char) => {
    if(Object.hasOwn(commands, char)) return commands[char]()
    setInput(input + char)
  } 

  return (
    <main>
      <Display question={input} answer={output} />
      <Keypad handler={handleInput} />
    </main>
  )
}

export default Calculator
