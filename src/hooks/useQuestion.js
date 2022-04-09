import Questions from "../questions"
import { useState } from 'react'
import * as StorageHelper from '../storage/storageHelper'

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
    const result = yesNoQuestions[Math.floor(Math.random() * yesNoQuestions.length)]
    setQuestion(result)
  }

  // 隨機取一選擇題
  const getRandomSelectQuestion = () => {
    const copy = [...Questions]
    const selectQuestions = copy.filter(item => item.type === 'SELECT')
    const result = selectQuestions[Math.floor(Math.random() * selectQuestions.length)]
    setQuestion(result)
  }

  // 篩出錯過的題目 => array
  const getFailedQuestions = async () => {
    try {
      const res = await StorageHelper.get('questionFailed')
      if (!res) return []
      const qidArray = JSON.parse(res).map(item => item.qid)
      const failedQuestions = qidArray.map(id => Questions.find(item => item.qid === id))
      console.log(failedQuestions)
      return failedQuestions
    } catch (e) {
      console.warn(e.message)
    }
  }

  // 從某卷取一題
  const getRandomQuestionFromSheet = async (sheetName) => {
    try {
      let sheetQuestions
      if (sheetName === '答錯過的') {
        sheetQuestions = await getFailedQuestions()
      } else {
        const copy = [...Questions]
        sheetQuestions = copy.filter(item => item.sheet === sheetName)
      }
      const result = sheetQuestions[Math.floor(sheetQuestions.length * Math.random())]
      setQuestion(result)
    } catch (e) {
      console.log(e.message)
    }
  }

  // 從某卷取一是非題
  const getYesNoQuestionFromSheet = async (sheetName) => {
    try {
      let sheetQuestions
      if (sheetName === '答錯過的') {
        sheetQuestions = await getFailedQuestions()
      } else {
        const copy = [...Questions]
        sheetQuestions = copy.filter(item => item.sheet === sheetName & item.type === 'YN')
      }
      const result = sheetYesNoQuestions[Math.floor(sheetYesNoQuestions.length * Math.random())]
      setQuestion(result)
    } catch (e) { console.warn(e.massage) }
  }

  // 從某卷取一選擇題 => object
  const getSelectQuestionFromSheet = async (sheetName) => {
    try {
      let sheetQuestions
      if (sheetName === '答錯過的') {
        sheetQuestions = await getFailedQuestions()
      } else {
        const copy = [...Questions]
        sheetQuestions = copy.filter(item => item.sheet === sheetName & item.type === 'SELECT')
      }
      const result = sheetSelectQuestions[Math.floor(sheetSelectQuestions.length * Math.random())]
      setQuestion(result)
    } catch (e) {
      console.warn(e.message)
    }
  }


  return {
    question,
    getRandomQuestion,
    getRandomYesNoQuestion,
    getRandomSelectQuestion,
    getRandomQuestionFromSheet,
    getYesNoQuestionFromSheet,
    getSelectQuestionFromSheet,
    getFailedQuestions
  }
}

export default useQuestion