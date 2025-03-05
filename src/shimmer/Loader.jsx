import { FlatList, StyleSheet, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { createShimmerPlaceholder } from "react-native-shimmer-placeholder"
import { screenHeight, screenWidth } from "../utils/Constants";

const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);

export const ArticleLoader = () => {
    return (
        <FlatList
            data={[1, 2, 3, 4, 5]}
            renderItem={() => (
                <View style={styles.newsCardContainerEffect}>
                    <ShimmerPlaceholder style={styles.newsImageEffect}/> 
                    <View style={styles.newsBody}>
                        <ShimmerPlaceholder style={styles.autherEffect}/>
                        <ShimmerPlaceholder style={styles.titleEffect}/>
                        <ShimmerPlaceholder style={styles.descriptionEffect}/>
                    </View>
                </View>
            )}
        />

    )
}

export default ArticleLoader;


const styles = StyleSheet.create({
    newsCardContainerEffect: {
        marginVertical: 10,
        borderRadius:20,
        overflow:'hidden',
        width:'97%',
        alignSelf:'center'
    },
    newsImageEffect: {
        height: screenHeight * 0.3,
        width: screenWidth,
        resizeMode: 'cover',
    },
    newsBody: {
        paddingHorizontal: 10,
        paddingVertical: 15
    },
    autherEffect: {
        height: 14,
        width: '30%',
        marginVertical:5,
        borderRadius:2
    },
    titleEffect: {
        height: 50,
        width: '95%',
        marginVertical:5,
        borderRadius:5
    },
    descriptionEffect: {
        height: 50,
        width: '95%',
        marginVertical:5,
        borderRadius:5
    },
})