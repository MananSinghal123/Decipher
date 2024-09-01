import React, { useState } from "react";
import "./MorseCodeVideoPage.css"; // Ensure you create this CSS file
import { useNavigate } from "react-router-dom";

const MorseCodeVideoPage = () => {
  const [decodedMessage, setDecodedMessage] = useState("");
  const [feedback, setFeedback] = useState("");
  const navigate = useNavigate();

  const correctMessage = "satoshicryptography"; // Replace with the actual Morse code message decoded

  const checkMessage = () => {
    if (decodedMessage.toLowerCase() === correctMessage) {
      setFeedback("Correct! You've deciphered the hidden Morse code message.");
      navigate("/llm-chatbot");
      // You can add code here to navigate to the next page or reveal more content
    } else {
      setFeedback(
        "Incorrect. Keep an eye on the blinking pattern and try again!"
      );
    }
  };

  return (
    <div className="morse-code-container">
      <header className="morse-code-header">
        <h1>Morse Code Video: Hidden in Plain Sight</h1>
        <h2>Can you decode the message?</h2>
      </header>

      <section className="morse-code-intro">
        <p>
          Satoshi's communication was always encrypted and subtle. The next
          piece of the code is hidden in plain sight, in the blink of an eye.
          Watch the video carefully and see if you can decipher the hidden
          message in Morse code.
        </p>
      </section>

      <section className="morse-code-puzzle">
        {/* Replace 'video.mp4' with the actual video file path */}
        <video width="600" controls className="morse-code-video">
          <source src="video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <p className="puzzle-hint">
          "Watch closely. The message is in the blinks. Decode the Morse code to
          find the hidden message."
        </p>

        <div className="message-input">
          <label htmlFor="message">Enter the Decoded Message:</label>
          <input
            type="text"
            id="message"
            name="message"
            placeholder="Enter the decoded message here"
            value={decodedMessage}
            onChange={(e) => setDecodedMessage(e.target.value)}
          />
          <button type="button" onClick={checkMessage}>
            Submit
          </button>
        </div>

        {feedback && <p className="feedback-message">{feedback}</p>}
      </section>

      <footer className="morse-code-footer">
        <p>
          &copy; 2140 Decipher Event | <a href="/">Home</a> |{" "}
          <a href="/rules">Rules</a>
        </p>
      </footer>
    </div>
  );
};

export default MorseCodeVideoPage;
