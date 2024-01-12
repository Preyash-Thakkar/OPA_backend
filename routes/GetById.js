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
  listCommunityUpdatesMessage,
  getCommunityUpdatesFormName,
  activeCommunityUpdatesMessage,
  getStatusOfTemplate,
  getDepartmentGroups,
  getDepartmentTypes,
  getEmployeeRoles,
  getEmployeeNames,
} = require("../controllers/communityUpdatesMessage");

// ... (Other existing routes)

// New routes for getting related data
router.get(
  "/auth/department-groups/659f92b61e84f31e9b1d03f3",
  catchAsync(getDepartmentGroups)
);

router.get(
  "/auth/department-types/:departmentGroupId",
  catchAsync(getDepartmentTypes)
);

router.get("/auth/employee-roles/:departmentTypeId", catchAsync(getEmployeeRoles));

router.get("/auth/employee-names/:employeeRoleId", catchAsync(getEmployeeNames));

module.exports = router;
