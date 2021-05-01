const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const items = require("./routes/api/items");
const app = express();
//bodyparser middleware
app.use(bodyParser.json());
//DB config
const db = require("./config/key").mongoURI;
//connect to MOngo
mongoose
  .connect(db, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  })

  .then(() => console.log("MongoD connected"))
  .catch((err) => console.log(err));
app.use('/api/items', items);
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));
