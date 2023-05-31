import { useDispatch } from 'react-redux'
import { chooseOperation } from './features/calculator/calculatorSlice'

const OperationButton = ({operation}) => {

    const dispatch = useDispatch()

    return (
        <button onClick={() => dispatch(chooseOperation(operation))}>
            { operation }
        </button>
    );
}
 
export default OperationButton;