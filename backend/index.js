const express = require("express");

const app = express();
const userRoutes = require("./routes/userRoutes");
const healthRoutes = require("./routes/healthRoutes");
const exerciseRoutes = require("./routes/exerciseRoutes");
const foodRoutes = require("./routes/foodRoutes");
const authRoutes = require("./routes/authRoutes");

app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/healths", healthRoutes);
app.use("/api/exercises", exerciseRoutes);
app.use("/api/foods", foodRoutes);
app.use("/api/auth", authRoutes);

const PORT = 9090;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
