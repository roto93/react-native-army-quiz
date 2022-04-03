import React from 'react'
import { StyleSheet, TouchableOpacity, Text } from 'react-native'
import Theme from '../Theme'

const TO = ({ t, f, style, small, varient, unselected }) => {
  return (
    <TouchableOpacity style={[
      styles.TO,
      style,
      small && { width: 100, height: 48 },
      // unselected && { opacity: 0.5 },
      varient === 'outlined' && { borderWidth: 1, borderColor: Theme.primaryLight, backgroundColor: 'transparent' },
    ]} onPress={f}>
      <Text style={[styles.TO_text, varient === 'outlined' && { color: Theme.primaryLight }]}>{t}</Text>
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