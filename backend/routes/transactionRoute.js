const express = require("express");
const router = express.Router();
const transactionsController = require("../controllers/transactionsController");

// Fetch data from Database
router.get("/transactions", transactionsController.fetchAllTransactions);

router.get("/statistics", transactionsController.fetchStatistics);

router.get("/bar-chart", transactionsController.fetchBarChart);

router.get("/pie-chart", transactionsController.fetchPieChart);

router.get("/combined", transactionsController.combinedAPI);

module.exports = router;
