import React, { useState } from "react";
import "./FinalAnswerPage.css"; // Ensure you create this CSS file

const FinalAnswerPage = () => {
  const [feedback, setFeedback] = useState("");

  // Final answer revealed by examining the event poster
  const correctAnswer = "BitcoinFinalKey"; // Replace with the actual hidden message

  const checkAnswer = (userInput) => {
    if (userInput.trim().toLowerCase() === correctAnswer.toLowerCase()) {
      setFeedback(
        "Congratulations! You've discovered the final answer hidden in plain sight. You've completed the Decipher event!"
      );
      // You can add navigation or reveal more content here
    } else {
      setFeedback(
        "Incorrect. Please refer back to the event poster and try again."
      );
    }
  };

  return (
    <div className="finalanswer-container">
      <header className="finalanswer-header">
        <h1>The Final Answer Revealed</h1>
        <h2>The answer was hidden in plain sight all along!</h2>
      </header>

      <section className="finalanswer-intro">
        <p>
          The final revelation is that the answer was embedded in the event
          poster you received. Hidden using steganography or another technique,
          the poster contains a jumbled keyword that reveals the final message.
        </p>
        <p>
          Check the poster carefully to find the hidden keyword. Once you have
          the final answer, enter it below.
        </p>
      </section>

      <section className="finalanswer-input">
        <div className="input-section">
          <label htmlFor="finalAnswerInput">Enter the Final Answer:</label>
          <input
            type="text"
            id="finalAnswerInput"
            name="finalAnswerInput"
            placeholder="Enter the final answer"
            onChange={(e) => checkAnswer(e.target.value)}
          />
        </div>

        {feedback && <p className="feedback-message">{feedback}</p>}
      </section>

      <footer className="finalanswer-footer">
        <p>
          &copy; 2140 Decipher Event | <a href="/">Home</a> |{" "}
          <a href="/rules">Rules</a>
        </p>
      </footer>
    </div>
  );
};

export default FinalAnswerPage;
