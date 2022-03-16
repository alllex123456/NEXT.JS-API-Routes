import fs from 'fs';
import path from 'path';

export function getPath() {
  return path.join(process.cwd(), 'data', 'feedback.json');
}

export function extractData(filePath) {
  const fileData = fs.readFileSync(filePath);
  const data = JSON.parse(fileData);
  return data;
}

function handler(req, res) {
  if (req.method === 'POST') {
    const email = req.body.email;
    const feedbackText = req.body.feedback;

    const newFeedback = {
      id: new Date().toISOString(),
      email: email,
      feedback: feedbackText,
    };

    const filePath = getPath();
    const data = extractData(filePath);
    data.push(newFeedback);
    fs.writeFileSync(filePath, JSON.stringify(data));
    res.status(201).json({ message: 'success', wrote: newFeedback });
  } else {
    const filePath = getPath();
    const data = extractData(filePath);
    res.status(200).json({ feedback: data });
  }
}

export default handler;
