const express = require("express");
const { open } = require("sqlite");
const path = require("path");
const sqlite3 = require("sqlite3");

const databasePath = path.join(__dirname, "database.db");

const app = express();
app.use(express.json());

let db = null;

const initializeDbAndServer = async () => {
  try {
    db = await open({
      filename: databasePath,
      driver: sqlite3.Database,
    });
    app.listen(3000, () =>
      console.log("Server running at http://localhost:3000")
    );
  } catch (error) {
    console.log(`db error ${error.message}`);
    process.exit(1);
  }
};

initializeDbAndServer();


app.post("/transactions",  async (request, response) => {
  const { id, type, category, amount, date, description} = request.body;
  const addTransaction = `
  INSERT INTO transactions(id, type, category, amount, date, description)
  VALUES('${id}', '${type}', '${category}', '${amount}', '${date}', '${description}');`;
  addedTransaction = await db.run(addTransaction);
  response.send("Transaction Successfully Added");
});


app.get("/transactions",  async (request, response) => {
  const getTransactions = `
    SELECT
    *
    FROM
    transactions`;
  const returnedTransactions = await db.all(getTransactions);
  response.send(returnedTransactions);
});

app.get("/transactions/:id",  async (request, response) => {
  const {id} = request.params
  const getTransactions = `
    SELECT
    *
    FROM
    transactions where id = ${id}`;
  const returnedTransactions = await db.all(getTransactions);
  response.send(returnedTransactions);
});


app.put("/transactions/:id",  async (request, response) => {
  const { id } = request.params;
  const { type, category, amount, date, description } = request.body;
  const updateTransaction = `
  UPDATE transactions
  SET
  type = '${type}',
  category = '${category}',
  amount = '${amount}',
  date = '${date}',
  description = '${description}'
  WHERE 
  id = '${id}';`;
  const updatedTransaction = await db.run(updateTransaction);
  response.send("Transaction Details Updated");
});


app.delete("/transactions/:id", async (request, response) => {
    const {id } = request.params;
    const deleteTransaction = `
    DELETE FROM transactions
    WHERE id = '${id}';`;
    const deletedTransaction = await db.run(deleteTransaction);
    response.send("Transaction Removed");
  }
);


