import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CaesarCipherPage.css"; // Ensure you create this CSS file

const Brainfuck = () => {
  const [userInput, setUserInput] = useState("");
  const [feedback, setFeedback] = useState("");
  const [showNextButton, setShowNextButton] = useState(false); // State to manage button visibility
  const navigate = useNavigate(); // Hook to handle navigation

  // Correct answer after decoding the Caesar cipher
  const correctAnswer = "pointer"; // Replace with the actual decoded location name

  const checkAnswer = () => {
    if (userInput.trim().toLowerCase() === correctAnswer.toLowerCase()) {
      setFeedback("Correct! You've decoded the Brainfuck cipher.");
      setShowNextButton(true); // Show the "Next" button when the answer is correct
    } else {
      setFeedback("Incorrect. Please try again.");
      setShowNextButton(false); // Hide the "Next" button if the answer is incorrect
    }
  };

  const handleNextClick = () => {
    // Navigate to the next page
    navigate("/morse-code-video"); // Replace '/next-page' with the actual path to your next page
  };

  const brainfuckCode = `
+[------->++<]>++.-.------.+++++.++++++.+++[->+++<]>.+++++++++++++.`; //pointer

  return (
    <div className="caesar-container">
      <header className="caesar-header">
        <h1>Brain Fuck: Uncover the Hidden Message</h1>
        <h2>Decode the cipher to move to next level</h2>
      </header>

      <section className="caesar-intro">
        <p>
          As you delve deeper into the world of cryptography, you encounter a
          non-classic not very family friendlyform of encryption, a Caesar
          cipher. Decode the cipher to reveal the location of the next clue.
        </p>
      </section>

      <section className="caesar-puzzle">
        <p className="cipher-text">{brainfuckCode}</p>
        <div className="input-section">
          <label htmlFor="cipherInput">Enter the Decoded Message:</label>
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

export default Brainfuck;
