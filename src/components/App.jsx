import ArticleList from "../components/ArticleList/ArticleList.jsx";
import SearchForm from "../components/SearchForm/SearchForm.jsx";
import { useState, useEffect } from "react";
import { fetchArticles } from "../articles-api.js";
import css from "./App.module.css";

export default function App() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

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
  const handleSearch = async (newQuery) => {
    try {
      setIsLoading(true);
      const data = await fetchArticles(newQuery);
      setArticles(data);
    } catch (error) {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={css.container}>
      <h1>HTTP requests in React</h1>
      <SearchForm onSearch={handleSearch} />
      {error && <b>Oops, error...</b>}
      {isLoading && <b>Please, loading articles...</b>}
      {articles.length > 0 && <ArticleList items={articles} />}
    </div>
  );
}
