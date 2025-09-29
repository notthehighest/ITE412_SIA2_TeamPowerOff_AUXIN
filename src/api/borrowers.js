const express = require('express');
const router = express.Router();

let borrowers = [
  { id: 1, name: "Juan Dela Cruz", email: "juan@email.com" }
];
let nextId = 2;

// GET /borrowers - all
router.get('/', (req, res) => res.json(borrowers));

// GET /borrowers/:id
router.get('/:id', (req, res) => {
  const id = Number(req.params.id);
  const b = borrowers.find(x => x.id === id);
  if (!b) return res.status(404).json({ message: "Borrower not found" });
  res.json(b);
});

// POST /borrowers
router.post('/', (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) return res.status(400).json({ message: "name and email required" });
  const newB = { id: nextId++, name, email };
  borrowers.push(newB);
  res.status(201).json(newB);
});

// PUT /borrowers/:id
router.put('/:id', (req, res) => {
  const id = Number(req.params.id);
  const idx = borrowers.findIndex(x => x.id === id);
  if (idx === -1) return res.status(404).json({ message: "Borrower not found" });
  borrowers[idx] = { ...borrowers[idx], ...req.body };
  res.json(borrowers[idx]);
});

// DELETE /borrowers/:id
router.delete('/:id', (req, res) => {
  const id = Number(req.params.id);
  borrowers = borrowers.filter(x => x.id !== id);
  res.status(204).send();
});

module.exports = router;
