// env variable
require("dotenv").config();

import express from "express";
import cors from "cors";
import helmet from "helmet";
import passport from "passport";

// config
import googleAuthConfig from "./config/google.config"

// API
import Auth from "./API/Auth/index";
import Restaurant from "./API/Restaurant/index"
import Food from "./API/Food/index"
import Menu from "./API/Menu/index"

// Database connection
import ConnectDB from "./database/connection";

// Initalize our app
const shimato = express();

shimato.use(express.json());
shimato.use(express.urlencoded({extended: false}));
shimato.use(helmet());
shimato.use(cors());
shimato.use(passport.initialize());
shimato.use(passport.session());

// passport configuration
googleAuthConfig(passport);

// For application routes
// localhost:5000/auth/signup
shimato.use("/auth", Auth);
shimato.use("/restaurant", Restaurant)
shimato.use("/food", Food)
shimato.use("/menu", Menu)

shimato.get("/", (req, res) => {
    res.json({message: "Server is running!!!"});
});

shimato.listen(4000, () => {
    ConnectDB().then(() => {
        console.log("Server is running!!!");
    }).catch(() => console.log("DB connection failed"));
});