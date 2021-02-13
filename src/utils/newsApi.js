import { NEWS_API_BASE_URL, NEWS_API_KEY } from "../configs/api";

class NewsApi {
  constructor({ baseUrl, apiKey }) {
    this._baseUrl = baseUrl;
    this._apiKey = apiKey;
  }

  _handleResponse(res) {
    return res.ok ? res.json() : Promise.reject(res);
  }

  getData({ keyword, from, to }) {
    return fetch(
      `${this._baseUrl}/everything?q=${keyword}&apiKey=${this._apiKey}` +
      `&from=${from}&to=${to}&pageSize=100`,
      {
        headers: {
          "Content-Type": "application/json",
      },
    }).then(this._handleResponse);
  }
};

const newsApi = new NewsApi({
  baseUrl: NEWS_API_BASE_URL,
  apiKey: NEWS_API_KEY,
});

export default newsApi;
