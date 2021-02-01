//getEvent, createEvent, deleteEvent, getallEvent, updateEvent
const pool = require("../../infra/db");

class EventController {


   //get a event by id function
   getEvent() {

      return async(req,res) =>{
         try {
            const {id} = req.params;
            const todo = await pool.query("SELECT * FROM event WHERE event_id = $1", [id]);
            res.json(todo.rows[0]);
         } catch (err) {
            console.log(err.message);
         }
      }
   }

   //create a new event function
   createEvent() {

      return async(req,res) => {
         try {
            //adicionar titulo, preço, local, 
            const { description } = req.body;
            const newEvent = await pool.query("INSERT INTO event (description) VALUES($1) RETURNING *", [description]);
            res.json(newEvent.rows[0]);
      
         } catch (err) {
            console.log(err.message);
         }
      }
   }

   updateEvent() {

      return async (req,res) =>{
         try {
           const {id} = req.params;
           const {description} = req.body; 
           const updateEvent = await pool.query("UPDATE event SET description = $1 WHERE event_id = $2",[description, id]);
      
           res.json("Evento foi alterado");
         } catch (err) {
            console.error(err.message);
         }
      }
   }

   //delete event by id function
   deleteEvent() {

      return async (req,res) =>{
         try {
            const {id} = req.params;
            const deleteEvent = await pool.query("DELETE FROM event WHERE event_id = $1", [id]);
            res.json("Evento Exluído");
         } catch (err) {
            console.error(err.message);
         }
      }
   }

   //get all events
   getAllEvent() {

      return async(req,res) =>{
         try {
            const allEvents = await pool.query("SELECT * FROM event");
            res.json(allEvents.rows);
         } catch (err) {
            console.log(err.message);
         }
      }
   }

}

module.exports = EventController;