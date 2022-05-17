import moment from "moment";
import { useEffect, useState } from "react";
import fetchNews from "../../actions/fetchNews";
import "./style.scss";

interface NewsItem {
  source: {
    id: string | null;
    name: string;
  };
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
}

const CryptoNews = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  useEffect(() => {
    const asyncEffect = async () => {
      const newsRes = (await fetchNews()) as NewsItem[];
      setNews(newsRes);
    };
    asyncEffect();
  }, []);

  return (
    <div className="market-news">
      <h2>Crypto News</h2>
      <div className="inner-container">
        {news.map((i, index) => (
          <div key={index} className="market-news-item">
            <div className="col large">
              <div className="source-container">
                <p>{i.source.name}</p>
                <p className="bullet">•</p>
                <p>{moment(i.publishedAt).fromNow()}</p>
              </div>
              <a
                target="_blank"
                rel="noreferrer"
                className="title"
                href={i.url}
              >
                {i.title}
              </a>
            </div>
            <div className="col small">
              <img src={i.urlToImage} alt="" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default CryptoNews;
