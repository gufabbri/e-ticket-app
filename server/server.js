const customExpress = require("./config/custom-express")

const app = customExpress();

app.listen(5000, () => {
   console.log("server has started on port 5000");
});