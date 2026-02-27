import axios from 'axios';
import { BASE_URL } from '../utils/constants';

export const getAllAboutStories = async () => {
  try {
    const response = await axios.get(BASE_URL + '/timeline/aboutUs/getAllAbout');
    const allStories = response?.data?.data || []; // ensure an array even if undefined
    return allStories.filter((story) => story.category === "About Us");
  } catch (error) {
    console.error("Error fetching About Us stories:", error.message);
    return []; // return empty array on error
  }
};
