import { getPath, extractData } from './feedback';

const handler = (req, res) => {
  const path = getPath();
  const data = extractData(path);

  const id = req.query.feedbackId;

  const selectedFeedback = data.find((item) => item.id === id);

  res.status(200).json({ feedback: selectedFeedback });
};

export default handler;
