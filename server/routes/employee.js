import express from "express"
const router = express.Router()
import { confirmManyEvents, createEvent, deleteComments, getAllEmployees, getEmployee, getReport, saveEmployee, updataEmployee, updateEvent } from "../controllers/employeeController.js"


router.get("/", getAllEmployees)
router.get("/report/events", getReport)

router.get("/:id", getEmployee)
router.put("/:id", updataEmployee)
router.post("/", saveEmployee)
router.put("/:id/createEvent", createEvent)
router.put("/:id/updateEvent", updateEvent)
router.put("/:id/confirmEvents/",confirmManyEvents)
router.put("/:id/deleteComment/",deleteComments)



export default router