const express = require('express');
const { Client } = require('pg');
const app = express();
const port = 3000;

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'postgres',
  port: 5432,
});

client.connect().then(() => {
  console.log('Connected to the database');
}).catch(error => {
  console.error('Error connecting to the database:', error);
});

app.use(express.json());
app.use(express.static('public'));

app.get('/search', async (req, res) => {
  const userId = req.query.userId;

  if (!userId) {
    return res.status(400).send('User ID is required');
  }

  try {
    const query = 'SELECT * FROM users WHERE id = $1';
    const values = [userId];
    const result = await client.query(query, values);

    if (result.rows.length === 0) {
      return res.status(404).send('User not found');
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).send('Server error');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
