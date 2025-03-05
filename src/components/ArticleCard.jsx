import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useRef, useState } from 'react'
import { screenHeight, screenWidth } from '../utils/Constants'
import VectorIcons from '../utils/VectorIcons'

const ArticleCard = ({ item }) => {
    const [articleLiked, setArticleLiked] = useState(false);
    const [articleBookMarked, setArticleBookmarker] = useState(false);

    const tap = useRef(null);
    const doubleTapAction = () => {
        const now = Date.now();
        if (tap.current && (now - tap.current) < 300) {
            setArticleLiked(true);
        }
        tap.current = now;
    }

    const bookmarkedAction = () => {
        setArticleBookmarker(!articleBookMarked);
    }

    return (
        <Pressable style={styles.newsCardContainer} onPress={doubleTapAction}>
            <Image
                style={styles.newsImage}
                source={item.urlToImage ? { uri: item.urlToImage } : require('../assets/user8.jpg')}
            />
            <View style={styles.newsBody}>
                <Text style={styles.auther}>{item.author || 'No Auther'}</Text>
                <Text style={styles.title}>{item.title || 'No Title'}</Text>
                <Text style={styles.description}>{item.description || 'No Description'}</Text>

                <View style={styles.likeAndBookmarksContainer}>
                    <Pressable onPress={() => { doubleTapAction; setArticleLiked(!articleLiked); }} style={styles.actionBtn}>
                        <VectorIcons name={articleLiked ? 'heart' : 'heart-o'} type={'FontAwesome'} size={25} color={articleLiked ? 'red' : '#333'} />
                    </Pressable>
                    <Pressable onPress={() => bookmarkedAction()} style={styles.actionBtn}>
                        <VectorIcons name={articleBookMarked ? 'bookmark' : 'bookmark-o'} type={'FontAwesome'} size={25} color={articleBookMarked ? 'blue' : '#333'} />
                    </Pressable>
                </View>
            </View>
        </Pressable>
    )
}

export default ArticleCard

const styles = StyleSheet.create({
    newsCardContainer: {
        marginVertical: 10,
        backgroundColor: '#fff',
        borderRadius: 20,
        overflow: 'hidden',
        width: '97%',
        alignSelf: 'center'
    },
    newsImage: {
        height: screenHeight * 0.3,
        width: screenWidth,
        resizeMode: 'cover',
    },
    newsBody: {
        paddingHorizontal: 10,
        paddingVertical: 15
    },
    auther: {
        color: '#8e8e8e',
        fontSize: 12,
        fontWeight: '400'
    },
    title: {
        color: '#000',
        fontSize: 16,
        fontWeight: '600',
    },
    description: {
        color: '#6e6e6e',
        fontSize: 14,
        fontWeight: '500',
    },
    likeAndBookmarksContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    actionBtn: {
        padding: 10
    }
})