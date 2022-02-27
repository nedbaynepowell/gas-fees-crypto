const fetchNews = async () => {
  const articles = await fetch(
    "https://us-central1-gas-fees-crypto.cloudfunctions.net/webApi/api/v1/news"
  ).then((r) => r.json());
  return articles;
};

export default fetchNews;
