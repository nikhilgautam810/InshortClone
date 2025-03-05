import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Toast from 'react-native-toast-message'

const ToastMessage = () => {
  return (
    Toast.show({
        type: 'error',
        text1: 'Offline',
        text2: 'No internet connection.',
      })
  )
}

export default ToastMessage

const styles = StyleSheet.create({})