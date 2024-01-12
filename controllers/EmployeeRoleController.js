const express = require("express");
const router = express.Router();
const EmployessRoles = require("../models/EmployeesRole");

// Add Type
const addEmployeeRole = async (req, res) => {
    try {
      const { departmentGroup ,departmentType, EmployeeRole, isActive } = req.body;
      const newEmployeeRole = new EmployessRoles({ departmentGroup , departmentType ,EmployeeRole, isActive });
      const savedEmployeeRole = await newEmployeeRole.save();
      return res.json({success : true , data : savedEmployeeRole});
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // Edit Type
  const editEmployeeRole = async (req, res) => {
    try {
      const  id  = req.params.id;
      const { departmentGroup ,departmentType, EmployeeRole, isActive } = req.body;
  
      const updatedEmployeeRole = await EmployessRoles.findByIdAndUpdate(
        id,
        {departmentGroup, departmentType , EmployeeRole, isActive },
        { new: true }
      );
  
      if (!updatedEmployeeRole) {
        return res.status(404).json({ error: 'Type not found' });
      }
  
       return res.json({success:true, data : updatedEmployeeRole});
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // Delete Type
  const deleteEmployeeRole = async (req, res) => {
    try {
      const  id  = req.params.id;
      const deletedEmployeeRole = await EmployessRoles.findByIdAndDelete(id);
  
      if (!deletedEmployeeRole) {
        return res.status(404).json({ error: 'employee role not found' });
      }
  
       return res.json({success : true , msg:"Employee Role Deleted Successfully"});
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // Get All Types
  const getAllEmployeeRoles = async (req, res) => {
    try {
      const employeeRoles = await EmployessRoles.find()
        .populate([
          { path: 'departmentGroup', select: 'name' },
          { path: 'departmentType', select: 'name' },
        ])
        .exec();
  
      return res.json({ data: employeeRoles });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // Get Specific Type
  const getSpecificEmployeeRole = async (req, res) => {
    try {
      const  id  = req.params.id;
      const employeeRole = await EmployessRoles.findById(id).populate([
        { path: 'departmentGroup', select: 'name' },
        { path: 'departmentType', select: 'name' },
      ]);
  
      if (!employeeRole) {
        return res.status(404).json({ error: 'Emp Role not found' });
      }
  
     return res.json({success : true , data:employeeRole});
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  const getEmployeeRolesByGroupAndType = async (req, res) => {
    try {
      const departmentGroupId = req.params.departmentGroupId;
      const departmentTypeId = req.params.departmentTypeId;
  
      const employeeRoles = await EmployessRoles.find({
        departmentGroup: departmentGroupId,
        departmentType: departmentTypeId,
      })
        .populate([
          { path: 'departmentGroup', select: 'name' },
          { path: 'departmentType', select: 'name' },
        ])
        .exec();
  
      return res.json({ data: employeeRoles });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  //get Employee Roles with their respective Department ID
  router.get("/employee-roles/:departmentTypeId", async (req, res) => {
    try {
      const { departmentTypeId } = req.params;
      const employeeRoles = await EmployeesRole.find({ departmentTypeId });
      res.json(employeeRoles);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "An error occurred" });
    }
  });
   module.exports = router;

   module.exports = {
    addEmployeeRole,
    editEmployeeRole,
    deleteEmployeeRole,
    getAllEmployeeRoles,
    getSpecificEmployeeRole,
    getEmployeeRolesByGroupAndType,
  };