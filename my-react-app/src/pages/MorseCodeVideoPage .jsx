import { useState } from "react";
import "./MorseCodeVideoPage.css"; // Ensure you create this CSS file
import { useNavigate } from "react-router-dom";

const MorseCodeVideoPage = () => {
  const [decodedMessage, setDecodedMessage] = useState("");
  const [feedback, setFeedback] = useState("");
  const navigate = useNavigate();

  const correctMessage = "kernel"; // Replace with the actual Morse code message decoded

  const checkMessage = () => {
    if (decodedMessage.toLowerCase() === correctMessage) {
      setFeedback("Correct! You've deciphered the hidden Morse code message.");
      navigate("/final-answer");
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
          <br />
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.google.com/imgres?imgurl=https%3A%2F%2Fwww.wikihow.com%2Fimages%2Fthumb%2F1%2F17%2FLearn-Morse-Code-Step-2-Version-4.jpg%2Fv4-460px-Learn-Morse-Code-Step-2-Version-4.jpg.webp&tbnid=-6iMM1I3FvoyVM&vet=1&imgrefurl=https%3A%2F%2Fwww.wikihow.com%2FLearn-Morse-Code&docid=gBbtRGbI5Y7vFM&w=460&h=345&hl=en-US&source=sh%2Fx%2Fim%2Fm1%2F4&kgs=e93059792281d28f&shem=abme%2Ctrie"
          >
            Hint
          </a>
        </p>
      </section>

      <section className="morse-code-puzzle">
        {/* Replace 'video.mp4' with the actual video file path */}
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/WTx_L2r4JlA?si=VmMAAaomQ-2N1i6r"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerpolicy="strict-origin-when-cross-origin"
          allowfullscreen
        ></iframe>
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
