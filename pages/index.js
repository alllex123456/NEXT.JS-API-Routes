import { useRef, useState } from 'react';

function HomePage() {
  const [feedbacks, setFeedbacks] = useState([]);
  const emailInputRef = useRef();
  const feedbackInputRef = useRef();

  const submitHandler = (e) => {
    e.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredFeedback = feedbackInputRef.current.value;

    fetch('/api/feedback', {
      method: 'POST',
      body: JSON.stringify({
        email: enteredEmail,
        feedback: enteredFeedback,
      }),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  };

  function showFeedback() {
    fetch('/api/feedback')
      .then((res) => res.json())
      .then((data) => setFeedbacks(data.feedback));
  }

  return (
    <div>
      <h1>The Home Page</h1>

      <form onSubmit={submitHandler}>
        <div>
          <label htmlFor="email">Email Address:</label>
          <input type="email" id="email" ref={emailInputRef} />
        </div>
        <div>
          <label htmlFor="feedback">Feedback:</label>
          <textarea id="feedback" rows="5" ref={feedbackInputRef}></textarea>
        </div>
        <button>Submit Feedback</button>
      </form>
      <button onClick={showFeedback}>Show all feedback</button>
      <ul>
        {feedbacks.map((feedback) => (
          <li key={feedback.id}>{feedback.feedback}</li>
        ))}
      </ul>
    </div>
  );
}

export default HomePage;
