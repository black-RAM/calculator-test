import PropTypes from 'prop-types'
import "./Buttons.sass"

const CalculatorButton = ({data}) => {
  return <button type="button" id={data.word}>{data.symbol}</button>
}

CalculatorButton.propTypes = {
  data: PropTypes.shape({
    word: PropTypes.string,
    symbol: PropTypes.string,
  })
}

const Keypad = () => {
  const drafter = (word, symbol) => ({word, symbol})
  const drafts = {
    operands: [
      drafter("decimal", "."),
      drafter("zero", 0),
      drafter("one", 1),
      drafter("two", 2),
      drafter("three", 3),
      drafter("four", 4),
      drafter("five", 5),
      drafter("six", 6),
      drafter("seven", 7),
      drafter("eight", 8),
      drafter("nine", 9)
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

export default Keypad