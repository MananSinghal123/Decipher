import { useState } from "react";
import "./LocationHuntPage.css"; // Ensure you create this CSS file
import { useNavigate } from "react-router-dom";

const LocationHuntPage = () => {
  const [selectedLocation, setSelectedLocation] = useState("");
  const [feedback, setFeedback] = useState("");
  const navigate = useNavigate();
  const correctLocation = "Tokyo Tower"; // Replace with the actual correct location

  const checkLocation = () => {
    if (selectedLocation === correctLocation) {
      setFeedback(
        "Correct! You've followed Satoshi's trail to the right location."
      );
      navigate("/decipher-page");
      // You can add code here to navigate to the next page or reveal more content
    } else {
      setFeedback(
        "Incorrect. Remember, Satoshi was known for his subtlety. Try again!"
      );
    }
  };

  return (
    <div className="location-hunt-container">
      <header className="location-hunt-header">
        <h1>Location Hunt: Follow the Trail</h1>
        <h2>Can you trace Satoshi's elusive path?</h2>
      </header>

      <section className="location-hunt-intro">
        <p>
          Satoshi was known for his anonymity and the ability to remain
          untraceable. To continue on your quest, you must prove your ability to
          follow the trail of clues he left behind. Your next task is to
          determine the correct location from a set of possibilities using the
          given password or hint.
        </p>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
        >
          Don't click on it. This doesn't serve any purpose. Our developers just
          wanted to be funny. You've been warned!
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
};

export default LocationHuntPage;
