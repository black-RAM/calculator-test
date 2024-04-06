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

  const handleExceptions = (char) => {
    const numbers = input.match(/\d+(\.\d+)?/g) || ["0"]
    const lastChar = input.slice(-1)
    let accept = true

    if(/\./.test(char)) {
      accept = /^\d+$/.test(numbers.pop()) && !/\./.test(lastChar)
    } else if (/0/.test(char)) {
      accept = /^(?!0{1,})\d+$/.test(numbers.pop())
    } else if(/[+*/]/.test(char) && /[+*/-]/.test(lastChar)) {
      let removeIndex = -1
      if(/-/.test(lastChar)) removeIndex = -2
      setInput(prevInput => prevInput.slice(0, removeIndex) + char)
      accept = false
    }

    if(output) {
      if(/[+*/-]/.test(char)) {
        setInput(() => output + char)
      } else {
        setInput(() => char)
      }
      setOutput(() => "")
    }

    return accept ? char : ""
  }

  const handleInput = (char) => {
    if(Object.hasOwn(commands, char)) return commands[char]()
    setInput(prevInput => prevInput + handleExceptions(char))
  } 

  return (
    <main>
      <Display question={input} answer={output} />
      <Keypad handler={handleInput} />
    </main>
  )
}

export default Calculator
