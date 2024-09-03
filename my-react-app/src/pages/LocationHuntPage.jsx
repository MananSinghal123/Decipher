import { useState } from "react";
import "./LocationHuntPage.css"; // Ensure you create this CSS file
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import axios

const LocationHuntPage = () => {
  const [selectedLocation, setSelectedLocation] = useState("");
  const [feedback, setFeedback] = useState("");
  const [lastTaskState, setLastTaskState] = useState(
    parseInt(localStorage.getItem("lastTask") || "0", 10)
  ); // Initialize from local storage or default to 0
  const navigate = useNavigate();

  const correctLocation = "Tokyo Tower"; // Replace with the actual correct location

  const checkLocation = async () => {
    if (selectedLocation === correctLocation) {
      setFeedback(
        "Correct! You've followed Satoshi's trail to the right location."
      );

      // You can add code here to navigate to the next page or reveal more content

      try {
        // Make the API request to submit the task
        const response = await axios.post(
          "http://localhost:5000/api/teams/task",
          {
            taskNumber: 2, // Assuming the task number is 2
            team: localStorage.getItem("teamName"), // Get the team name from local storage
          }
        );
        console.log("Pssed");
        // Extract currentTask and lastTask from the response data
        const { currentTask, lastTask } = response.data;

        // Update the state and local storage with the new last task
        setLastTaskState(lastTask);
        localStorage.setItem("lastTask", lastTask);

        // Navigate to the next page after successfully submitting the task
        navigate("/binary-ip-address");
      } catch (error) {
        setFeedback(
          "There was an error submitting the task. Please try again later."
        );
        console.error("Error submitting task:", error);
      }
    } else {
      setFeedback(
        "Incorrect. Remember, Satoshi was known for his subtlety. Try again!"
      );
    }
  };

  // Render content based on the current task state
  if (lastTaskState >= 1) {
    return (
      <div className="location-hunt-container">
        <header className="location-hunt-header">
          <h1>Location Hunt: Follow the Trail</h1>
          <h2>Can you trace Satoshi's elusive path?</h2>
        </header>

        <section className="location-hunt-intro">
          <p>
            Satoshi was known for his anonymity and the ability to remain
            untraceable. To continue on your quest, you must prove your ability
            to follow the trail of clues he left behind. Your next task is to
            determine the correct location from a set of possibilities using the
            given password or hint.
          </p>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
          >
            Don't click on it. This doesn't serve any purpose. Our developers
            just wanted to be funny. You've been warned!
          </a>
        </section>

        <section className="location-hunt-puzzle">
          <p className="puzzle-hint">
            "To find the next piece of the puzzle, think of the place where
            Satoshi's spirit of innovation meets the heart of technological
            advancement. Use this hint wisely: 'Rising Sun'."
          </p>

          <div className="location-select">
            <label htmlFor="location">Choose the Location:</label>
            <select
              id="location"
              name="location"
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
            >
              <option value="">Select a location</option>
              <option value="Silicon Valley">Silicon Valley</option>
              <option value="Tokyo Tower">Tokyo Tower</option>
              <option value="Blockchain Park">Blockchain Park</option>
              <option value="London Bridge">London Bridge</option>
            </select>
            <button type="button" onClick={checkLocation}>
              Submit
            </button>
          </div>

          {feedback && <p className="feedback-message">{feedback}</p>}
        </section>

        <footer className="location-hunt-footer">
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

export default LocationHuntPage;
