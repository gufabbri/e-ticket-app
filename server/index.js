const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

//middleware
app.use(cors());
app.use(express.json()); //req.body

//ROUTES//

//create a event
app.post("/createEvent", async(req,res) => {
   try {

      const { description } = req.body;
      const newEvent = await pool.query("INSERT INTO event (description) VALUES($1) RETURNING *", [description]);
      res.json(newEvent.rows[0]);

   } catch (err) {
      console.log(err.message);
   }
})

//get all events
app.get("/getAllEvents", async(req,res) =>{
   try {
      const allEvents = await pool.query("SELECT * FROM event");
      res.json(allEvents.rows);
   } catch (err) {
      console.log(err.message);
   }
})

//get a event
app.get("/getEvent/:id", async(req,res) =>{
   try {
      const {id} = req.params;
      const todo = await pool.query("SELECT * FROM event WHERE event_id = $1", [id]);
      res.json(todo.rows[0]);
   } catch (err) {
      console.log(err.message);
   }
})

//update a event
app.put("/events/:id", async (req,res) =>{
   try {
     const {id} = req.params;
     const {description} = req.body; 
     const updateEvent = await pool.query("UPDATE event SET description = $1 WHERE event_id = $2",[description, id]);

     res.json("Evento foi alterado");
   } catch (err) {
      console.error(err.message);
   }
})

//delete a event
app.delete("/event/:id", async (req,res) =>{
   try {
      const {id} = req.params;
      const deleteEvent = await pool.query("DELETE FROM event WHERE event_id = $1", [id]);
      res.json("Evento Exluído");
   } catch (err) {
      console.error(err.message);
   }
})

app.listen(5000, () => {
   console.log("server has started on port 5000");
});