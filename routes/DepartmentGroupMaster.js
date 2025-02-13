const express = require("express");
const { addDepartmentGroup, getAllDepartmentGroup, getSpecificDepartmentGroup, editDepartmentGroup, deleteDepartmentGroup } = require("../controllers/DepartmentGroupMaster");

const router = express.Router();


// Routes
router.post("/adddepartmentgroup" , addDepartmentGroup);
router.get("/getdepartments" , getAllDepartmentGroup);
router.post("/getdepartmentbyid/:id",getSpecificDepartmentGroup);
router.post("/editdepartmentgroup/:id",editDepartmentGroup);
router.post("/deletedepartmentgroup/:id",deleteDepartmentGroup);


module.exports = router;