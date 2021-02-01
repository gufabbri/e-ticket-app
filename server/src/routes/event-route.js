const express = require("express");
const EventController = require ("../controllers/event-controller");

const eventController = new EventController();
const router = express.Router();

modules.exports

router.get("/getEvent/:id", eventController.getEvent());
router.get("/getAllEvents", eventController.getAllEvent());
router.post("/createEvent", eventController.createEvent());
router.put("/event/:id", eventController.updateEvent());
router.delete("/event/:id", eventController.deleteEvent());

module.exports = EventRoutes;