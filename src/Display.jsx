import PropTypes from 'prop-types'

const Display = (props) => {
  return (
    <section id="display">
      <div>{props.question || props.answer ? props.question : "0"}</div>
      <div>{props.answer}</div>
    </section>
  )
}

Display.propTypes = {
  question: PropTypes.string,
  answer: PropTypes.string
}

export default Display