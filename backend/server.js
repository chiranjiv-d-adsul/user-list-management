const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors'); // Import the cors middleware
// const listRoutes = require('./routes/listRoutes');
// const userRoutes = require('./routes/userRoutes');
// const emailRoutes = require('./routes/emailRoutes');
const { errorHandler } = require('./middlewares/errorHandler');
// const v1route = require('./routes/v1/index');
const apiV1Routes = require("./routes/index");

dotenv.config();

const app = express();

const corsConfig = {
  origin: "https://thunderous-pavlova-31149b.netlify.app",
  // origin: "http://localhost:5173",

  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
};
app.use(cors(corsConfig));
app.options("", cors(corsConfig));
// Use the cors middleware
// Use the cors middleware with logging
// app.use((req, res, next) => {
//   console.log('Incoming request:', req.method, req.url);
//   res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173'); // or '*', to allow from any origin
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//   console.log('CORS headers set.');
//   next();
// });


app.use(bodyParser.json());

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected')).catch(err => console.error(err));

// app.use('/lists', listRoutes);
// app.use('/users', userRoutes);
// app.use('/emails', emailRoutes);

// app.use('/chiru',v1route);
app.use("/chiru", apiV1Routes);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
