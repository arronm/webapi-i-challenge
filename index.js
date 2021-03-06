// implement your API here
const express = require('express');
const cors = require('cors');
const database = require('./data/db');
const PORT = 4444;

const server = express();
server.use(express.json());
server.use(cors());

// GET ENDPOINTS
server.get('/', (req, res) => {
  res.send('host api documentation here');
});

// POST /api/users
server.post('/api/users', (req, res) => {
  if (!req.body.name || !req.body.bio) {
    res.status(400).json({ errorMessage: "Please provide a name and bio for the user." });
  }
  database.insert(req.body)
  .then(user => {
    res.status(201).json(user);
  })
  .catch(() => {
    res.status(500).json({ error: "There was an error while saving the user to the database " });
  })
});

// GET /api/users
server.get('/api/users', (req, res) => {
  database.find()
    .then((users) => {
      res.json(users);
    })
    .catch(() => {
      res.status(500).json({error: "The users information could not be retrieved."});
    });
});

// GET /api/users/:id
server. get('/api/users/:id', (req, res) => {
  database.findById(req.params.id)
    .then(user => {
      if (!user) res.status(404).json({ message: `The user with the specified ID (${req.params.id}) does not exist.`});
      res.json(user);
    })
    .catch(() => {
      res.status(500).json({ error: "The user information could not be retrieved." });
    });
});

// DELETE /api/users/:id
server.delete('/api/users/:id', (req, res) => {
  database.findById(req.params.id)
    .then(user => {
      if (!user) res.status(404).json({ message: `The user with the specified ID (${req.params.id}) does not exist.`});
      database.remove(req.params.id)
      .then(records => {
        if (!records) res.status(404).json({ message: `The user with the specified ID (${req.params.id}) does not exist.`});
        res.json(user);
      })
      .catch(() => {
        res.status(500).json({ error: 'The user could not be removed.'});
      });
    })
    .catch(() => {
      res.status(500).json({ error: 'The user could not be removed.' });
    })
});

// PUT /api/users/:id
server.put('/api/users/:id', (req, res) => {
  if (!req.body.name || !req.body.bio) {
    res.status(400).json({ errorMessage: "Please provide a name and bio for the user." });
  }

  database.findById(req.params.id)
    .then(user => {
      if (!user) res.status(404).json({ message: `The user with the specified ID (${req.params.id}) does not exist.`});
      database.update(req.params.id, req.body)
      .then(records => {
        if (!records) res.status(404).json({ message: `The user with the specified ID (${req.params.id}) does not exist.`});
        res.json({ ...user, ...req.body });
      })
      .catch(() => {
        res.status(500).json({ error: 'The user information could not be modified.'});
      });
    })
    .catch(() => {
      res.status(500).json({ error: 'The user information could not be modified.' });
    })
});

server.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
