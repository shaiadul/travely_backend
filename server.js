const cookieParser = require("cookie-parser");
const express = require("express");
const dotenv = require("dotenv").config();
const path = require("path");
const app = express();
const bodyParser = require("body-parser");
const colors = require("colors");
const userRoutes = require("./routes/userRoutes");
const messageRoutes = require("./routes/messageRoutes");
const chatRoutes = require("./routes/chatRoutes");

const cors = require("cors");
//db connection
const connectDB = require("./config/db");
connectDB();
app.use(express.json({ limit: "50mb", extended: true }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use(cors());

//to accept body data

//to use json

//middlewares

app.use(bodyParser.json({ limit: "50mb" }));

//to accept body data
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());

//calling the routes
//isuru
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

//ishara
const tourRouter = require("./routes/tourRouter");
app.use("/api/tours", tourRouter);

//yasiru
const vehicleRouter = require("./routes/vehicles");
const reservationRouter = require("./routes/vehicleReservations");

app.use("/api/vehicle", vehicleRouter);
app.use("/api/vehicle/images", express.static(path.join(__dirname, "images")));
app.use("/api/vehiclereservation", reservationRouter);

//chamith
const hotels = require("./routes/hotels");
const rooms = require("./routes/rooms");
const hotelreservation = require("./routes/hotelReservationRoute");

app.use("/api/hotels", hotels);
app.use("/api/rooms", rooms);
app.use("/api/hotelreservation", hotelreservation);
app.use("/api/hotels/images", express.static(path.join(__dirname, "images")));

//navindi
const restaurantRoute = require("./routes/restaurantRoute.js");
const restaurantTypeRoute = require("./routes/restaurantTypeRoute");
const restaurantDistrictRoute = require("./routes/restaurantDistrictRoute");
const restaurantReservationTimeRoute = require("./routes/restaurantReservationTimeRoute");
const restaurantRateRoute = require("./routes/restaurantRateRoute");
const restaurantReservationRoute = require("./routes/restaurantReservationRoute");

app.use("/api/restaurant", restaurantRoute);
app.use("/api/restaurantType", restaurantTypeRoute);
app.use("/api/restaurantDistrict", restaurantDistrictRoute);
app.use("/api/restaurantReservationTime", restaurantReservationTimeRoute);
app.use("/api/restaurantRate", restaurantRateRoute);
app.use("/api/restaurantReservation", restaurantReservationRoute);

// sehan
const trainRouter = require("./routes/train");
app.use("/api/train", trainRouter);

const seatBookingRouter = require("./routes/SeatBookings");
app.use("/api/seatBookings", seatBookingRouter);

const flightBookingRouter = require("./routes/SeatBookingFlight");
app.use("/api/flight", flightBookingRouter);

// dinidu
const refundRouter = require("./routes/RefundRoute");
app.use("/api/refund", refundRouter);

const EmployeeRouter = require("./routes/EmployeeRoute");
app.use("/api/employee", EmployeeRouter);

const SalaryRouter = require("./routes/SalaryRoute");
app.use("/api/salary", SalaryRouter);

const RecordRouter = require("./routes/FinanceHealth");
app.use("/api/record", RecordRouter);

//hansika
const ActivityRoute = require("./routes/activityRoute");
const ReservationRoute = require("./routes/reservationRoute.js");

app.use("/api/activities", ActivityRoute);
app.use("/api/reservations", ReservationRoute);

// app.get("/", (req, res) => {
//   res.send("API is Running Succesfully");
// });

app.get("/", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>API Status</title>
      <style>
        body {
          margin: 0;
          font-family: Arial, sans-serif;
          background: linear-gradient(135deg, #6a11cb, #2575fc);
          color: white;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
        }
        .container {
          text-align: center;
          max-width: 600px;
        }
        h1 {
          font-size: 3rem;
          margin-bottom: 1rem;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
        }
        p {
          font-size: 1.5rem;
          line-height: 1.8;
          margin-bottom: 1.5rem;
        }
        a {
          display: inline-block;
          background: #fff;
          color: #6a11cb;
          text-decoration: none;
          padding: 10px 20px;
          border-radius: 5px;
          font-size: 1rem;
          font-weight: bold;
          box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
          transition: all 0.3s ease;
        }
        a:hover {
          background: #f4f4f4;
          color: #2575fc;
          transform: translateY(-3px);
          box-shadow: 2px 5px 10px rgba(0, 0, 0, 0.5);
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>API is Running Successfully 🚀</h1>
        <p>Welcome to your Express API. Everything is set up and ready to go!</p>
        <a href="#">View Documentation</a>
      </div>
    </body>
    </html>
  `);
});

/*app.get('/api/chat',(req,res) => {
    res.send(chats);
});*/

app.use("/api/message", messageRoutes);
app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);

/*app.get('/api/chat/:id',(req,res) =>{
    //console.log(req.params.id);
    const singleChat =chats.find((c) =>c._id ===req.params.id);
    res.send(singleChat);
});*/

//define the port number
const port = process.env.PORT || 5000;

//start the server
const server = app.listen(port, () =>
  console.log(`Server running on port ${port} 🔥`)
);

const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    orgin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  console.log("Connected to socket.io");
});
