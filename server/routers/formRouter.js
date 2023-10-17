import express from "express";
import formController from "../controllers/formController.js";

//create a router for forms
const formRouter = express.Router();

//create an endpoint to create a form
formRouter.post('/', formController.createForm);

export default formRouter;