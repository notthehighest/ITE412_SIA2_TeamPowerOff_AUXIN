const express = require('express');
const router = express.Router();

let loans = [
  { id: 1, borrowerId: 1, amount: 5000, status: "active" }
];
let nextLoanId = 2;

// GET /loans
router.get('/', (req, res) => res.json(loans));

// GET /loans/:id
router.get('/:id', (req, res) => {
  const id = Number(req.params.id);
  const l = loans.find(x => x.id === id);
  if (!l) return res.status(404).json({ message: "Loan not found" });
  res.json(l);
});

// POST /loans
router.post('/', (req, res) => {
  const { borrowerId, amount, status } = req.body;
  if (!borrowerId || !amount) return res.status(400).json({ message: "borrowerId and amount required" });
  const newL = { id: nextLoanId++, borrowerId, amount, status: status || "active" };
  loans.push(newL);
  res.status(201).json(newL);
});

// PUT /loans/:id
router.put('/:id', (req, res) => {
  const id = Number(req.params.id);
  const idx = loans.findIndex(x => x.id === id);
  if (idx === -1) return res.status(404).json({ message: "Loan not found" });
  loans[idx] = { ...loans[idx], ...req.body };
  res.json(loans[idx]);
});

// DELETE /loans/:id
router.delete('/:id', (req, res) => {
  const id = Number(req.params.id);
  loans = loans.filter(x => x.id !== id);
  res.status(204).send();
});

module.exports = router;
