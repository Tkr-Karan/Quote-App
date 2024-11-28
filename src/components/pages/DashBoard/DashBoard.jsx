import React, { useEffect, useState } from "react";
import { Pagination } from "../../Molecules/Pagination/Pagination";
import { useNavigate } from "react-router";
import { fallbackImg, GET_QUOTES_URL } from "../../../constants/constant";
import styles from "./Dashboard.module.css";

export const DashBoard = () => {
  const [quoteData, setQuoteData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLastPage, setIsLastPage] = useState(false);

  const navigate = useNavigate();

  const itemPerPage = 20;

  const fetchUserQuotes = async (page) => {
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
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: "white",
          position: "sticky",
          top: 0,
          zIndex: 999,
          padding: "8px",
          boxShadow: "0 10px 10px grey",
          backdropFilter: "blur(50px)",
          WebkitBackdropFilter: "blur(10px)",
        }}
      >
        <div>DashBoard</div>
        <div
          style={{
            fontWeight: 500,
            border: "1px solid #e6dbd0",
            borderRadius: "4px",
            padding: "8px ",
            backgroundColor: "#1789fc",
            color: "#e6dbd0",
            cursor: "pointer",
          }}
          onClick={() => navigate("/create-new")}
        >
          + Create New Quote
        </div>
      </div>

      <div
        style={{
          display: "flex",
          gap: "24px",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "16px",
        }}
      >
        {quoteData &&
          quoteData.map((data) => (
            <div
              key={data.id}
              style={{
                border: "2px solid grey",
                borderRadius: "8px",
                overflow: "hidden",
                padding: "4px",
                boxShadow: "10px 10px 10px black",
              }}
            >
              <div
                style={{
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <img
                  style={{
                    borderTopLeftRadius: "6px",
                    borderTopRightRadius: "6px",
                  }}
                  src={data.mediaUrl || fallbackImg}
                  alt="media alt"
                  width={200}
                  height={200}
                />
                <div
                  className={styles["dashboard__overlay-text"]}
                  style={{
                    width: "100%",
                    position: "absolute",
                    bottom: "3px",
                    backgroundColor: "black",
                    color: "white",
                    padding: "4px",
                  }}
                >
                  {data.text}
                </div>
              </div>

              {/* user name and created at date */}

              <div
                style={{
                  display: "flex",
                  gap: "12px",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div className={styles["dashboard__username-section"]}>
                  {data.username}
                </div>
                <div>{Intl.DateTimeFormat("en-US").format(data.creaatdAt)}</div>
              </div>
            </div>
          ))}
      </div>
      <Pagination
        onPageChange={setCurrentPage}
        currentPage={currentPage}
        isLastPage={isLastPage}
      />
    </div>
  );
};
