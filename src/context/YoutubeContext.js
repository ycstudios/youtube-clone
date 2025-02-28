import React, { createContext, useState } from "react";
import axios from "axios";

import { errorHandling } from "../utils/utils";

const YoutubeContext = createContext();
export default YoutubeContext;

export const ContextProvider = ({ children }) => {
  const [trendingVideos, setTrendingVideos] = useState([]);
  const [searchVideos, setSearchVideos] = useState([]);
  const [trendingVideosLength, setTrendingVideosLength] = useState(15);
  const [autocomplete, setAutocomplete] = useState([]);
  const [country, setCountry] = useState("IN");
  const [isLoading, setIsLoading] = useState(false);
  const [nextPageToken, setNextPageToken] = useState("");

  // 1. Autocomplete Suggestions (Using Google API)
  const generateAutocomplete = async (query) => {
    try {
      const res = await axios.get(
        `https://suggestqueries.google.com/complete/search?client=youtube&ds=yt&num=10&q=${query}`
      );
      const suggestions = JSON.parse(res.data.split(/\(|\)/)[1])[1].map(
        (arr) => arr[0]
      );
      console.log(suggestions);
      setAutocomplete(suggestions);
    } catch (error) {
      errorHandling(error);
    }
  };

  // 2. Trending Videos (Using Google API)
  const getTrendingVideos = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(
        `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&chart=mostPopular&regionCode=${country}&key=${process.env.REACT_APP_YOUTUBE_API_KEY_GOOGLE1}&maxResults=15`
      );
      setTrendingVideos(res.data.items);
      setTrendingVideosLength(res.data.pageInfo.totalResults);
      setNextPageToken(res.data.nextPageToken);
      setIsLoading(false);
    } catch (error) {
      try {
        const res = await axios.get(
          `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&chart=mostPopular&regionCode=${country}&key=${process.env.REACT_APP_YOUTUBE_API_KEY_GOOGLE2}&maxResults=15`
        );
        setTrendingVideos(res.data.items);
        setTrendingVideosLength(res.data.pageInfo.totalResults);
        setNextPageToken(res.data.nextPageToken);
        setIsLoading(false);
      } catch (error) {
        errorHandling(error);
      }
    }
  };

  // 3. Search Videos (Using Google API)
  const getSearchVideos = async (query) => {
    setIsLoading(true);
    try {
      const res = await axios.get(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&key=${process.env.REACT_APP_YOUTUBE_API_KEY_GOOGLE1}&maxResults=50&type=video&videoDuration=medium`
      );
      console.log(res.data);
      setIsLoading(false);
      setSearchVideos(res.data.items);
    } catch (error) {
      try {
        const res2 = await axios.get(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&key=${process.env.REACT_APP_YOUTUBE_API_KEY_GOOGLE2}&maxResults=50&type=video&videoDuration=medium`
        );
        console.log(res2.data);
        setIsLoading(false);
        setSearchVideos(res2.data.items);
      } catch (error) {
        errorHandling(error);
      }
    }
  };

  return (
    <YoutubeContext.Provider
      value={{
        nextPageToken,
        setNextPageToken,
        isLoading,
        generateAutocomplete,
        autocomplete,
        trendingVideos,
        getTrendingVideos,
        setTrendingVideos,
        country,
        setCountry,
        getSearchVideos,
        searchVideos,
        setIsLoading,
        trendingVideosLength,
      }}
    >
      {children}
    </YoutubeContext.Provider>
  );
};
