import React, { useState } from 'react'
import { StyleSheet, Text, View, Button, TouchableOpacity, Platform } from 'react-native'
import Theme from '../Theme'
import { Picker } from '@react-native-picker/picker'
import TO from '../components/TO'
import RowView from '../components/RowView'

const Home = ({ navigation }) => {
  const navigate = (goto) => () => navigation.navigate(goto)
  const [sheet, setSheet] = useState('all');
  const [mode, setMode] = useState('隨機');
  return (
    <View style={styles.container}>
      <Text style={styles.title}>中坑精北營區{'\n'}新訓鑑測學科測驗</Text>
      <RowView>
        <TO t='隨機' f={() => setMode('隨機')} small varient={mode !== '隨機' ? 'outlined' : 'filled'} unselected={mode !== '隨機'} />
        <TO t='依序' f={() => setMode('依序')} small varient={mode !== '依序' ? 'outlined' : 'filled'} style={{ marginLeft: 40 }} unselected={mode !== '依序'} />
      </RowView>
      <Picker
        style={{ width: 240, minHeight: 60, marginBottom: 40, backgroundColor: Platform.OS === 'android' ? '#eee' : 'transparent' }}
        selectedValue={sheet}
        onValueChange={(itemValue, itemIndex) =>
          setSheet(itemValue)
        }>
        <Picker.Item label={'所有題目'} value={'all'} />
        <Picker.Item label={'甲卷'} value={'甲'} />
        <Picker.Item label={'乙卷'} value={'乙'} />
        <Picker.Item label={'丙卷'} value={'丙'} />
        <Picker.Item label={'丁卷'} value={'丁'} />
        <Picker.Item label={'戊卷'} value={'戊'} />
      </Picker>
      <TO t="開始測驗" f={navigate('Exam')} style={{ marginBottom: 24 }} />
      <TO t="我的紀錄" f={navigate('Statistic')} />
    </View>
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
})