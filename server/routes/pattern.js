import express from "express"
import { createPattern, deletePattern, getAllPatterns } from "../controllers/patternController.js"
const router = express.Router()


router.get("/", getAllPatterns)
router.post("/", createPattern)
router.delete("/:id", deletePattern)

export default router