import Questions from "../questions"
import { useState } from 'react'

const useQuestion = () => {

  const [question, setQuestion] = useState({
    qid: '000',
    type: 'YN',
    statement: '',
    candidates: [{}, {}],
    ans: {},
    sheet: '',
  });

  //隨機取一題
  const getRandomQuestion = () => {
    const copy = [...Questions]
    const result = Questions[Math.floor(Questions.length * Math.random())]
    setQuestion(result)
  }

  // 隨機取一是非題
  const getRandomYesNoQuestion = () => {
    const copy = [...Questions]
    const yesNoQuestions = copy.filter(item => item.type === 'YN')
    const result = yesNoQuestions[Math.floor(Math.random * yesNoQuestions.length)]
    setQuestion(result)
  }

  // 隨機取一選擇題
  const getRandomSelectQuestion = () => {
    const copy = [...Questions]
    const selectQuestions = copy.filter(item => item.type === 'SELECT')
    const result = selectQuestions[Math.floor(Math.random * selectQuestions.length)]
    setQuestion(result)
  }

  // 從某卷取一題
  const getRandomQuestionFromSheet = (sheetName) => {

    const copy = [...Questions]
    const sheetQuestions = copy.filter(item => item.sheet === sheetName)
    const result = sheetQuestions[Math.floor(sheetQuestions.length * Math.randoom())]
    setQuestion(result)
  }

  // 從某卷取一是非題
  const getYesNoQuestionFromSheet = (sheetName) => {
    const copy = [...Questions]
    const sheetYesNoQuestions = copy.filter(item => item.sheet === sheetName & item.type === 'YN')
    const result = sheetYesNoQuestions[Math.floor(sheetYesNoQuestions.length * Math.randoom())]
    setQuestion(result)
  }

  // 從某卷取一選擇題
  const getSelectQuestionFromSheet = (sheetName) => {

    const copy = [...Questions]
    const sheetSelectQuestions = copy.filter(item => item.sheet === sheetName & item.type === 'SELECT')
    const result = sheetSelectQuestions[Math.floor(sheetSelectQuestions.length * Math.randoom())]
    setQuestion(result)
  }


  return {
    question,
    getRandomQuestion,
    getRandomYesNoQuestion,
    getRandomSelectQuestion,
    getRandomQuestionFromSheet,
    getYesNoQuestionFromSheet,
    getSelectQuestionFromSheet
  }
}

export default useQuestion