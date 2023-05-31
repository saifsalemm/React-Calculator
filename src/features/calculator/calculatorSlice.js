import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  currentOperand: '',
  previousOperand: '',
  operation: '',
  overwrite: false
}

export const calculatorSlice = createSlice({
  name: 'calculator',
  initialState,
  reducers: {
    addDigit: (state, action) => {
        if (state.overwrite) {
            state.currentOperand = action.payload
            state.overwrite = false
            return
          }
          if (action.payload === "0" && state.currentOperand === "0") {
            return state
          }
          if (action.payload === "." && state.currentOperand.includes(".")) {
            return state
          }
    
          state.currentOperand = `${state.currentOperand || ""}${action.payload}`
    },
    chooseOperation: (state, action) => {
        if (state.currentOperand === '' && state.previousOperand === '') {
            return state
          }
    
          if (state.currentOperand === '') {
              state.operation = action.payload
              return state
          }
    
          if (state.previousOperand === '') {
                state.operation = action.payload
                state.previousOperand = state.currentOperand
                state.currentOperand = ''
                return state
          }
    
            const prev = parseFloat(state.previousOperand)
            const current = parseFloat(state.currentOperand)
            if (isNaN(prev) || isNaN(current)) return ""
            let computation = ""
            if(state.operation === '+') {
                computation = prev + current
            }
            else if(state.operation === '-') {
                computation = prev - current
            }
            else if(state.operation === '*') {
                computation = prev * current
            }
            else if(state.operation === '÷') {
                computation = prev / current
            }
            state.previousOperand = computation.toString()
            state.operation = action.payload
            state.currentOperand = ''
    },
    clear: (state) => {
        state.currentOperand = ''
        state.previousOperand = ''
        state.operation = ''
        state.overwrite = false
    },
    deleteDigit: (state) => {
        if (state.overwrite) {
            state.overwrite = false
            state.currentOperand = ''
            return
          }
          if (state.currentOperand === '') return state
          if (state.currentOperand.length === 1) {
            state.currentOperand = ''
            return
          }
    
        state.currentOperand = state.currentOperand.slice(0, -1)
    },
    evaluate: (state) => {
        if (
            state.operation === '' ||
            state.currentOperand === '' ||
            state.previousOperand === ''
        ) {
            return state
        }

        state.overwrite = true
        const prev = parseFloat(state.previousOperand)
        const current = parseFloat(state.currentOperand)
        if (isNaN(prev) || isNaN(current)) return ""
        let computation = ""
        if(state.operation === '+') {
            computation = prev + current
        }
        else if(state.operation === '-') {
            computation = prev - current
        }
        else if(state.operation === '*') {
            computation = prev * current
        }
        else if(state.operation === '÷') {
            computation = prev / current
        }
        state.currentOperand = computation.toString()
        state.previousOperand = ''
        state.operation = ''
    },
  },
})

// Action creators are generated for each case reducer function
export const { addDigit, chooseOperation, clear, deleteDigit, evaluate } = calculatorSlice.actions

export default calculatorSlice.reducer