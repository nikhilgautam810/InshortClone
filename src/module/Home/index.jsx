import { StatusBar, StyleSheet, Text, View, TouchableOpacity, Pressable, TextInput, FlatList, Image, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import requestData from './requestData'
import { SafeAreaView } from 'react-native-safe-area-context'
import VectorIcons from '../../utils/VectorIcons';
import { screenHeight, screenWidth } from '../../utils/Constants';
import ArticleCard from '../../components/ArticleCard';
import NetInfo from '@react-native-community/netinfo';
import ToastMessage from '../../components/ToastMessage';
import ArticleLoader from '../../shimmer/Loader';

const NewsFeed = () => {

    const [showSearchBar, setShowSearchBar] = useState(false)
    const [articles, setArticles] = useState([])
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredNews, setFilteredNews] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [checkInternet, setCheckInternet] = useState(true);
    const [shimmerEffect, setShimmerEffect] = useState(false);

    const handleSearch = () => {
        setShowSearchBar(!showSearchBar);
    }

    const filterArticles = (query) => {
        setSearchQuery(query);
        const data = articles.filter(article =>
            article.author?.toLowerCase().includes(query.toLowerCase()) ||
            article.title?.toLowerCase().includes(query.toLowerCase()) ||
            article.description?.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredNews(data);
    }

    const fetchNews = async (pageNumber, newArticleList = false) => {
        const connection = NetInfo.addEventListener(state => {
            setCheckInternet(state.isConnected);
        })
        if (!checkInternet) {
            ToastMessage();
        }
        if (loading) return;
        setLoading(true);
        const data = await requestData(pageNumber);
        setArticles(prevArticles => newArticleList ? data : [...prevArticles, ...data]);
        setFilteredNews(prevArticles => newArticleList ? data : [...prevArticles, ...data]);
        setLoading(false);
        setShimmerEffect(false);
        console.log("News :", data);
        return () => connection();
    }

    const handleRefreshAction = () => {
        setRefreshing(true);
        setPage(1);
        fetchNews(1, true);
        setRefreshing(false);
    }

    const fetchMoreArticle = () => {
        if (!loading) {
            setPage(prevPage => prevPage + 1);
            fetchNews(page + 1);
        }
    }

    useEffect(() => {
        setShimmerEffect(true);
        console.log("UseEffect")
        fetchNews(1);
    }, []);

    

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar animated={true} barStyle={'dark-content'} backgroundColor={'#fff'} />
            <View style={styles.header}>
                {
                    showSearchBar ? (
                        <View style={styles.searchContainer}>
                            <TextInput
                                placeholder='Search any news here'
                                placeholderTextColor={'#ccc'}
                                value={searchQuery}
                                onChangeText={(text) => filterArticles(text)}
                                style={styles.searchTextInput}
                            />
                        </View>
                    ) : (
                        <Text style={styles.headerTxt}>News Feed</Text>
                    )
                }
                <Pressable style={styles.searchIconContainer} onPress={() => handleSearch()}>
                    <VectorIcons name={'search'} type={'Ionicons'} size={22} color={'#333'} />
                </Pressable>
            </View>
            <View style={styles.body}>
                {
                    shimmerEffect ? (
                        <ArticleLoader />
                    ) : (
                        <FlatList
                            data={filteredNews}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) => (
                                <ArticleCard item={item}/>
                            )}
                            onRefresh={handleRefreshAction}
                            onEndReached={fetchMoreArticle}
                            onEndReachedThreshold={0.5}
                            ListFooterComponent={loading && <ActivityIndicator size="large" color="#0000ff" />}
                            refreshing={refreshing}
                        />
                    )
                }

            </View>
        </SafeAreaView>
    )
}

export default NewsFeed

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    headerTxt: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    searchIconContainer: {
        padding: 8,
    },
    body: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    searchContainer: {
        borderWidth: 0.4,
        width: '80%',
        borderColor: '#ccc',
        borderRadius: 10
    },
    searchTextInput: {
        marginHorizontal: 15,
        color: '#000'
    },
    newsCardContainer: {
        marginVertical: 10,
        backgroundColor: '#fff'
    },
    newsImage: {
        height: screenHeight * 0.5,
        width: screenWidth,
        resizeMode: 'cover'
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
});
