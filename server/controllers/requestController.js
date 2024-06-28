const asyncHandler = require("express-async-handler")
const Request = require("../models/requestModel")
const Borrowing = require("../models/borrowingModel")

const makeRequest = asyncHandler(async (req, res) => {
    const {
        userId,
        bookId,
        requestType
    } = req.body

    if (!userId || !bookId || !requestType) {
        res.status(400)
        throw new Error("missing credentials")
    }

    const request = await Request.create({
        userId,
        bookId,
        requestType
    })

    res.status(200).json(request)
})

const getRequest = asyncHandler(async (req, res) => {
    const request = await Request.findById(req.params.id)

    if (!request) {
        res.status(400)
        throw new Error("request not found")
    }

    res.status(200).json(request)
})

const getAllRequests = asyncHandler(async (req, res) => {
    const requests = Request.find()

    if (!requests) {
        res.status(400)
        throw new Error("no requests found")
    }

    res.status(200).json(requests)
})

const approveRequest = asyncHandler(async (req, res) => {
    const request = await Request.findById(req.params.id)

    const {
        userId,
        bookId,
        borrowingId
    } = request

    const {
        issueDate,
        deadline,
        newDeadline
    } = req.body

    if (!request) {
        res.status(400)
        throw new Error("request not found")
    }

    if (request.requestType === "Borrow") {
        const borrowing = await Borrowing.create({
            userId,
            bookId,
            issueDate,
            deadline
        })

        res.status(200).json(borrowing)
    } else if (request.requestType === "Renew") {
        const updatedBorrowing = Borrowing.findByIdAndUpdate(borrowingId, {
            deadline: newDeadline,
            renewed: true
        }, {
            new: true
        })

        res.status(200).json(updatedBorrowing)
    }
})

const denyRequest = asyncHandler(async (req, res) => {
    const request = await Request.findById(req.params.id)

    if (!request) {
        res.status(400)
        throw new Error("request not found")
    }

    await request.deleteOne()
    
    res.status(200).json(req.params.id)
})

module.exports = {
    makeRequest,
    getRequest,
    getAllRequests,
    approveRequest,
    denyRequest
}