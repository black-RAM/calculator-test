import PropTypes from 'prop-types'
import "./Buttons.scss"

const CalculatorButton = ({data}) => {
  const listener = () => data.listener(data.symbol)
  return <button type="button" id={data.word} onClick={listener}>{data.symbol}</button>
}

CalculatorButton.propTypes = {
  data: PropTypes.shape({
    word: PropTypes.string,
    symbol: PropTypes.string,
    listener: PropTypes.func
  })
}

const Keypad = (props) => {
  const drafter = (word, symbol, listener = props.handler) => ({word, symbol, listener})
  const drafts = {
    operands: [
      drafter("nine", "9"),
      drafter("eight", "8"),
      drafter("seven", "7"),
      drafter("six", "6"),
      drafter("five", "5"),
      drafter("four", "4"),
      drafter("three", "3"),
      drafter("two", "2"),
      drafter("one", "1"),
      drafter("zero", "0"),
      drafter("decimal", "."),
      drafter("clear", "C"),
    ],
    operators: [
      drafter("add", "+"),
      drafter("subtract", "-"),
      drafter("multiply", "*"),
      drafter("divide", "/"),
      drafter("equals", "=")
    ]
  }
  
  const createButton = (draft, index) => {
    return <CalculatorButton data={draft} key={index} />
  }

  const operands = drafts.operands.map(createButton)
  const operators = drafts.operators.map(createButton)

  return (
    <section id="buttons">
      <div>{operands}</div>
      <div>{operators}</div>
    </section>
  )
}

Keypad.propTypes = {
  handler: PropTypes.func
}

export default Keypad