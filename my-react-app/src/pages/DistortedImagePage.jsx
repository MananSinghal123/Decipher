import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./DistortedImagePage.css"; // Ensure you create this CSS file

const DistortedImagePage = () => {
  const [userInput, setUserInput] = useState("");
  const [feedback, setFeedback] = useState("");
  const [showNextButton, setShowNextButton] = useState(false); // State to manage button visibility
  const navigate = useNavigate(); // Hook to handle navigation

  // Correct answer after analyzing or reversing the distortion
  const correctAnswer = "Innovate"; // Replace with the actual decoded message

  const checkAnswer = () => {
    if (userInput.trim().toLowerCase() === correctAnswer.toLowerCase()) {
      setFeedback("Correct! You've deciphered the image.");
      setShowNextButton(true); // Show the "Next" button when the answer is correct
    } else {
      setFeedback("Incorrect. Please try again.");
      setShowNextButton(false); // Hide the "Next" button if the answer is incorrect
    }
  };

  const handleNextClick = () => {
    // Navigate to the next page
    navigate("/google-lens"); // Replace '/next-page' with the actual path to your next page
  };

  return (
    <div className="distorted-container">
      <header className="distorted-header">
        <h1>Distorted Image: Reveal the Hidden Clue</h1>
        <h2>Analyze the image carefully to uncover the secret!</h2>
      </header>

      <section className="distorted-intro">
        <p>
          The next fragment of Satoshi's code is hidden in an image, distorted
          to prevent easy access. Analyze or reverse the distortion to reveal
          the hidden clue.
        </p>
      </section>

      <section className="distorted-image">
        {/* Placeholder for the distorted image. Replace src with actual image URL */}
        <img
          src="../../innovate.jpeg"
          alt="Distorted Clue"
          className="distorted-puzzle-image"
          style={{ transform: "scaleX(-1)" }}
        />
      </section>

      <section className="distorted-puzzle">
        <div className="input-section">
          <label htmlFor="imageInput">Enter the Decoded Message:</label>
          <input
            type="text"
            id="imageInput"
            name="imageInput"
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

      <footer className="distorted-footer">
        <p>
          &copy; 2140 Decipher Event | <a href="/">Home</a> |{" "}
          <a href="/rules">Rules</a>
        </p>
      </footer>
    </div>
  );
};

export default DistortedImagePage;
