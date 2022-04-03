export const SET_MODE = 'SET_MODE'
export const SET_SHEET = 'SET_SHEET'
export const SET_TYPE = 'SET_TYPE'

export const setMode = (str) => {
  return {
    type: SET_MODE,
    payload: { mode: str }
  }
}

export const setSheet = (str) => {
  return {
    type: SET_SHEET,
    payload: { sheet: str }
  }
}

export const setType = (str) => {
  return {
    type: SET_TYPE,
    payload: { type: str }
  }
}