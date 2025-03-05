import { Image, StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { screenHeight, screenWidth } from '../../utils/Constants'
import { useNavigation } from '@react-navigation/native'

const Splash = () => {

    const navigation = useNavigation();

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            navigation.reset({
                index: 0,
                routes: [{ name: 'NewsFeed' }],
            });
        }, 1500);
        return () => clearTimeout(timeoutId);
    }, []);

    return (
        <View style={styles.container}>
            <StatusBar animated={true} barStyle={'dark-content'} backgroundColor={'#fff'} />
            <Image
                source={require('../../assets/splashImage.png')}
                style={styles.image}
            />
        </View>
    )
}

export default Splash

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
        height: screenHeight * 0.35,
        width: screenWidth * 0.35,
        resizeMode: 'contain'
    }
})