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
      <h2>Explore the Ethereum Blockchain Ecosystem</h2>
      <p>Ethereum is a technology powering the 
        cryptocurrency ether (ETH) and thousands 
        of decentralised applications. Explore the 
        news, coins, Ethereum transaction fees and create a strategy on how you will succeed in the market.</p>
        <div className="inner-container-news">
        {news.map((i, index) => (
          <div key={index} className="market-news-box">
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
      {/* <div className="inner-container">
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
      </div> */}
    </div>
  );
};
export default CryptoNews;
