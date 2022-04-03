import React from 'react'
import { StyleSheet, TouchableOpacity, Text } from 'react-native'
import Theme from '../Theme'

const TO = ({ t, f, style, small, varient, tiny, secondary }) => {
  return (
    <TouchableOpacity style={[
      styles.TO,
      style,
      secondary && { backgroundColor: Theme.secondary },
      small && { width: 100, height: 48 },
      tiny && { width: 60, height: 48 },
      varient === 'outlined' && { borderWidth: 1, borderColor: secondary ? Theme.secondary : Theme.primaryLight, backgroundColor: 'transparent' },
    ]} onPress={f}>
      <Text style={[
        styles.TO_text,
        secondary && { color: '#793b23' },
        varient === 'outlined' && { color: secondary ? Theme.secondary : Theme.primaryLight },
      ]}>
        {t}
      </Text>
    </TouchableOpacity>
  )
}

export default TO

const styles = StyleSheet.create({
  TO: {
    backgroundColor: Theme.primaryLight,
    width: 240,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4
  },
  TO_text: {
    fontSize: 20,
    color: Theme.textLight
  }
})