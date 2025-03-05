import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const requestData = async (pageNumber = 1) => {
    const url = `https://newsapi.org/v2/top-headlines?country=us&page=${pageNumber}&pageSize=5&apiKey=1ab75809abd2419c9018382ba256ef78`;
    try {
        const response = await axios.get(url);
        if (response.status == 200) {
            await AsyncStorage.removeItem('Articles');
            console.log("News :", response.data.articles);
            await AsyncStorage.setItem('Articles', JSON.stringify(response.data.articles));
            return response.data.articles
        } else {
            console.log("something went wrong");
            let cachedArticles = await AsyncStorage.getItem('Articles');
            let parsedArticles = JSON.parse(cachedArticles);
            return parsedArticles;
        }
    } catch (error) {
        console.log("Error while fetching news :", error);
        let cachedArticles = await AsyncStorage.getItem('Articles');
        let parsedArticles = JSON.parse(cachedArticles);
        return parsedArticles;
    }
}

export default requestData