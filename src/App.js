import './index.css';
import DigitButton from "./DigitButton"
import OperationButton from "./OperationButton"
import { useSelector, useDispatch } from 'react-redux'
import { clear, deleteDigit, evaluate } from './features/calculator/calculatorSlice'

function App() {
  const {currentOperand, previousOperand, operation} = useSelector((state) => state.calculator)
  const dispatch = useDispatch()
  
  const INTEGER_FORMATTER = new Intl.NumberFormat("en-us", {
    maximumFractionDigits: 0,
  })
  function formatOperand(operand) {
    if (operand == null) return
    const [integer, decimal] = operand.split(".")
    if (decimal == null) return INTEGER_FORMATTER.format(integer)
    return `${INTEGER_FORMATTER.format(integer)}.${decimal}`
  }

  return (
    <div className="calculator-grid">
      <div className="output">
        <div className="previous-operand">
          {formatOperand(previousOperand)} {operation}
        </div>
        <div className="current-operand">
          {formatOperand(currentOperand)}
        </div>
      </div>
      <button
        className="span-two"
        onClick={() => dispatch(clear())}
      >
        AC
      </button>
      <button
        onClick={() => dispatch(deleteDigit())}
      >
        DEL
      </button>
      <OperationButton operation="÷" />
      <DigitButton digit="1" />
      <DigitButton digit="2" />
      <DigitButton digit="3" />
      <OperationButton operation="*" />
      <DigitButton digit="4" />
      <DigitButton digit="5" />
      <DigitButton digit="6" />
      <OperationButton operation="+" />
      <DigitButton digit="7" />
      <DigitButton digit="8" />
      <DigitButton digit="9" />
      <OperationButton operation="-" />
      <DigitButton digit="." />
      <DigitButton digit="0" />
      <button
        className="span-two"
        onClick={() => dispatch(evaluate())}
      >
        =
      </button>
    </div>
  );
}

export default App;
