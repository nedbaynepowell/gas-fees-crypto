import moment from "moment";

// const publicApiKey = "pub_4842904e6153550a71dba50c3cdccb42b72c";
const publicApiKey = "2250e5a63f76438c8a5e178e63f26ae0";
const fetchNews = async () => {
  // const { results } = await fetch(`https://newsdata.io/api/1/news?apikey=${publicApiKey}&category=technology`).then(r => r.json());
  // return results;
  const date = moment().subtract(2, "week").format("YYYY-MM-DD");
  const {articles} = await fetch(`
  https://newsapi.org/v2/everything?q=crypto&from=${date}&sortBy=publishedAt&apiKey=${publicApiKey}`).then(
    (r) => r.json()
  );
  return articles;
};

export default fetchNews;
