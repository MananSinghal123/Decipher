import React, { useState } from "react";
import axios from "axios";
import "./RegisterTeamPage.css"; // Ensure you create this CSS file
import { useNavigate } from "react-router-dom";

const RegisterTeamPage = () => {
  const [teamName, setTeamName] = useState("");
  const [feedback, setFeedback] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFeedback("");

    try {
      const response = await axios.post("http://localhost:5000/api/teams", {
        teamName,
      });
      console.log(response.status);
      if (response.status === 201) {
        // Set localStorage values
        localStorage.setItem("teamName", teamName);
        localStorage.setItem("lastTask", 0);

        setFeedback(
          "Registration successful! Please wait for further instructions."
        );
        navigate("/decipher-page");
        // Optionally, redirect or clear form
        setTeamName("");
      } else {
        setFeedback("Registration failed. Please try again.");
      }
    } catch (error) {
      setFeedback(`${error.response.data.error}`);
      console.error("Error registering team:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="register-team-container">
      <header className="register-team-header">
        <h1>Register Your Team</h1>
        <h2>Join the Decipher Event!</h2>
      </header>

      <section className="register-team-form">
        <form onSubmit={handleRegister}>
          <div className="form-group">
            <label htmlFor="teamName">Team Name:</label>
            <input
              type="text"
              id="teamName"
              name="teamName"
              placeholder="Enter your team name"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              required
            />
          </div>

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Registering..." : "Register"}
          </button>
        </form>

        {feedback && <p className="feedback-message">{feedback}</p>}
      </section>

      <footer className="register-team-footer">
        <p>
          &copy; 2140 Decipher Event | <a href="/">Home</a> |{" "}
          <a href="/rules">Rules</a>
        </p>
      </footer>
    </div>
  );
};

export default RegisterTeamPage;
