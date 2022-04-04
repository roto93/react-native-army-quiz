import { StyleSheet, Text, View, Dimensions, TouchableOpacity, TouchableHighlight } from 'react-native'
import React, { useState, useEffect } from 'react'
import useQuestion from '../hooks/useQuestion'
import { addIgnorePatterns } from 'react-native/Libraries/LogBox/Data/LogBoxData'
import Theme from '../Theme'
import { useSelector } from 'react-redux'
import Cross from '../icons/Cross'
import Circle from '../icons/Circle'

const winX = Dimensions.get('window').width

const Exam = () => {
  const { question,
    getRandomQuestion,
    getRandomSelectQuestion,
    getRandomYesNoQuestion,
    getRandomQuestionFromSheet,
    getYesNoQuestionFromSheet,
    getSelectQuestionFromSheet
  } = useQuestion()
  const sheet = useSelector(state => state.sheetReducer.sheet)
  const mode = useSelector(state => state.modeReducer.mode)
  const type = useSelector(state => state.typeReducer.type)
  const [selection, setSelection] = useState(null);

  const filterQuestion = () => {
    console.log(sheet, mode, type)
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

  useEffect(() => {
    filterQuestion()
  }, [])
  useEffect(() => {
    console.log(question)
  }, [question])

  return (
    <View style={styles.container}>
      <View style={styles.statementBox}>
        <Text style={styles.statement}>{question.statement}</Text>
        <Text>{mode}</Text>
        <Text>{sheet}</Text>
        <Text>{type}</Text>
      </View>
      {
        question.type === 'YN'
          ? <View style={styles.yesNoAnswerBox} onTouchStart={() => { selection !== null && filterQuestion() }}>
            <YNButton type={'true'} selection={selection} showAnswer={selection && question.ans.content === true} f={() => setSelection({ content: true })} />
            <YNButton type={'false'} selection={selection} showAnswer={selection && question.ans.content === false} f={() => setSelection({ content: true })} />
          </View>
          : <View style={styles.selectAnswerBox} onTouchStart={() => { selection !== null && filterQuestion() }}>
            {question.candidates.map(item => (
              <SelectionButton key={item.content.toString()} selection={selection} showAnswer={selection && item.NO == question.ans.NO} NO={item.NO} text={item.content} f={() => { console.log(item, question.ans); setSelection(item) }} />
            ))}
          </View>

      }
    </View>
  )
}

const YNButton = ({ selection, type, f, showAnswer }) => {
  const text = type === 'true' ? <Circle size={68} style={{ color: '#393' }} /> : <Cross size={80} style={{ color: '#933' }} />
  return (
    <TouchableOpacity disabled={selection !== null} onPress={f} style={[styles.YNButton, { backgroundColor: showAnswer ? (type === 'true' ? '#bfb' : '#fbb') : (type === 'true' ? '#f3fff3' : '#fff3f3'), borderWidth: showAnswer ? 1 : 0 }]}>
      {text}
    </TouchableOpacity >
  )
}

const SelectionButton = ({ selection, NO, text, f, showAnswer }) => {
  return (
    <TouchableHighlight disabled={selection !== null} underlayColor={'#eee'} onPress={f} style={[styles.SelectionButton, showAnswer && { backgroundColor: '#19896466' }]} >
      <Text style={{ fontSize: 28 }}>
        {NO}. {text}
      </Text>
    </TouchableHighlight>
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
    fontSize: 18,
    lineHeight: 24,
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
    // borderWidth: 1,
    borderTopWidth: 1,
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
    borderBottomWidth: 1,
    width: '100%',
    height: '33.3%',
    justifyContent: 'center',
    alignItems: 'center'
  }
})