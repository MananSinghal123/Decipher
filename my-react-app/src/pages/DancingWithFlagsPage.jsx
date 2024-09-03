import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./DancingWithFlagsPage.css"; // Ensure you create this CSS file
import axios from "axios"; // Import axios

const DancingWithFlagsPage = () => {
  const [userInput, setUserInput] = useState("");
  const [feedback, setFeedback] = useState("");
  const [showNextButton, setShowNextButton] = useState(false); // State to manage button visibility
  const [lastTaskState, setLastTaskState] = useState(
    parseInt(localStorage.getItem("lastTask") || "0", 10)
  ); // Initialize from local storage or default to 0

  const navigate = useNavigate(); // Hook to handle navigation

  // Correct answer after decoding the flag signals
  const correctAnswer = "genesis"; // Replace with your actual correct answer

  const checkAnswer = async () => {
    if (userInput.trim().toLowerCase() === correctAnswer.toLowerCase()) {
      setFeedback("Correct! You've decoded the flag signals.");
      setShowNextButton(true); // Show the "Next" button when the answer is correct

      try {
        // Make the API request to submit the task
        const response = await axios.post(
          "http://localhost:5000/api/teams/task",
          {
            taskNumber: 6, // Assuming the task number is 6
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
    navigate("/brain-fuck"); // Replace '/next-page' with the actual path to your next page
  };

  
    navigate("/caesar-cipher"); // Replace '/caesar-cipher' with the actual path to your next page
  };

  // Render content based on the current task state
  if (lastTaskState >= 5) {
    // Assuming the user must complete task 5 to access this page
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
  } else {
    return <>You have not completed the previous question</>;
  }
};

export default DancingWithFlagsPage;
