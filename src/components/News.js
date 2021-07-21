import { nanoid } from "nanoid";

function News(props) {
  const newsList = props.newsData.map((data) => (
    <article key={nanoid()} className="news-article">
      <h1>{data.Title}</h1>
      <p>{data.Content}</p>
    </article>
  ));
  return (
    <div className="news-wrap">
      <h1 className="news-date">
        {`${props.dateConv(Date(), "DAY")}, ${props.dateConv(
          Date(),
          "MMM"
        )}. ${props.dateConv(Date(), "DD")}, ${props.dateConv(Date(), "YYYY")}`}
      </h1>
      {newsList}
    </div>
  );
}

export default News;
