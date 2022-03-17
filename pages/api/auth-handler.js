import path from 'path';
import fs from 'fs';

const handler = (req, res) => {
  if (req.method === 'POST') {
    const newUser = {
      username: req.body.username,
      password: req.body.password,
    };

    const filePath = path.join(process.cwd(), 'data', 'auth-data.json');
    const fileData = fs.readFileSync(filePath);
    const data = JSON.parse(fileData);

    data.push(newUser);

    fs.writeFileSync(filePath, JSON.stringify(data));
    res.status(200).json({ message: JSON.stringify(newUser) });
  } else {
    const filePath = path.join(process.cwd(), 'data', 'auth-data.json');
    const fileData = fs.readFileSync(filePath);
    const data = JSON.parse(fileData);

    res.status(200).json(data);
  }
};

export default handler;
