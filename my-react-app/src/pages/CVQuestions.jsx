import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CaesarCipherPage.css"; // Ensure you create this CSS file
import axios from "axios"; // Import axios
import Footer from "./Footer";
import poem from "../poem.gif"
import CVEQUEST from "../../public/documents/CVE-question-protected.pdf"
const CVQuestions = () => {
  const [userInput, setUserInput] = useState("");
  const [feedback, setFeedback] = useState("");
  // const [showNextButton, setShowNextButton] = useState(false); // State to manage button visibility
  const [lastTaskState, setLastTaskState] = useState(
    parseInt(localStorage.getItem("lastTask") || "0", 10)
  ); // Initialize from local storage or default to 0

  const navigate = useNavigate(); // Hook to handle navigation

  // Correct answer after decoding the Caesar cipher
  const correctAnswer = "CVE_ARE_SO_FUN"; // Replace with the actual decoded location name

  const checkAnswer = async () => {
    if (userInput.trim().toLowerCase() === correctAnswer.toLowerCase()) {
      setFeedback("Correct! You've decoded the CVQuestion.");
      // setShowNextButton(true); // Show the "Next" button when the answer is correct

      try {
        // Make the API request to submit the task
        const response = await axios.post(
          `${import.meta.env.VITE_CORRECT_BACKENDURL}/api/teams/task`,
          {
            taskNumber: 10, // Assuming the task number is 7                                                                  -------->what should it be
            team: localStorage.getItem("teamName"), // Get the team name from local storage
          }
        );

        // Extract currentTask and lastTask from the response data
        const { currentTask, lastTask } = response.data;

        // Update the state and local storage with the new last task
        setLastTaskState(lastTask);
        localStorage.setItem("lastTask", lastTask);
        navigate("/brain-fuck"); // Replace '/distorted-image' with the actual path to your next page
      } catch (error) {
        setFeedback(
          "There was an error processing your request. Please try again later."
        );
        console.error("Error submitting task:", error);
      }
    } else {
      setFeedback("Incorrect. Please try again.");
      // setShowNextButton(false); // Hide the "Next" button if the answer is incorrect
    }
  };

  // Render content based on the current task state
  if (lastTaskState >= 9) { //                                                                                                -------------->what should it be?
    // Assuming the user must complete task 6 to access this page
    return (
      <div className="caesar-container">
        <header className="caesar-header">
          <h1>Documentation is the Key 🙃</h1>
          <h2></h2>
        </header>

        <section className="caesar-intro">
          <div className="imagepoemdiv">
            <img className="imagepoem" src={poem} alt="" />
            <h3>Puzzle #10</h3>
          </div>
          <p>
            "All versions of package dojo are vulnerable to protoype pollution via setObject function"
          </p>
        </section>

        <section className="caesar-puzzle">
            <div className="download-section">
                <a href={CVEQUEST} download>
                Download PDF
                </a>
            </div>
          <p className="cipher-text">Downloading the pdf might help</p>
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

          {/* {showNextButton && (
            <div className="next-button">
              <button onClick={handleNextClick}>Next</button>
            </div>
          )} */}
        </section>

        <div className="caesar-footer">
          <Footer></Footer>
        </div>
      </div>
    );
  } else {
    return <>You have not completed the previous question</>;
  }
};

export default CVQuestions;
