import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CaesarCipherPage.css"; // Ensure you create this CSS file
import axios from "axios"; // Import axios

const CaesarCipherPage = () => {
  const [userInput, setUserInput] = useState("");
  const [feedback, setFeedback] = useState("");
  const [showNextButton, setShowNextButton] = useState(false); // State to manage button visibility
  const [lastTaskState, setLastTaskState] = useState(
    parseInt(localStorage.getItem("lastTask") || "0", 10)
  ); // Initialize from local storage or default to 0

  const navigate = useNavigate(); // Hook to handle navigation

  // Correct answer after decoding the Caesar cipher
  const correctAnswer = "Laodamia"; // Replace with the actual decoded location name

  const checkAnswer = async () => {
    if (userInput.trim().toLowerCase() === correctAnswer.toLowerCase()) {
      setFeedback("Correct! You've decoded the Caesar cipher.");
      setShowNextButton(true); // Show the "Next" button when the answer is correct

      try {
        // Make the API request to submit the task
        const response = await axios.post(
          "http://localhost:5000/api/teams/task",
          {
            taskNumber: 4, // Assuming the task number is 7
            team: localStorage.getItem("teamName"), // Get the team name from local storage
          }
        );

        // Extract currentTask and lastTask from the response data
        const { currentTask, lastTask } = response.data;

        // Update the state and local storage with the new last task
        setLastTaskState(lastTask);
        localStorage.setItem("lastTask", lastTask);
      } catch (error) {
        setFeedback(
          "There was an error processing your request. Please try again later."
        );
        console.error("Error submitting task:", error);
      }
    } else {
      setFeedback("Incorrect. Please try again.");
      setShowNextButton(false); // Hide the "Next" button if the answer is incorrect
    }
  };

  const handleNextClick = () => {
    // Navigate to the next page
    navigate("/distorted-image"); // Replace '/distorted-image' with the actual path to your next page
  };

  // Render content based on the current task state
  if (lastTaskState >= 3) {
    // Assuming the user must complete task 6 to access this page
    return (
      <div className="caesar-container">
        <header className="caesar-header">
          <h1>Caesar Cipher: Uncover the Hidden Poem</h1>
          <h2></h2>
        </header>

        <section className="caesar-intro">
          <p>
            "With sacrifice before the rising morn Vows have I made by fruitless
            hope inspired; And from the infernal Gods, 'mid shades forlorn Of
            night, my slaughtered Lord have I required: Celestial pity I again
            implore;— Restore him to my sight—great Jove, restore!"
          </p>
        </section>

        <section className="caesar-puzzle">
          <p className="cipher-text">What is this? Literary Club? xD</p>
          <div className="input-section">
            <label htmlFor="cipherInput">Enter the name:</label>
            <input
              type="text"
              id="cipherInput"
              name="cipherInput"
              placeholder="Your answer"
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
  } else {
    return <>You have not completed the previous question</>;
  }
};

export default CaesarCipherPage;
