import * as Action from '../actions'

const initState = { mode: '隨機' }

const modeReducer = (state = initState, action) => {
  switch (action.type) {
    case Action.SET_MODE:
      return { mode: action.payload.mode }
    default: return state
  }
}

export default modeReducer