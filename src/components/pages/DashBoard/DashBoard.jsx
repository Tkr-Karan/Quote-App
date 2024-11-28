import React, { useEffect, useState } from "react";
import { Pagination } from "../../Molecules/Pagination/Pagination";
import { useNavigate } from "react-router";
import { GET_QUOTES_URL } from "../../../constants/constant";
import styles from "./Dashboard.module.css";
import { QuotesCard } from "../../Molecules/QuotesCard/QuotesCard";

export const DashBoard = () => {
  const [quoteData, setQuoteData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLastPage, setIsLastPage] = useState(false);

  const navigate = useNavigate();

  const itemPerPage = 20;

  const fetchUserQuotes = async (page) => {
    try {
      const offset = (page - 1) * itemPerPage;

      const url = `${GET_QUOTES_URL}?limit=${itemPerPage}&offset=${offset}`;
      const token = sessionStorage.getItem("token");

      if (!token) {
        console.error("No token found in session storage.");
        return;
      }
      const res = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `${token}`,
        },
      });

      const val = await res.json();

      setQuoteData(val.data);
      setIsLastPage(val.data.length < itemPerPage);
    } catch (error) {
      sessionStorage.removeItem("token");
    }
  };

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    fetchUserQuotes(currentPage);
  }, [currentPage]);

  return (
    <div>
      <div className={styles["dashboard__main-container"]}>
        <div>DashBoard</div>
        <div
          className={styles["dashboard__create-quote-cta"]}
          onClick={() => navigate("/create-new")}
        >
          + Create New Quote
        </div>
      </div>

      <QuotesCard quoteData={quoteData} />

      <Pagination
        onPageChange={setCurrentPage}
        currentPage={currentPage}
        isLastPage={isLastPage}
      />
    </div>
  );
};
