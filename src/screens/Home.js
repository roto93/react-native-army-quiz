import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native'
import React from 'react'
import Theme from '../Theme'

const Home = ({ navigation }) => {
  const navigate = (goto) => () => navigation.navigate(goto)
  return (
    <View style={styles.container}>
      <Text style={styles.title}>中坑精北營區{'\n'}新訓鑑測學科測驗</Text>
      <Picker />
      <TO t="開始測驗" f={navigate('Exam')} />
      <TO t="我的紀錄" f={navigate('Statistic')} />
    </View>
  )
}

const TO = ({ t, f }) => {
  return (
    <TouchableOpacity style={styles.TO} onPress={f}>
      <Text style={styles.TO_text}>{t}</Text>
    </TouchableOpacity>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  title: {
    color: Theme.textDark,
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 40,
    marginTop: 50,
    textAlign: 'center',
    lineHeight: 36
  },
  TO: {
    borderWidth: 1,
    width: 150,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center'
  },
  TO_text: {

  }
})