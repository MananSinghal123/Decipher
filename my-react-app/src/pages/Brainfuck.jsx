import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import axios
import "./CaesarCipherPage.css"; // Ensure you create this CSS file
// import "./brainfuck.css"; // Ensure you create this CSS file
import Footer from "./Footer";
const Brainfuck = () => {
  const [userInput, setUserInput] = useState("");
  const [feedback, setFeedback] = useState("");
  // const [showNextButton, setShowNextButton] = useState(false); // State to manage button visibility
  const [lastTaskState, setLastTaskState] = useState(
    parseInt(localStorage.getItem("lastTask") || "0", 10)
  ); // Initialize from local storage or default to 0
  const navigate = useNavigate(); // Hook to handle navigation
  const [allternateQuestion, setallternateQuestion] = useState(false);

  // Correct answer after decoding the Brainfuck cipher
  // Replace with the actual decoded location name
  const [correctAnswer, setcorrectAnswer] = useState("pointer");

  const alternateQuestionHandler = async () => {
    setallternateQuestion(true);
    setcorrectAnswer("pointer2");
  };

  const checkAnswer = async () => {
    if (userInput.trim().toLowerCase() === correctAnswer.toLowerCase()) {
      setFeedback("Correct! You've decoded the Brainfuck cipher.");
      // setShowNextButton(true); // Show the "Next" button when the answer is correct

      try {
        // Make the API request to submit the task
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
        navigate("/final-answer"); // Replace '/final-answer' with the actual path to your next page
      } catch (error) {
        setFeedback(
          "There was an error submitting the task. Please try again later."
        );
        console.error("Error submitting task:", error);
      }
    } else {
      setFeedback("Incorrect. Please try again.");
      // setShowNextButton(false); // Hide the "Next" button if the answer is incorrect
    }
  };

  const brainfuckCode = `
+[------->++<]>++.-.------.+++++.++++++.+++[->+++<]>.+++++++++++++.`; // pointer

  // Render content based on the current task state
  if (lastTaskState >= 9) {
    return (
      <div className="caesar-container">
        <header className="caesar-header">
          <h1>Brain Fuck: Uncover the Hidden Message</h1>
          <h2>Decode the cipher to move to next level</h2>
        </header>

        <section className="caesar-intro">
          {!allternateQuestion ? (
            <p>
              As you delve deeper into the world of cryptography, you encounter
              a non-classic, not very family-friendly form of encryption. Decode
              the cipher to reveal the location of the next clue.
            </p>
          ) : (
            <p>
              You're currently at an alternate stage of the challenge. To
              proceed with this stage, you've been provided with a map showing
              four points. Just explore the area, and you'll find hints waiting
              for you at each marked location.
            </p>
          )}
        </section>

        <section className="caesar-puzzle">
          <p className="cipher-text">
            {!allternateQuestion ? (
              brainfuckCode
            ) : (
              <img src="/genesis.jpeg"></img>
            )}
          </p>
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
            <button className="btn-1" type="button" onClick={checkAnswer}>
              Submit
            </button>
            {!allternateQuestion && (
              <button
                className="btn-2"
                type="button"
                onClick={alternateQuestionHandler}
              >
                Alternate
              </button>
            )}
          </div>

          {feedback && <p className="feedback-message">{feedback}</p>}
        </section>

        <div className="caesar-footer">
          <Footer></Footer>
        </div>
      </div>
    );
  } else {
    return <p>You have not completed the previous question</p>;
  }
};

export default Brainfuck;
