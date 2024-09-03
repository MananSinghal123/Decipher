import { useState } from "react";
import "./FinalAnswerPage.css"; // Ensure you create this CSS file

const FinalAnswerPage = () => {
  const [feedback, setFeedback] = useState("");

  return (
    <div className="finalanswer-container">
      <header className="finalanswer-header">
        <h1>The Final Answer Revealed</h1>
        <h2>The answer was hidden in plain sight all along!</h2>
      </header>

      <section className="finalanswer-intro">
        <p>
          The final revelation is that the answer was the event name all along!
          But what is the question you may ask? Maybe you'll find what you seek
          here:
        </p>
        <p>
          https://drive.google.com/file/d/12eAz0ru4rSH-sQ4TB825goD6QZR_8_vf/view?usp=drive_link
        </p>
      </section>

      <footer className="finalanswer-footer">
        <p>
          &copy; 2140 Decipher Event | <a href="/">Home</a> |{" "}
          <a href="/rules">Rules</a>
        </p>
      </footer>
    </div>
  );
};

export default FinalAnswerPage;
