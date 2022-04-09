import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Button, TouchableOpacity, Platform } from 'react-native'
import Theme from '../Theme'
import { Picker } from '@react-native-picker/picker'
import TO from '../components/TO'
import RowView from '../components/RowView'
import { useDispatch, useSelector } from 'react-redux'
import * as Action from '../redux/actions'
import * as StorageHelper from '../storage/storageHelper'
import { useIsFocused } from '@react-navigation/native'

const Home = ({ navigation }) => {
  const navigate = (goto) => () => navigation.navigate(goto)
  // const [sheet, setSheet] = useState('all');
  // const [mode, setMode] = useState('隨機');
  // const [type, setType] = useState('是非');
  const [haveFailedQuestion, setHaveFailedQuestion] = useState(false);
  const mode = useSelector(state => state.modeReducer.mode)
  const setMode = (str) => dispatch(Action.setMode(str))
  const sheet = useSelector(state => state.sheetReducer.sheet)
  const setSheet = (str) => dispatch(Action.setSheet(str))
  const type = useSelector(state => state.typeReducer.type)
  const setType = (str) => dispatch(Action.setType(str))
  const dispatch = useDispatch()

  const isFocus = useIsFocused()

  const checkFailedQuestions = async () => {
    try {
      console.log('checking')
      const res = await StorageHelper.get('questionFailed')
      console.log('checking res = ', res)
      if (!res) return false
      const questionFailed = JSON.parse(res)
      setHaveFailedQuestion(questionFailed.length > 0)
      console.log('checking questionFailed length = ', questionFailed.length)
    } catch (e) {
      console.warn(e)
    }
  }

  const removeAsyncStorage = async () => {
    try {
      setHaveFailedQuestion(false)
      const res = await StorageHelper.get('questionFailed')
      if (!res) return
      await StorageHelper.clear()
      setSheet('all')
    } catch (e) {
      console.log(e.message)
    }
  }

  useEffect(() => {
    checkFailedQuestions()
  }, [isFocus])

  return (
    <View style={styles.container}>
      <Text style={styles.title}>中坑精北營區{'\n'}新訓鑑測學科測驗</Text>
      {/* <RowView>
        <TO t='隨機' f={() => setMode('隨機')} small varient={mode !== '隨機' ? 'outlined' : 'filled'} />
        <TO t='依序' f={() => setMode('依序')} small varient={mode !== '依序' ? 'outlined' : 'filled'} style={{ marginLeft: 40 }} />
      </RowView> */}
      <Picker
        style={{ width: 240, minHeight: 60, marginVertical: Platform.OS === 'android' ? 20 : 0, backgroundColor: Platform.OS === 'android' ? '#eee' : 'transparent' }}
        selectedValue={sheet}
        onValueChange={(itemValue) => setSheet(itemValue)}>
        <Picker.Item label={'所有題目'} value={'all'} />
        <Picker.Item label={'甲卷'} value={'甲'} />
        <Picker.Item label={'乙卷'} value={'乙'} />
        <Picker.Item label={'丙卷'} value={'丙'} />
        <Picker.Item label={'丁卷'} value={'丁'} />
        <Picker.Item label={'戊卷'} value={'戊'} />
        {haveFailedQuestion && <Picker.Item label={'答錯過的'} value={'答錯過的'} />}
      </Picker>
      <RowView style={{ marginTop: 8, marginBottom: 32 }}>
        <TO t='全部' f={() => setType('全部')} secondary tiny varient={type !== '全部' ? 'outlined' : 'filled'} />
        <TO t='是非' f={() => setType('是非')} secondary tiny varient={type !== '是非' ? 'outlined' : 'filled'} style={{ marginHorizontal: 20 }} />
        <TO t='選擇' f={() => setType('選擇')} secondary tiny varient={type !== '選擇' ? 'outlined' : 'filled'} />
      </RowView>
      <TO t="開始測驗" f={navigate('Exam')} style={{ marginBottom: 16 }} />
      {/* <TO t="我的紀錄" f={navigate('Statistic')} /> */}
      <TO t={'清除紀錄'} f={removeAsyncStorage} small />
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
    marginBottom: 0,
    marginTop: 36,
    textAlign: 'center',
    lineHeight: 36
  },
})