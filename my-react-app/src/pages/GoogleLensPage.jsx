
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import axios
import "./GoogleLensPage.css"; // Ensure you create this CSS file

const GoogleLensPage = () => {
  const [userInput, setUserInput] = useState("");
  const [feedback, setFeedback] = useState("");
  const [showNextButton, setShowNextButton] = useState(false); // State to manage button visibility
  const [lastTaskState, setLastTaskState] = useState(
    parseInt(localStorage.getItem("lastTask") || "0", 10)
  ); // Initialize from local storage or default to 0
  const navigate = useNavigate(); // Hook to handle navigation

  // Correct answer found by analyzing the image with Google Lens
  const correctAnswer = "Moraine"; // Replace with the actual hidden message

  const checkAnswer = async () => {
    if (userInput.trim().toLowerCase() === correctAnswer.toLowerCase()) {
      setFeedback("Correct! ");
      setShowNextButton(true); // Show the "Next" button when the answer is correct

      try {
        // Make the API request to submit the final task
        const response = await axios.post(
          "http://localhost:5000/api/teams/task",
          {
            taskNumber: 10, // Assuming the task number is 10
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
    // Navigate to the final page or a completion page
    navigate("/google-street-view"); // Replace '/completion-page' with the actual path to your final page
  };

 


  // Render content based on the current task state
  if (lastTaskState >= 9) {
    // Assuming the user must complete task 9 to access this page
    return (
    <div className="googlelens-container">
      <header className="googlelens-header">
        <h1>Google Lens: Uncover the Clue</h1>
        <h2>
          Use Google Lens to analyze the image and find the hidden message!
        </h2>
      </header>

      <section className="googlelens-intro">
        <p>
          The final piece of the puzzle lies hidden in an image. Use Google Lens
          to uncover the hidden message. This step symbolizes the need for
          modern tools and techniques to fully understand Satoshi’s legacy.
        </p>
      </section>

      <section className="googlelens-image">
        {/* Placeholder for the image to be analyzed with Google Lens. Replace src with actual image URL */}
        <img
          src="../../moraine.jpeg"
          alt="Hidden Clue"
          className="googlelens-puzzle-image"
        />
      </section>

      <section className="googlelens-puzzle">
        <div className="input-section">
          <label htmlFor="lensInput">Enter the name:</label>
          <input
            type="text"
            id="lensInput"
            name="lensInput"
            placeholder="Enter the hidden message"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}

          />
        </section>

        <section className="googlelens-puzzle">
          <div className="input-section">
            <label htmlFor="lensInput">Enter the Hidden Message:</label>
            <input
              type="text"
              id="lensInput"
              name="lensInput"
              placeholder="Enter the hidden message"
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

        <footer className="googlelens-footer">
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

export default GoogleLensPage;
