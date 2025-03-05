import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Splash from '../module/onboard';
import NewsFeed from '../module/Home';


const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
  <NavigationContainer>
    <Stack.Navigator
    initialRouteName='Splash'
    screenOptions={{
        headerShown: false
    }}
    >
        <Stack.Screen name='Splash' component={Splash}/>
        <Stack.Screen name='NewsFeed' component={NewsFeed}/>
    </Stack.Navigator>
  </NavigationContainer>
  )
}

export default Navigation

const styles = StyleSheet.create({})