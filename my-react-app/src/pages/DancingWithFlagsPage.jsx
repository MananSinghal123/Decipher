import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./DancingWithFlagsPage.css"; // Ensure you create this CSS file

const DancingWithFlagsPage = () => {
  const [userInput, setUserInput] = useState("");
  const [feedback, setFeedback] = useState("");
  const [showNextButton, setShowNextButton] = useState(false); // State to manage button visibility
  const navigate = useNavigate(); // Hook to handle navigation

  // Correct answer after decoding the flag signals
  const correctAnswer = "genesis"; // Replace with your actual correct answer

  const checkAnswer = () => {
    if (userInput.trim().toLowerCase() === correctAnswer.toLowerCase()) {
      setFeedback("Correct! You've decoded the flag signals.");
      setShowNextButton(true); // Show the "Next" button when the answer is correct
    } else {
      setFeedback("Incorrect. Please try again.");
      setShowNextButton(false); // Hide the "Next" button if the answer is incorrect
    }
  };

  const handleNextClick = () => {
    // Navigate to the next page
    navigate("/brain-fuck"); // Replace '/next-page' with the actual path to your next page
  };

  return (
    <div className="flags-container">
      <header className="flags-header">
        <h1>Dancing with Flags: Decode the Signal</h1>
        <h2>Watch carefully and uncover the hidden message!</h2>
      </header>

      <section className="flags-intro">
        <p>
          Satoshi's code was distributed across different media, including old
          forms of communication. Here, it’s embedded in a seemingly innocuous
          dance. Decode the flag signals to uncover the next piece of the code.
        </p>
      </section>

      <section className="flags-video">
        {/* Placeholder for the video. Replace src with actual video URL */}
        <img src="../../genesis.jpeg" />
      </section>

      <section className="flags-puzzle">
        <div className="input-section">
          <label htmlFor="flagInput">Enter the Decoded Message:</label>
          <input
            type="text"
            id="flagInput"
            name="flagInput"
            placeholder="Enter the decoded message"
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

      <footer className="flags-footer">
        <p>
          &copy; 2140 Decipher Event | <a href="/">Home</a> |{" "}
          <a href="/rules">Rules</a>
        </p>
      </footer>
    </div>
  );
};

export default DancingWithFlagsPage;
