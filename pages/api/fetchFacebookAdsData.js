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

// Đặt tên cho instance trước khi export
const httpService = new HttpService();
export default httpService;
