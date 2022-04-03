import { View } from 'react-native'
import React from 'react'

const RowView = ({ children, style }) => {
  return (
    <View style={[{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }, style]}>
      {children}
    </View>
  )
}

export default RowView