import React, { useState } from "react";
import "./DecipherPage.css"; // Make sure to create this CSS file
import { useNavigate } from "react-router-dom";

export const DecipherPage = () => {
  const [userInput, setUserInput] = useState("");
  const [feedback, setFeedback] = useState("");
  const navigate = useNavigate();

  const correctAnswer = "examplecode"; // Replace with the actual answer

  const checkCode = () => {
    if (userInput.toLowerCase() === correctAnswer) {
      setFeedback("Correct! You've unlocked the next clue.");
      navigate("/location-hunt");
      // You can add code here to navigate to the next page or reveal more content
    } else {
      setFeedback("Incorrect. Try again!");
    }
  };

  return (
    <div className="decipher-container">
      <header className="decipher-header">
        <h1>Decipher: The First Clue</h1>
        <h2>Unlock the Past, Secure the Future</h2>
      </header>

      <section className="decipher-intro">
        <p>
          Welcome, brave cryptographers, to the first challenge in your quest to
          recover the Lost Code of Satoshi. Hidden within this time capsule is a
          crucial fragment of the code that will unlock the secrets of the
          digital future. Your mission is to decipher the hidden message and
          access the next clue. Time is of the essence—work swiftly and
          carefully, for every moment counts.
        </p>
      </section>

      <section className="decipher-puzzle">
        <img
          src="time-capsule.webp"
          alt="Time Capsule"
          className="time-capsule-image"
        />
        <p className="puzzle-text">
          "Encoded within the lines of history, protected by the simplest of
          shifts, lies your key. Consider the third letter of every word,
          shifted by three."
        </p>
        <div className="puzzle-input">
          <label htmlFor="code">Enter the Code:</label>
          <input
            type="text"
            id="code"
            name="code"
            placeholder="Enter the deciphered code here"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
          />
          <button type="button" onClick={checkCode}>
            Submit
          </button>
        </div>
        {feedback && <p className="feedback-message">{feedback}</p>}
      </section>

      <footer className="decipher-footer">
        <p>
          &copy; 2140 Decipher Event | <a href="/">Home</a> |{" "}
          <a href="/rules">Rules</a>
        </p>
      </footer>
    </div>
  );
};
