// pages/api/fetchFacebookAdsData.js
import axios from 'axios';

class HttpService {
  async getData(url) {
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.log("Error:", error);
      throw error;
    }
  }

  async postData(url, payload) {
    try {
      const response = await axios.post(url, payload);
      return response.data;
    } catch (error) {
      console.log("Error:", error);
      throw error;
    }
  }
}
export default new HttpService();