import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./BinaryIPAddressPage.css"; // Ensure you create this CSS file

const BinaryIPAddressPage = () => {
  const [userInput, setUserInput] = useState("");
  const [feedback, setFeedback] = useState("");
  const [showNextButton, setShowNextButton] = useState(false); // State to manage button visibility
  const navigate = useNavigate(); // Hook to handle navigation

  // The correct answer after decoding the binary IP address
  const correctIPAddress = "127.0.0.1"; // Replace with your own binary encoded IP address equivalent

  const checkIPAddress = () => {
    if (userInput === correctIPAddress) {
      setFeedback("Correct! You've decoded the IP address.");
      setShowNextButton(true); // Show the "Next" button when the answer is correct
    } else {
      setFeedback("Incorrect. Please try again.");
      setShowNextButton(false); // Hide the "Next" button if the answer is incorrect
    }
  };

  const handleNextClick = () => {
    // Navigate to the next page
    navigate("/caesar-cipher"); // Replace '/next-page' with the actual path to your next page
  };

  return (
    <div className="binary-ip-container">
      <header className="binary-ip-header">
        <h1>Binary IP Address: Decipher the Digital Clue</h1>
        <h2>Can you decode the binary IP address?</h2>
      </header>

      <section className="binary-ip-intro">
        <p>
          The next clue is hidden in the digital realm, where Satoshi's code has
          been fragmented and stored in a binary encoded IP address. Decode the
          binary IP address to access the next clue.
        </p>
      </section>

      <section className="binary-ip-puzzle">
        <p className="binary-hint">
          **Binary IP Address Hint:** 1111111.0000000.0000000.0000001
        </p>
        <div className="input-section">
          <label htmlFor="ipInput">Enter the Decoded IP Address:</label>
          <input
            type="text"
            id="ipInput"
            name="ipInput"
            placeholder="Enter the IP address in standard form"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
          />
          <button type="button" onClick={checkIPAddress}>
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

      <footer className="binary-ip-footer">
        <p>
          &copy; 2140 Decipher Event | <a href="/">Home</a> |{" "}
          <a href="/rules">Rules</a>
        </p>
      </footer>
    </div>
  );
};

export default BinaryIPAddressPage;
