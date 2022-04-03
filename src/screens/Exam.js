import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import useQuestion from '../hooks/useQuestion'
import { addIgnorePatterns } from 'react-native/Libraries/LogBox/Data/LogBoxData'
import Theme from '../Theme'
import { useSelector } from 'react-redux'
import Cross from '../icons/Cross'
import Circle from '../icons/Circle'

const winX = Dimensions.get('window').width

const Exam = () => {
  const { question, getRandomQuestion } = useQuestion()
  const sheet = useSelector(state => state.sheetReducer.sheet)
  const mode = useSelector(state => state.modeReducer.mode)
  const type = useSelector(state => state.typeReducer.type)
  const [selection, setSelection] = useState(null);
  useEffect(() => {
    getRandomQuestion()
  }, [])
  useEffect(() => {
    console.log(selection)
  }, [selection])
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
          ? <View style={styles.yesNoAnswerBox}>
            <YNButton type={'true'} f={() => setSelection({ content: 'true' })} />
            <YNButton type={'false'} f={() => setSelection({ content: 'false' })} />
          </View>
          : <View style={styles.selectAnswerBox}>
            {question.candidates.map(item => (
              <SelectionButton key={item.content.toString()} text={item.content} f={() => { setSelection(item) }} />
            ))}
          </View>

      }
    </View>
  )
}

const YNButton = ({ type, f }) => {
  const text = type === 'true' ? <Circle size={68} style={{ color: '#393' }} /> : <Cross size={80} style={{ color: '#933' }} />
  return (
    <TouchableOpacity onPress={f} style={[styles.YNButton, { backgroundColor: type === 'true' ? '#efe' : '#fee' }]}>
      {text}
    </TouchableOpacity>
  )
}

const SelectionButton = ({ text, f }) => {
  return (
    <TouchableOpacity onPress={f} style={styles.SelectionButton} >
      <Text style={{ fontSize: 28 }}>
        {text}
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
    height: '33%',
    justifyContent: 'center',
    alignItems: 'center'
  }
})