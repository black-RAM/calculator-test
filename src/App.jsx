import { Component } from 'react'
import Keypad from './Buttons'
import "./App.sass"

class Calculator extends Component {
  render() {
    return (
      <main>
        <Keypad />
      </main>
    )
  }
}

export default Calculator
