const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");

const {
  createCommunityUpdatesMessage,
  getCommunityUpdatesMessage,
  updateCommunityUpdatesMessage,
  deleteCommunityUpdatesMessage,
  listCommunityUpdatesMessages,
  // Add any other controllers as needed
} = require("../controllers/communityUpdatesMessage"); // Import your CommunityUpdatesMessage controllers

// CommunityUpdatesMessage Routes
router.post(
  "/auth/list-community-updates-messages",
  catchAsync(listCommunityUpdatesMessages)
);

router.post(
  "/auth/community-updates-message-create",
  catchAsync(createCommunityUpdatesMessage)
);

router.get(
  "/auth/community-updates-message/:_id",
  catchAsync(getCommunityUpdatesMessage)
);

router.delete(
  "/auth/community-updates-message-delete/:_id",
  catchAsync(deleteCommunityUpdatesMessage)
);

router.put(
  "/auth/community-updates-message-update/:_id",
  catchAsync(updateCommunityUpdatesMessage)
);

// Add any other routes as needed

// Multer Configuration for Image Upload
const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/community_updates_messages"); // Change the destination folder
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    cb(null, `${uuidv4()}-${Date.now()}.${ext}`);
  },
});

const upload = multer({ storage: multerStorage });

router.post(
  "/auth/community-updates-message/upload",
  upload.single("uploadImg"), // Change the field name accordingly
  async (req, res) => {
    console.log(req.file.filename);
    res.json({ url: req.file.filename });
  }
);

module.exports = router;
