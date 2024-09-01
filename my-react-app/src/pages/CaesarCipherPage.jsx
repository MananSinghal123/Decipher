import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CaesarCipherPage.css"; // Ensure you create this CSS file

const CaesarCipherPage = () => {
  const [userInput, setUserInput] = useState("");
  const [feedback, setFeedback] = useState("");
  const [showNextButton, setShowNextButton] = useState(false); // State to manage button visibility
  const navigate = useNavigate(); // Hook to handle navigation

  // Correct answer after decoding the Caesar cipher
  const correctAnswer = "Library"; // Replace with the actual decoded location name

  const checkAnswer = () => {
    if (userInput.trim().toLowerCase() === correctAnswer.toLowerCase()) {
      setFeedback(
        "Correct! You've decoded the Caesar cipher. The next clue is located at the Library."
      );
      setShowNextButton(true); // Show the "Next" button when the answer is correct
    } else {
      setFeedback("Incorrect. Please try again.");
      setShowNextButton(false); // Hide the "Next" button if the answer is incorrect
    }
  };

  const handleNextClick = () => {
    // Navigate to the next page
    navigate("/distorted-image"); // Replace '/next-page' with the actual path to your next page
  };

  return (
    <div className="caesar-container">
      <header className="caesar-header">
        <h1>Caesar Cipher: Uncover the Hidden Location</h1>
        <h2>Decode the cipher to find the next clue's location!</h2>
      </header>

      <section className="caesar-intro">
        <p>
          As you delve deeper into the world of cryptography, you encounter a
          classic form of encryption, a Caesar cipher. Decode the cipher to
          reveal the location of the next clue.
        </p>
      </section>

      <section className="caesar-puzzle">
        <p className="cipher-text">
          **Caesar Cipher Text:** Uhyxohb. // Replace this text with your own
          cipher text
        </p>
        <div className="input-section">
          <label htmlFor="cipherInput">Enter the Decoded Location Name:</label>
          <input
            type="text"
            id="cipherInput"
            name="cipherInput"
            placeholder="Enter the decoded location"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
          />
          <button type="button" onClick={checkAnswer}>
            Submit
          </button>
        </div>

        {feedback && <p className="feedback-message">{feedback}</p>}

        {showNextButton && (
          <div className="next-button">
            <button onClick={handleNextClick}>Next</button>
          </div>
        )}
      </section>

      <footer className="caesar-footer">
        <p>
          &copy; 2140 Decipher Event | <a href="/">Home</a> |{" "}
          <a href="/rules">Rules</a>
        </p>
      </footer>
    </div>
  );
};

export default CaesarCipherPage;
