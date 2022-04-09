import { StyleSheet, Text, View, Dimensions, TouchableOpacity, TouchableHighlight } from 'react-native'
import React, { useState, useEffect } from 'react'
import useQuestion from '../hooks/useQuestion'
import Theme from '../Theme'
import { useSelector } from 'react-redux'
import Cross from '../icons/Cross'
import Circle from '../icons/Circle'
import * as StorageHelper from '../storage/storageHelper'

const winX = Dimensions.get('window').width

const Exam = () => {
  const { question,
    getRandomQuestion,
    getRandomSelectQuestion,
    getRandomYesNoQuestion,
    getRandomQuestionFromSheet,
    getYesNoQuestionFromSheet,
    getSelectQuestionFromSheet,
    getFailedQuestions
  } = useQuestion()
  const sheet = useSelector(state => state.sheetReducer.sheet)
  const mode = useSelector(state => state.modeReducer.mode)
  const type = useSelector(state => state.typeReducer.type)
  const [selection, setSelection] = useState(null);

  const filterQuestion = async () => {
    setSelection(null)
    if (sheet === 'all') {
      if (type === '是非') return getRandomYesNoQuestion()
      if (type === '選擇') return getRandomSelectQuestion()
      getRandomQuestion()
    } else {
      if (type === '是非') return getYesNoQuestionFromSheet(sheet)
      if (type === '選擇') return getSelectQuestionFromSheet(sheet)
      getRandomQuestionFromSheet(sheet)
    }
  }

  const answering = (answerObj) => async () => {
    setSelection(answerObj)
    console.log(answerObj, question.ans)
    const str = (obj) => JSON.stringify(obj)
    if (str(answerObj) == str(question.ans)) return
    let questionFailed = JSON.parse(await StorageHelper.get('questionFailed'))
    if (!questionFailed) questionFailed = []
    const index = questionFailed.findIndex(item => item.qid === question.qid)
    index === -1
      ? questionFailed.push({ qid: question.qid, times: 1 })
      : questionFailed[index].times++
    console.log(questionFailed)
    await StorageHelper.set('questionFailed', JSON.stringify(questionFailed))
  }

  useEffect(() => {
    filterQuestion()
  }, [])
  useEffect(() => {
    console.log('useEffect', question)
  }, [question])

  return (
    <View style={styles.container}>
      {console.log(question)}
      <View style={styles.statementBox}>
        <Text style={styles.statement}>{question.statement}</Text>
      </View>
      {
        question.type === 'YN'
          ? <View style={styles.yesNoAnswerBox} onTouchStart={() => { selection !== null && filterQuestion() }}>
            <YNButton type={'true'} selection={selection} showAnswer={selection && question.ans.content === true} f={answering({ content: true })} />
            <YNButton type={'false'} selection={selection} showAnswer={selection && question.ans.content === false} f={answering({ content: false })} />
          </View>
          : <View style={styles.selectAnswerBox} onTouchStart={() => { selection !== null && filterQuestion() }}>
            {question.candidates.map(item => (
              <SelectionButton key={item.content.toString()} selection={selection} showAnswer={selection && item.NO == question.ans.NO} NO={item.NO} text={item.content} f={answering(item)} />
            ))}
          </View>
      }
    </View>
  )
}

const YNButton = ({ selection, type, f, showAnswer }) => {
  const text = type === 'true' ? <Circle size={68} style={{ color: '#393' }} /> : <Cross size={80} style={{ color: '#933' }} />
  return (
    <TouchableOpacity disabled={selection !== null} onPress={f} style={[styles.YNButton, { backgroundColor: showAnswer ? (type === 'true' ? '#bfb' : '#fbb') : (type === 'true' ? '#f3fff3' : '#fff3f3') }]}>
      {text}
    </TouchableOpacity >
  )
}

const SelectionButton = ({ selection, NO, text, f, showAnswer }) => {
  return (
    <TouchableOpacity disabled={selection !== null} onPress={f} style={[styles.SelectionButton, showAnswer && { backgroundColor: '#19896466' }]} >
      <Text style={{ fontSize: 28 }}>
        {NO}. {text}
      </Text>
    </TouchableOpacity>
  )
}

export default Exam

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  statementBox: {
    // borderWidth: 1,
    width: '80%',
    height: '35%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  statement: {
    fontSize: 22,
    lineHeight: 32,
    fontWeight: '700',
    color: Theme.primaryDark,
    textAlign: 'center'
  },
  yesNoAnswerBox: {
    // borderWidth: 1,
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectAnswerBox: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  YNButton: {
    width: '50%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  SelectionButton: {
    marginBottom: 2,
    width: '100%',
    height: '33%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee'
  }
})