import express from "express";

import { signin, signup } from "../controllers/user.js";

const router = express.Router();

router.post("/signin", signin); // post means sends data to backend
router.post("/signup", signup);

export default router;
