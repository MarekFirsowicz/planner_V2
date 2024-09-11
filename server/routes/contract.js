import express from "express"
import { createContract, deleteContract, getAllContracts, getContract, getContractByName, updateContract, updateContractRemove } from "../controllers/contractController.js"
const router = express.Router()

router.get("/", getAllContracts)
router.get("/:id", getContract)
router.get("/name", getContractByName)
router.post("/", createContract)
router.put("/:id", updateContract)
router.put("/remove/:id", updateContractRemove)
router.delete("/:id", deleteContract)

export default router