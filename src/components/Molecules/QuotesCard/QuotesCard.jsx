import React from "react";
import styles from "../../pages/DashBoard/Dashboard.module.css";
import { fallbackImg } from "../../../constants/constant";

export const QuotesCard = ({ quoteData }) => {
  return (
    <div className={styles["dashboard__quote-card-conatiner"]}>
      {quoteData &&
        quoteData.map((data) => (
          <div key={data.id} className={styles["dashboard__quotes-card"]}>
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
              <div className={styles["dashboard__overlay-text"]}>
                {data.text}
              </div>
            </div>

            {/* user name and created at date */}

            <div className={styles["quotescard__username-and-date"]}>
              <div className={styles["dashboard__username-section"]}>
                {data.username}
              </div>
              <div>{Intl.DateTimeFormat("en-US").format(data.creaatdAt)}</div>
            </div>
          </div>
        ))}
    </div>
  );
};
