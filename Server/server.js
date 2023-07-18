const express = require("express");
const app = express();
const jwt = require('jsonwebtoken');
const cors = require("cors");

// router database
const pool = require("./database");

// middleware
app.use(express.json());
app.use(cors("http://localhost:3000"));

// create todo
app.post("/todo", async (req, res) => {
  try {
    const { description } = req.body;
    const newtodo = await pool.query(
      "INSERT INTO todo (description) values ($1) RETURNING *",
      [description]
    );
    res.json(newtodo.rows[0]);
  } catch (error) {
    console.log(error, "something want wrong");
  }
});

// get all todo
app.get("/getAllTodo", async (req, res) => {
  try {
    const allTodo = await pool.query("select * from todo");
    res.json(allTodo.rows);
  } catch (error) {
    console.log(error, "something want wrong");
  }
});

// get todo
app.get("/getTodo/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await pool.query("select * from todo where todo_id = $1", [
      id,
    ]);
    res.json(todo.rows[0]);
  } catch (error) {
    console.log(error, "something want wrong");
  }
});

// update todo
app.put("/updateTodo/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const updateTodo = await pool.query(
      "UPDATE todo SET description = $1 WHERE todo_id = $2",
      [description, id]
    );

    res.json("Todo was updated!");
  } catch (err) {
    console.error(err.message);
  }
});

// delete todo
app.delete("/deleteTodo/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletetodo = await pool.query('DELETE FROM todo where todo_id = $1', [id]);
    res.json(`task's has been deleted`);
  } catch (error) {
    console.log(error, "something want wrong");
  }
});

// search description
app.get("/searchTask/:description", async (req, res) => {
  try {
     const {description} = req.params;
     const result = await pool.query('SELECT * FROM todo WHERE description = $1',
      [description]
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

// register user
app.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;
 // check if user already registered or not
    const existePerson = await pool.query('SELECT * FROM todo WHERE email = $1', [email]);
    if (existePerson.rows.length > 0) {
      res.json({ msg: 'user already registered' });
    }
 // create user
    const result = await pool.query('insert into todo (email, password) values ($1, $2)',
     [email, password]
   );
   res.status(201).json({
     success: true,
     message: 'user created',
   })
 } catch (error) {
   res.status(500).json({ error: "Something went wrong" });
 }
});

// login
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await pool.query('SELECT * FROM todo WHERE email = $1 AND password = $2', 
    [email, password]);
    // test if invalid mail or password
    if (result.rows.length === 0) {
      res.status(401).json({ error: "Invalid email or password" });
    } else {
      // Authentication successful, generate JWT token
      const user = result.rows[0];
      const payload = {
        userId: user.id,
        email: user.email
      };
      const token = jwt.sign(payload, 'your_secret_key', { expiresIn: '30d' });
      res.status(200).json({ success: true, token: token });
    }
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
});


// running server
PORT = 5000;
app.listen(PORT, (err) => {
  err
    ? console.log(err, "something want wrong, server not running")
    : console.log(`server is running on localhost : ${PORT}`);
});
