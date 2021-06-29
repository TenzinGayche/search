const express = require("express");

const connectDB = require("./config/db");
const User = require("./models/User");
const path = require("path");
connectDB();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/api/users", async (req, res) => {
  user = await User.find();
  res.json(user);
});
app.get("/api/users/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

app.put("/api/users/tasks/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");

    user.alltasks.unshift(req.body);

    await user.save();

    res.json({ msg: "Task has been added" });
  } catch (err) {
    console.error(err.message);

    res.status(500).send("Server Error");
  }
});
app.get("/api/users/tasks/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");

    res.json(user.alltasks);
  } catch (err) {
    console.error(err.message);

    res.status(404).send("No tasks");
  }
});
app.put("/api/users/:id/task/:tid", async (req, res) => {
  try {
    const users = await User.findOne({ _id: req.params.id }).select(
      "-password"
    );

    const task = await users.alltasks.find(
      (alltasks) => alltasks.id === req.params.tid
    );

    task.iscompleted = !task.iscompleted;
    console.log(task);

    await users.save();
    res.json(users);
  } catch (err) {
    console.error(err.message);
  }
});
app.delete("/api/users/:id/task/:tid", async (req, res) => {
  try {
    const users = await User.findOne({ _id: req.params.id }).select(
      "-password"
    );

    const task = await users.alltasks.filter(
      (alltasks) => alltasks.id !== req.params.tid
    );
    users.alltasks = task;

    await users.save();
    res.json(users);
  } catch (err) {
    console.error(err.message);
  }
});
app.post("/api/users", async (req, res) => {
  const { user, password, alltasks } = req.body;
  try {
    const users = new User({
      user,
      password,
      alltasks,
    });

    await users.save();
    res.json(users);
  } catch (err) {
    console.error(err.message);
  }
});
app.post("/api/users/auth", async (req, res) => {
  try {
    user = await User.findOne({ user: req.body.user });

    if (user.password === req.body.password) {
      users = await User.findOne({ user: req.body.user }).select("-password");
      res.json(users);
    }
    res.status(400).json({ errors: [{ msg: "Enter the correct password" }] });
  } catch (error) {
    console.error(error.message);
    console.error(err.message);
    res.status(500).send("Server error");
  }
});
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Starting in port ${PORT}`));
