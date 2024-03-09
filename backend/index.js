const express = require("express");

const app = express();
const userRoutes = require("./routes/userRoutes");

app.use(express.json());
app.use("/api/users", userRoutes);

const PORT = 9090;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
