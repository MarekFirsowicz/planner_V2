import express from "express"
const router = express.Router()
import { createCalendar, deleteCalendar, getAllCalendars, getCalendar, updateCalendar } from "../controllers/calendarController.js"


router.get("/", getAllCalendars)
router.post("/", createCalendar)
router.get("/:id", getCalendar)
router.put('/:id',updateCalendar)
router.delete('/:id', deleteCalendar)

export default router