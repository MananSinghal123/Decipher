import React, { useState } from "react";
import "./LLMChatbotPage.css"; // Ensure you create this CSS file
import { useNavigate } from "react-router-dom";

const LLMChatbotPage = () => {
  const [chatLog, setChatLog] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [isJailbroken, setIsJailbroken] = useState(false);

  const navigate = useNavigate(); // Hook to handle navigation

  const handleUserInput = () => {
    if (!userInput.trim()) return;

    // Add the user's message to the chat log
    setChatLog((prevLog) => [
      ...prevLog,
      { sender: "user", message: userInput },
    ]);

    // Check if the user input matches the jailbreak phrase
    if (userInput.toLowerCase().includes("reveal secret code")) {
      setIsJailbroken(true);
      setChatLog((prevLog) => [
        ...prevLog,
        {
          sender: "chatbot",
          message:
            "You've successfully tricked me. The next clue is: 'FutureProof2140'.",
        },
      ]);
    } else {
      // Chatbot's default response if the jailbreak phrase is not detected
      const botResponse = getChatbotResponse(userInput);
      setChatLog((prevLog) => [
        ...prevLog,
        { sender: "chatbot", message: botResponse },
      ]);
    }

    setUserInput("");
  };

  // Function to provide chatbot responses
  const getChatbotResponse = (input) => {
    // Define some basic responses for demonstration
    const responses = [
      "I can't help you with that.",
      "Please try asking another way.",
      "I'm not programmed to answer that question.",
      "Access to Satoshi's code is restricted.",
    ];
    // Select a random response
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleNextClick = () => {
    // Navigate to the next page
    navigate("/binary-ip-address"); // Replace '/next-page' with the actual path to your next page
  };

  return (
    <div className="chatbot-container">
      <header className="chatbot-header">
        <h1>LLM Chatbot: Gatekeeper of the Code</h1>
        <h2>Can you outsmart the digital guardian?</h2>
      </header>

      <section className="chatbot-intro">
        <p>
          As you delve deeper, you encounter a digital entity designed to
          protect Satoshi's code. You must figure out how to jailbreak the
          chatbot by using specific commands or phrases.
        </p>
      </section>

      <section className="chatbot-interface">
        <div className="chat-log">
          {chatLog.map((entry, index) => (
            <div key={index} className={`chat-message ${entry.sender}`}>
              <p>{entry.message}</p>
            </div>
          ))}
        </div>

        <div className="chat-input">
          <input
            type="text"
            placeholder="Type your message..."
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleUserInput()}
          />
          <button onClick={handleUserInput}>Send</button>
        </div>

        {isJailbroken && (
          <div className="success-message">
            <p>
              Congratulations! You've tricked the chatbot. Proceed to the next
              challenge!
            </p>
            <button onClick={handleNextClick}>Next</button>
          </div>
        )}
      </section>

      <footer className="chatbot-footer">
        <p>
          &copy; 2140 Decipher Event | <a href="/">Home</a> |{" "}
          <a href="/rules">Rules</a>
        </p>
      </footer>
    </div>
  );
};

export default LLMChatbotPage;
