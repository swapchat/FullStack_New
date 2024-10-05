const Record = require("../models/Record");

exports.createItem = async (req, res) => {
  // Logic for creating an item
  const { title, description } = req.body;
  try {
    const newRecord = new Record({
      title,
      description,
      user: req.user.id,
    });
    const record = await newRecord.save();
    res.status(201).json(record);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};

exports.getItems = async (req, res) => {
  // Logic for pagination, sorting, and searching
  const { page = 1, limit = 10, sort = "date", search = "" } = req.query;
  try {
    const query = {
      user: req.user.id, // Ensure we only fetch records for the authenticated user
      title: { $regex: search, $options: "i" }, // Search by title (case insensitive)
    };

    const records = await Record.find(query)
      .sort(sort) // Sort records based on the query
      .skip((page - 1) * limit) // Pagination
      .limit(parseInt(limit)); // Limit the number of records returned

    const totalRecords = await Record.countDocuments(query); // Count total records for pagination
    res.json({
      totalRecords,
      totalPages: Math.ceil(totalRecords / limit), // Calculate total pages
      currentPage: parseInt(page),
      records,
    }); // Respond with records and pagination info
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error"); // Handle any server errors
  }
};

exports.updateItem = async (req, res) => {
  // Logic for updating an item
  const { title, description } = req.body;

  const updatedRecord = {};
  if (title) updatedRecord.title = title;
  if (description) updatedRecord.description = description;

  try {
    let record = await Record.findById(req.params.id);
    if (!record) {
      return res.status(404).json({ msg: "Record not found" }); // Handle record not found
    }
    // Ensure the user owns the record
    if (record.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" }); // Handle unauthorized access
    }
    record = await Record.findByIdAndUpdate(
      req.params.id,
      { $set: updatedRecord },
      { new: true } // Return the updated record
    );
    res.json(record); // Respond with the updated record
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error"); // Handle any server errors
  }
};

exports.deleteItem = async (req, res) => {
  // Logic for deleting an item
  try {
    let record = await Record.findById(req.params.id);

    if (!record) {
      return res.status(404).json({ msg: "Record not found" }); // Handle record not found
    }
    // Ensure the user owns the record
    if (record.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" }); // Handle unauthorized access
    }

    await Record.findByIdAndDelete(req.params.id); // Delete the record
    res.json({ msg: "Record removed" }); // Respond with a success message
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error"); // Handle any server errors
  }
};
