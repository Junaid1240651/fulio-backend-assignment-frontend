import axios from "axios";
import React, { useState } from "react";
import "./HomePage.css";

const HomePage = () => {
  const [getNumber, setGetNumber] = useState("");
  const [getUrlLink, setGetUrlLink] = useState("");
  const [numberResult, setNumberResult] = useState();
  const [webLinkResult, setWebLinkResult] = useState();

  const handleNumberChange = (e) => {
    const sanitizedValue = e.target.value.replace(/[^0-9+\-.()]/g, "");
    setGetNumber(sanitizedValue);
  };

  const submitNumberHandler = () => {
    axios
      .post(
        "https://fulio-backend-assignment-backend.onrender.com/checkNumberValidation",
        {
          inputNumber: getNumber,
        }
      )
      .then((response) => {
        setNumberResult([response.data]);
      })
      .catch((error) => {
        setNumberResult("Error: " + error.message);
      });
  };
  // https://ful.io
  const SubmitWebLinkHandler = () => {
    axios
      .post(
        "https://fulio-backend-assignment-backend.onrender.com/checkCompanyInfo",
        {
          inputWebLink: getUrlLink,
        }
      )
      .then((response) => {
        setWebLinkResult(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        setWebLinkResult("Error: " + error.message);
      });
  };
  console.log();
  return (
    <div className="container">
      <p>
        Please wait some time when you Submit Web Link && Number For the Result
        Because Server Take Time when You Fetch Data 1st Time.
      </p>
      <div className="input-container">
        <input
          value={getNumber}
          onChange={handleNumberChange}
          placeholder="Enter phone number"
        />
        <button
          className="btn"
          onClick={submitNumberHandler}
          disabled={!getNumber}
        >
          Submit Phone
        </button>
      </div>
      <div className="input-container">
        <input
          type="text"
          value={getUrlLink}
          onChange={(e) => setGetUrlLink(e.target.value)}
          placeholder="Enter web link"
        />
        <button
          className="btn"
          onClick={SubmitWebLinkHandler}
          disabled={!getUrlLink}
        >
          Submit Web Link
        </button>
      </div>
      <p className="result">Number Result: {numberResult}</p>
      <p className="result">
        Web Link Results
        {Array.isArray(webLinkResult) ? (
          webLinkResult.map((data) => (
            <div key={data._id}>
              <p>Webside Name : {data.websideName}</p>
              <div>
                Socioal Link :
                {data.socialLink.map((socialLink, index) => (
                  <p key={index}>
                    {socialLink.websideLink}
                    {socialLink.linkeinLink}
                  </p>
                ))}
              </div>
              <p>Email : {data.email}</p>
              <p>Contact : {data.contact}</p>
            </div>
          ))
        ) : (
          <p>{webLinkResult || ""}</p>
        )}
      </p>
    </div>
  );
};

export default HomePage;
