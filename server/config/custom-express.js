const express = require("express");
const consign = require("consign");
const cors = require("cors");

const eventRoutes = require("./routes/event-routes");

module.exports = () => {
   
   const app = express();
   // consign()
   //    .include('controllers')
   //    .into(app);
   
   app.use(cors());
   app.use(express.json());
   
   app.use(eventRoutes);

   return app;
}
