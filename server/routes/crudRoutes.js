const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");

const {
  createItem,
  getItems,
  updateItem,
  deleteItem,
} = require("../controllers/crudController");

router.post("/item", auth, createItem);
router.get("/items", auth, getItems);
router.put("/item/:id", auth, updateItem);
router.delete("/item/:id", auth, deleteItem);

module.exports = router;
