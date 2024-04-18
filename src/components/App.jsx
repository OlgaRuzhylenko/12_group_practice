import ArticleList from "../components/ArticleList/ArticleList.jsx";
import SearchForm from "../components/SearchForm/SearchForm.jsx";
import { useState, useEffect } from "react";
import { fetchArticles } from "../articles-api.js";
import css from "./App.module.css";

export default function App() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");

  const handleSearch = async (newQuery) => {
    setQuery(newQuery);
    setPage(1);
    setArticles([]);
  };

  const handleLoadMore = () => {
    setPage(page + 1);
  };

  useEffect(() => {
    if (query === "") {
      return;
    }
    async function getArticles() {
      try {
        setIsLoading(true);
        const data = await fetchArticles(query, page);
        setArticles((prevArticles) => {
          return [...prevArticles, ...data];
        });
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }
    getArticles();
  }, [query, page]);

  return (
    <div className={css.container}>
      <h1>HTTP requests in React</h1>
      <SearchForm onSearch={handleSearch} />
      {error && <b>Oops, error...</b>}
      {isLoading && <b>Please, loading articles...</b>}
      {articles.length > 0 && <ArticleList items={articles} />}
      {articles.length > 0 && (
        <button onClick={handleLoadMore}>Load more articles</button>
      )}
    </div>
  );
}

// useEffect(() => {
//   async function getArticles() {
//     try {
//       setIsLoading(true);
//       const data = await fetchArticles("react");
//       setArticles(data);
//     } catch (error) {
//       setError(true);
//     } finally {
//       setIsLoading(false);
//     }
//   }
//   getArticles();
// }, []);

//  try {
//    setIsLoading(true);
//    const data = await fetchArticles(newQuery);
//    setArticles(data);
//  } catch (error) {
//    setError(true);
//  } finally {
//    setIsLoading(false);
//  }
