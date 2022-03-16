import { getPath, extractData } from '../api/feedback';
import { useState } from 'react';
import { Fragment } from 'react';

const FeedbackPage = (props) => {
  const [feedback, setFeedback] = useState();

  const loadFeedbackHandler = (id) => {
    fetch(`/api/${id}`)
      .then((res) => res.json())
      .then((data) => setFeedback(data.feedback));
  };

  return (
    <Fragment>
      {feedback && <p>{feedback.email}</p>}
      <ul>
        {props.items.map((item) => (
          <li key={item.id}>
            {item.feedback}
            <button onClick={loadFeedbackHandler.bind(null, item.id)}>
              See more
            </button>
          </li>
        ))}
      </ul>
    </Fragment>
  );
};

export async function getStaticProps() {
  const filePath = getPath();
  const data = extractData(filePath);

  return {
    props: {
      items: data,
    },
  };
}

export default FeedbackPage;
