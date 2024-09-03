import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./BinaryIPAddressPage.css"; // Ensure you create this CSS file
import axios from "axios"; // Import axios

const BinaryIPAddressPage = () => {
  const [userInput, setUserInput] = useState("");
  const [feedback, setFeedback] = useState("");
  const [showNextButton, setShowNextButton] = useState(false); // State to manage button visibility
  const [lastTaskState, setLastTaskState] = useState(
    parseInt(localStorage.getItem("lastTask") || "0", 10)
  ); // Initialize from local storage or default to 0

  const navigate = useNavigate(); // Hook to handle navigation

  // The correct answer after decoding the binary IP address
  const correctIPAddress = "192.168.1.1"; // Replace with your own binary encoded IP address equivalent

  const checkIPAddress = async () => {
    if (userInput === correctIPAddress) {
      setFeedback(
        "Correct! You've decoded the IP address. The next clue is: 'NetworkNinja42'."
      );
      setShowNextButton(true); // Show the "Next" button when the answer is correct

      try {
        // Make the API request to submit the task
        const response = await axios.post(
          "http://localhost:5000/api/teams/task",
          {
            taskNumber: 5, // Assuming the task number is 5
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
    navigate("/dancing-with-flags"); // Replace '/dancing-with-flags' with the actual path to your next page
  };

  // Render content based on the current task state
  if (lastTaskState >= 4) {
    // Assuming the user must complete task 4 to access this page
    return (
      <div className="binary-ip-container">
        <header className="binary-ip-header">
          <h1>Binary IP Address: Decipher the Digital Clue</h1>
          <h2>Can you decode the binary IP address?</h2>
        </header>

        <section className="binary-ip-intro">
          <p>
            The next clue is hidden in the digital realm, where Satoshi's code
            has been fragmented and stored in a binary encoded IP address.
            Decode the binary IP address to access the next clue.
          </p>
        </section>

        <section className="binary-ip-puzzle">
          <p className="binary-hint">
            **Binary IP Address Hint:** 11000000.10101000.00000001.00000001
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
  } else {
    return <>You have not completed the previous question</>;
  }
};

export default BinaryIPAddressPage;
