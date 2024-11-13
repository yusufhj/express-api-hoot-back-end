const express = require('express');
const verifyToken = require('../middleware/verify-token.js');
const Hoot = require('../models/hoot.js');
const router = express.Router();


// ========== Public Routes ===========


// ========= Protected Routes =========
router.use(verifyToken);

// POST /hoots
router.post('/', async (req, res) => {
    try {
        req.body.author = req.user._id;
        const hoot = await Hoot.create(req.body);
        hoot._doc.author = req.user;
        res.status(201).json(hoot);
    } catch (error) {
        res.status(500).json({ error });
    }
});

// GET /hoots
router.get('/', async (req, res) => {
    try {
        const hoots = await Hoot.find({})
            .populate('author')
            .sort({ createdAt: 'desc'});
        res.status(200).json(hoots);
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;