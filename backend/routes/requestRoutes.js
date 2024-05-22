const express = require("express")
const router = express.Router()

//controllers
const {
    makeRequest,
    getRequest,
    getAllRequests,
    approveRequest,
    denyRequest
} = require("../controllers/requestController")

//route protection
const {
   protect,
   adminOnly,
   memberOnly 
} = require("../middleware/authMiddleware")

router.post("/",protect, memberOnly, makeRequest)
router.get("/",protect, adminOnly, getAllRequests)
router.get("/:id",protect, adminOnly, getRequest)
router.put("/:id",protect, adminOnly, approveRequest)
router.delete("/:id",protect, adminOnly, denyRequest)

module.exports = router