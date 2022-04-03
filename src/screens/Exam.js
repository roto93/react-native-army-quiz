import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import useQuestion from '../hooks/useQuestion'
import { addIgnorePatterns } from 'react-native/Libraries/LogBox/Data/LogBoxData'
import Theme from '../Theme'

const Exam = () => {
  const { question, getRandomQuestion } = useQuestion()
  useEffect(() => {
    getRandomQuestion()
  }, [])
  return (
    <View style={styles.container}>
      <View style={styles.statementBox}>
        <Text style={styles.statement}>{question.statement}</Text>
      </View>
      {
        question.type === 'YN'
          ? <View style={styles.yesNoAnswerBox}>

          </View>
          : <View style={styles.selectAnswerBox}>

          </View>

      }
    </View>
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
    borderWidth: 1,
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

  }
})