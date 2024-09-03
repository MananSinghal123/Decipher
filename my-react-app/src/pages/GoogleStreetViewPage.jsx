import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import axios
import "./GoogleStreetViewPage.css"; // Ensure you create this CSS file

const GoogleStreetViewPage = () => {
  const [userInput, setUserInput] = useState("");
  const [feedback, setFeedback] = useState("");
  const [showNextButton, setShowNextButton] = useState(false); // State to manage button visibility
  const [lastTaskState, setLastTaskState] = useState(
    parseInt(localStorage.getItem("lastTask") || "0", 10)
  ); // Initialize from local storage or default to 0
  const navigate = useNavigate(); // Hook to handle navigation

  // Correct answer found by exploring Google Street View
  const correctAnswer = "hollywood"; // Replace with the actual hidden message

  const checkAnswer = async () => {
    if (userInput.trim().toLowerCase() === correctAnswer.toLowerCase()) {
      setFeedback(
        "Correct! You've found the hidden message on Google Street View. The next clue is unlocked."
      );
      setShowNextButton(true); // Show the "Next" button when the answer is correct

      try {
        // Make the API request to submit the task
        const response = await axios.post(
          "http://localhost:5000/api/teams/task",
          {
            taskNumber: 9, // Assuming the task number is 9
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
    navigate("/dancing-with-flags"); // Replace '/next-page' with the actual path to your next page
  };

 

   
  // Render content based on the current task state
  if (lastTaskState >= 8) {
    // Assuming the user must complete task 8 to access this page
    return (
    <div className="streetview-container">
      <header className="streetview-header">
        <h1>Google Street View: Find the Hidden Message</h1>
        <h2>Follow the coordinates to discover the next clue!</h2>
        <h3>Hint: It's on a Hill</h3>
      </header>


        <section className="streetview-intro">
          <p>
            The clue takes you to the real world, where the digital and physical
            worlds intersect. Use the coordinates below to explore Google Street
            View and find a hidden password or message.
          </p>
        </section>


      <section className="streetview-coordinates">
        <h3>Coordinates:</h3>
        <p className="coordinates-text">34°8′2.62″N 118°19′17.73″W</p>{" "}
        {/* Replace with actual coordinates */}
        <a
          href="https://www.google.com/maps"
          target="_blank"
          rel="noopener noreferrer"
          className="streetview-link"
        >
          Open in Google Maps
        </a>
      </section>


        <section className="streetview-puzzle">
          <div className="input-section">
            <label htmlFor="streetviewInput">Enter the Hidden Message:</label>
            <input
              type="text"
              id="streetviewInput"
              name="streetviewInput"
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

        <footer className="streetview-footer">
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

export default GoogleStreetViewPage;
