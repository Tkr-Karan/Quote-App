import React, { useState } from "react";
import {
  CREATE_QUOTE_URL,
  UPLOAD_MEDIA_URL,
} from "../../../constants/constant";
import styles from "./CreateQuote.module.css";
import { useNavigate } from "react-router";

export const CreateQuote = () => {
  const [quoteText, setQuoteText] = useState("");
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleTextChange = (e) => {
    setQuoteText(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (quoteText.length === 0) {
      setError("Your quote text is empty");
      return;
    }

    if (!file) {
      setError("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("le", file);
    const token = sessionStorage.getItem("token");

    try {
      const response = await fetch(UPLOAD_MEDIA_URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload image");
      }

      const data = await response.json();

      if (data[0].url) {
        alert("Image uploaded successfully!");

        const createQuotePayload = {
          text: quoteText,
          mediaUrl: data[0].url,
        };

        const createQuoteResponse = await fetch(CREATE_QUOTE_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
          body: JSON.stringify(createQuotePayload),
        });

        if (!createQuoteResponse.ok) {
          throw new Error("Failed to create quote");
        }

        alert("Quote created successfully!");
        setQuoteText("");
        setFile(null);
        setError("");
      } else {
        setError("Failed to retrieve media URL");
      }
    } catch (err) {
      setError(`Error: ${err.message}`);
      alert("Session expired, Please login again!");
      navigate("/");
    }
  };

  const allowedExtensions = ["jpg", "jpeg", "png"];

  const handleFileChange = (event) => {
    const uploadedFile = event.target.files[0];
    if (!uploadedFile) return;

    const fileExtension = uploadedFile.name.split(".").pop().toLowerCase();

    if (!allowedExtensions.includes(fileExtension)) {
      setError(`Invalid file type. Allowed: ${allowedExtensions.join(", ")}`);
      setFile(null);
      return;
    }

    setError("");
    setFile(uploadedFile);
  };

  const handleUploadClick = () => {
    document.getElementById("fileInput").click();
  };

  return (
    <div
      className={
        file
          ? styles["createQuote__main-container-file"]
          : styles["createQuote__main-container"]
      }
    >
      <div style={{ width: "100%", display: "flex", flexDirection: "column" }}>
        <div
          className={styles["go__to-dashboard"]}
          onClick={() => navigate("/dashboard")}
        >
          Dashboard
        </div>
        Create Quote Form
      </div>
      <form className={styles["createQuote__form-container"]}>
        <label htmlFor="">
          <div className={styles["form__label-text"]}>Quote Text</div>
          <input
            placeholder="Please enter your text here"
            type="text"
            value={quoteText}
            name="username"
            onChange={handleTextChange}
            maxLength={30}
          />
        </label>

        <label htmlFor="">
          {!file ? (
            <div
              onClick={handleUploadClick}
              className={styles["file__upload-section"]}
            >
              <div
                style={{
                  marginTop: "8px",
                }}
              >
                Upload you image here
              </div>
              <p>(Allowed extensions: .jpg, .png, jpeg)</p>
            </div>
          ) : (
            <div
              className={styles["file__preview-container"]}
              style={{ marginTop: "16px" }}
            >
              <h3>File Preview:</h3>
              {file.type.startsWith("image/") && (
                <div className={styles["file__preview-section"]}>
                  <img src={URL.createObjectURL(file)} />
                </div>
              )}
              <p>
                Filename:{" "}
                <span className={styles["file__name-info"]}>{file.name} </span>
              </p>
            </div>
          )}
          <input
            type="file"
            id="fileInput"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
        </label>

        {error && <p className={styles["error-message"]}>{error}</p>}

        <button className={styles["create__quote-btn"]} onClick={handleSubmit}>
          Create Quote
        </button>
      </form>
    </div>
  );
};
