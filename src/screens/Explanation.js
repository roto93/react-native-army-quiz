import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Explanation = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.content}>題目總共兩百題，一半為是非題，另一半為選擇題。作答後會秀出正確答案，如果答錯則會將錯的題目記錄下來，可從首頁選擇「錯過的題目」進行測驗。將錯的題目做對累積達三次，則會將該題從錯過的題目中移除，直到全部題目都移掉。</Text>
      <Text style={{ marginTop: 40, fontSize: 32 }}>鑑測加油!!!</Text>
    </View>
  )
}

export default Explanation

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 36
  },
  content: {
    fontSize: 18,
    lineHeight: 24
  }
})