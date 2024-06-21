const axios = require("axios");
const Transaction = require("../models/Transaction.js");

exports.fetchAllTransactions = async (req, res) => {
  try {
    const { search = "", page = 1, limit = 10, month } = req.query;

    // Building the query object
    const query = {
      $or: [
        { title: new RegExp(search, "i") },
        { description: new RegExp(search, "i") },
        { price: parseFloat(search) || -1 }, // Adding -1 to make sure if search is not a number, it won't filter by price
      ],
    };

    if (month) {
      query.$expr = { $eq: [{ $month: "$dateOfSale" }, month] };
    }

    // Fetch products with pagination
    const products = await Transaction.find(query)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    // Count total documents for pagination
    const total = await Transaction.countDocuments(query);

    res.json({
      status: 1,
      message: "Successfully fetched data",
      data: products,
      total,
      page: parseInt(page),
      perPage: parseInt(limit),
      totalPages: Math.ceil(total / limit),
    });
  } catch (err) {
    res.json({
      status: 0,
      message: "Failed to fetch Transactions",
      error: err,
    });
  }
};

exports.fetchStatistics = async (req, res) => {
  try {
    const { month } = req.query;

    if (!month) {
      return res.json({ status: 0, message: "Month is required" });
    }

    const monthInt = parseInt(month);

    // Total sale amount of selected month
    const totalSaleAmount = await Transaction.aggregate([
      {
        $match: {
          sold: true,
        },
      },
      {
        $project: {
          month: { $month: "$dateOfSale" },
          price: 1,
        },
      },
      {
        $match: {
          month: monthInt,
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$price" },
        },
      },
    ]);

    // Total number of sold items of selected month
    const totalSoldItems = await Transaction.aggregate([
      {
        $match: {
          sold: true,
        },
      },
      {
        $project: {
          month: { $month: "$dateOfSale" },
        },
      },
      {
        $match: {
          month: monthInt,
        },
      },
      {
        $count: "totalSoldItems",
      },
    ]);

    // Total number of not sold items of selected month
    const totalNotSoldItems = await Transaction.aggregate([
      {
        $match: {
          sold: false,
        },
      },
      {
        $project: {
          month: { $month: "$dateOfSale" },
        },
      },
      {
        $match: {
          month: monthInt,
        },
      },
      {
        $count: "totalNotSoldItems",
      },
    ]);

    res.json({
      status: 1,
      message: "Successfully fetched statistics data",
      data: {
        totalSaleAmount: totalSaleAmount[0] ? totalSaleAmount[0].total : 0,
        totalSoldItems: totalSoldItems[0]
          ? totalSoldItems[0].totalSoldItems
          : 0,
        totalNotSoldItems: totalNotSoldItems[0]
          ? totalNotSoldItems[0].totalNotSoldItems
          : 0,
      },
    });
  } catch (err) {
    res.json({
      status: 0,
      message: "Failed to fetch data for Statistics",
    });
  }
};

exports.fetchBarChart = async (req, res) => {
  try {
    const { month } = req.query;

    if (!month) {
      return res.json({ status: 0, message: "Month is required" });
    }

    const monthInt = parseInt(month);

    // Aggregate data to get the count of items in each price range
    const priceRanges = [
      { range: "0-100", min: 0, max: 100 },
      { range: "101-200", min: 101, max: 200 },
      { range: "201-300", min: 201, max: 300 },
      { range: "301-400", min: 301, max: 400 },
      { range: "401-500", min: 401, max: 500 },
      { range: "501-600", min: 501, max: 600 },
      { range: "601-700", min: 601, max: 700 },
      { range: "701-800", min: 701, max: 800 },
      { range: "801-900", min: 801, max: 900 },
      { range: "901-above", min: 901, max: Infinity },
    ];

    const results = await Transaction.aggregate([
      {
        $project: {
          price: 1,
          month: { $month: "$dateOfSale" },
        },
      },
      {
        $match: {
          month: monthInt,
        },
      },
      {
        $bucket: {
          groupBy: "$price",
          boundaries: [
            0,
            101,
            201,
            301,
            401,
            501,
            601,
            701,
            801,
            901,
            Infinity,
          ],
          default: "901-above",
          output: {
            count: { $sum: 1 },
          },
        },
      },
    ]);

    const data = priceRanges.map((range) => ({
      range: range.range,
      count: results.find((result) => result._id === range.min)?.count || 0,
    }));

    res.json({
      status: 1,
      message: "Successfully fetched data for Bar chart",
      data,
    });
  } catch (err) {
    res.json({
      status: 0,
      message: "Failed to fetch data for Bar chart",
      error: err,
    });
  }
};

exports.fetchPieChart = async (req, res) => {
  try {
    const { month } = req.query;

    if (!month) {
      return res.json({ status: 0, message: "Month is required" });
    }

    const monthInt = parseInt(month);

    const results = await Transaction.aggregate([
      {
        $project: {
          category: 1,
          month: { $month: "$dateOfSale" },
        },
      },
      {
        $match: {
          month: monthInt,
        },
      },
      {
        $group: {
          _id: "$category",
          count: { $sum: 1 },
        },
      },
    ]);

    const data = results.map((result) => ({
      category: result._id,
      count: result.count,
    }));

    res.json({
      status: 1,
      message: "Successfully fetched data for Pie chart",
      data,
    });
  } catch (error) {
    res.json({
      status: 0,
      message: "Failed to fetch data for Bar chart",
      error: err,
    });
  }
};

exports.combinedAPI = async (req, res) => {
  try {
    const { month } = req.query;

    if (!month) {
      return res.json({ status: 0, message: "Month is required" });
    }

    const apiBaseUrl = "http://localhost:5000/api";

    // Fetch data from all three APIs
    const [statisticsResponse, barChartResponse, pieChartResponse] =
      await Promise.all([
        axios.get(`${apiBaseUrl}/statistics`, { params: { month } }),
        axios.get(`${apiBaseUrl}/bar-chart`, { params: { month } }),
        axios.get(`${apiBaseUrl}/pie-chart`, { params: { month } }),
      ]);

    const combinedData = {
      statistics: statisticsResponse.data,
      barChart: barChartResponse.data,
      pieChart: pieChartResponse.data,
    };

    res.json({
      status: 1,
      message: "Successfully fetched data",
      combinedData,
    });
  } catch (error) {
    res.json({
      status: 0,
      message: "Failed to fetch data for Bar chart",
      error: err,
    });
  }
};
