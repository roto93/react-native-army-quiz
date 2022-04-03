import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import useQuestion from '../hooks/useQuestion'

const Exam = () => {
  const { getRandomQuestion } = useQuestion()
  useEffect(() => {
    getRandomQuestion()
  }, [])
  return (
    <View>
      <Text>Exam</Text>
    </View>
  )
}

export default Exam

const styles = StyleSheet.create({})