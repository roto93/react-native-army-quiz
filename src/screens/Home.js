import React, { useState } from 'react'
import { StyleSheet, Text, View, Button, TouchableOpacity, Platform } from 'react-native'
import Theme from '../Theme'
import { Picker } from '@react-native-picker/picker'
import TO from '../components/TO'
import RowView from '../components/RowView'
import { useDispatch, useSelector } from 'react-redux'
import * as Action from '../redux/actions'

const Home = ({ navigation }) => {
  const navigate = (goto) => () => navigation.navigate(goto)
  // const [sheet, setSheet] = useState('all');
  // const [mode, setMode] = useState('隨機');
  // const [type, setType] = useState('是非');
  const mode = useSelector(state => state.modeReducer.mode)
  const setMode = (str) => dispatch(Action.setMode(str))
  const sheet = useSelector(state => state.sheetReducer.sheet)
  const setSheet = (str) => dispatch(Action.setSheet(str))
  const type = useSelector(state => state.typeReducer.type)
  const setType = (str) => dispatch(Action.setType(str))
  const dispatch = useDispatch()

  return (
    <View style={styles.container}>
      <Text style={styles.title}>中坑精北營區{'\n'}新訓鑑測學科測驗</Text>
      {/* <RowView>
        <TO t='隨機' f={() => setMode('隨機')} small varient={mode !== '隨機' ? 'outlined' : 'filled'} />
        <TO t='依序' f={() => setMode('依序')} small varient={mode !== '依序' ? 'outlined' : 'filled'} style={{ marginLeft: 40 }} />
      </RowView> */}
      <RowView style={{ marginTop: 16 }}>
        <TO t='全部' f={() => setType('全部')} secondary tiny varient={type !== '全部' ? 'outlined' : 'filled'} />
        <TO t='是非' f={() => setType('是非')} secondary tiny varient={type !== '是非' ? 'outlined' : 'filled'} style={{ marginHorizontal: 20 }} />
        <TO t='選擇' f={() => setType('選擇')} secondary tiny varient={type !== '選擇' ? 'outlined' : 'filled'} />
      </RowView>
      <Picker
        style={{ width: 240, minHeight: 60, marginBottom: 0, backgroundColor: Platform.OS === 'android' ? '#eee' : 'transparent' }}
        selectedValue={sheet}
        onValueChange={(itemValue) => setSheet(itemValue)}>
        <Picker.Item label={'所有題目'} value={'all'} />
        <Picker.Item label={'甲卷'} value={'甲'} />
        <Picker.Item label={'乙卷'} value={'乙'} />
        <Picker.Item label={'丙卷'} value={'丙'} />
        <Picker.Item label={'丁卷'} value={'丁'} />
        <Picker.Item label={'戊卷'} value={'戊'} />
      </Picker>
      <TO t="開始測驗" f={navigate('Exam')} style={{ marginBottom: 16 }} />
      {/* <TO t="我的紀錄" f={navigate('Statistic')} /> */}
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
    marginBottom: 24,
    marginTop: 36,
    textAlign: 'center',
    lineHeight: 36
  },
})