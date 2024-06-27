// to run server: node server.mjs
import express from "express";
import cors from "cors";

const port = 3000;
const app = express();
app.use(cors());
app.use(express.json());

let users = [];
let expenses = [];
let categories = [];
let currentUserId = 1;
let currentExpenseId = 1;
let currentCategoryId = 1;

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

app.post('/register', (req, res) => {
  const user = {...req.body, userId: currentUserId, monthlyBudget: 0}
  users.push(user);
  currentUserId++;
  res.status(201).send();
});

app.post('/login', (req, res) => {
  const user = users.filter(u => u.username === req.body.username & u.password === req.body.password)?.[0];
  if (user) {
    res.status(200).send({
      userId: user.userId,
      username: user.username,
      email: user.email,
      monthlyBudget: user.monthlyBudget
    })
  } else {
    res.status(401).json("Cannot log in")
  }
});

app.post('/logout', (req, res) => {
  res.status(200).send();
});

app.get('/users/:userId', (req, res) => {
  let currentUser = users.filter(p => p.userId !== parseInt(req.params.userId))?.[0];
  res.json(currentUser);
});

app.put('/users/:userId', (req, res) => {
  let updatedUsers = users.filter(p => p.userId !== parseInt(req.params.expenseId))
  let currentUser = users.filter(p => p.userId == parseInt(req.params.userId))?.[0];
  currentUser.monthlyBudget = req.body.monthlyBudget;
  updatedUsers.push(currentUser);
  res.status(200).send({
    userId: currentUser.userId,
    username: currentUser.username,
    email: currentUser.email,
    monthlyBudget: currentUser.monthlyBudget
  });
});

app.get('/expenses/:userId', (req, res) => {
  let userExpenses = expenses.filter(p => p.userId === parseInt(req.params.userId));
  res.json(userExpenses);
});

app.post('/expenses/new', (req, res) => {
  const expense = {...req.body, expenseId: currentExpenseId}
  expenses.push(expense);
  currentExpenseId++;
  res.status(201).send();
});

app.put('/expenses/:expenseId', (req, res) => {
  let updatedExpenses = expenses.filter(p => p.expenseId !== parseInt(req.params.expenseId))
  updatedExpenses.push(req.body);
  expenses = updatedExpenses;
  res.status(200).send();
});

app.delete('/expenses/:expenseId', (req, res) => {
  let updatedExpenses = expenses.filter(p => p.expenseId !== parseInt(req.params.expenseId))
  expenses = updatedExpenses;
  res.status(200).send();
});

app.get('/categories/:userId', (req, res) => {
  let userCategories = categories.filter(p => p.userId === parseInt(req.params.userId));
  res.json(userCategories);
});

app.post('/categories/new', (req, res) => {
  const category = {...req.body, categoryId: currentCategoryId}
  categories.push(category);
  currentCategoryId++;
  res.status(201).send();
});

app.put('/categories/:categoryId', (req, res) => {
  let updatedCategories = categories.filter(p => p.categoryId !== parseInt(req.params.categoryId))
  updatedCategories.push(req.body);
  categories = updatedCategories;
  res.status(200).send();
});

app.delete('/categories/:categoryId', (req, res) => {
  let updatedCategories = categories.filter(p => p.categoryId !== parseInt(req.params.categoryId))
  categories = updatedCategories;
  res.status(200).send();
});