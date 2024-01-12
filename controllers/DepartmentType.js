const express = require("express");
const DepartmentType = require("../models/DepartmentType");
const router = express.Router();

// Add Type
const addDepartmentType = async (req, res) => {
    try {
      const { departmentGroup , name, isActive } = req.body;
      const newDepartmentType = new DepartmentType({ departmentGroup ,name, isActive });
      const savedDepartmentType = await newDepartmentType.save();
      return res.json({success : true , data : savedDepartmentType});
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // Edit Type
  const editDepartmentType = async (req, res) => {
    try {
      const  id  = req.params.id;
      const { departmentGroup,name, isActive } = req.body;
  
      const updatedDepartmentType = await DepartmentType.findByIdAndUpdate(
        id,
        {departmentGroup, name, isActive },
        { new: true }
      );
  
      if (!updatedDepartmentType) {
        return res.status(404).json({ error: 'Type not found' });
      }
  
       return res.json({success:true, data : updatedDepartmentType});
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // Delete Type
  const deleteDepartmentType = async (req, res) => {
    try {
      const  id  = req.params.id;
      const deletedDepartmentType = await DepartmentType.findByIdAndDelete(id);
  
      if (!deletedDepartmentType) {
        return res.status(404).json({ error: 'group not found' });
      }
  
       return res.json({success : true , msg:"Department Group Deleted Successfully"});
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // Get All Types
  const getAllDepartmentType = async (req, res) => {
    try {
      const departmentType = await DepartmentType.find()
        .populate('departmentGroup', 'name')
        .exec();
  
      return res.json({ data: departmentType });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // Get Specific Type
  const getSpecificDepartmentType = async (req, res) => {
    try {
      const id = req.params.id;
      const departmentType = await DepartmentType.findById(id)
        .populate('departmentGroup', 'name')
        .exec();
  
      if (!departmentType) {
        return res.status(404).json({ error: 'Type not found' });
      }
  
      return res.json({ success: true, data: departmentType });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  const getDepartmentTypesByGroupId = async (req, res) => {
    try {
      const departmentGroupId = req.params.id;
  
      const departmentTypes = await DepartmentType.find({ departmentGroup: departmentGroupId })
        .populate('departmentGroup', 'name')
        .exec();
  
      return res.json({ data: departmentTypes });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  router.get("/department-types/:departmentGroupId", async (req, res) => {
  try {
    const { departmentGroupId } = req.params;
    const departmentTypes = await DepartmentType.find({ departmentGroupId });
    res.json(departmentTypes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
});
module.exports = router;

  module.exports = {
    addDepartmentType,
    editDepartmentType,
    deleteDepartmentType,
    getAllDepartmentType,
    getSpecificDepartmentType,
    getDepartmentTypesByGroupId,
  };