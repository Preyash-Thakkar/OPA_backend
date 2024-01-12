const express = require("express");
const router = express.Router();
const DepartmentGroup = require("../models/DepartmentGroupMaster");

// Add Location
const addDepartmentGroup = async (req, res) => {
    try {
      const { name, isActive } = req.body;
      const newDepartmentGroup = new DepartmentGroup({ name, isActive });
      const savedDepartmentGroup = await newDepartmentGroup.save();
      return res.json({success : true , data : savedDepartmentGroup});
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // Edit Location
  const editDepartmentGroup = async (req, res) => {
    try {
      const  id  = req.params.id;
      const { name, isActive } = req.body;
  
      const updatedDepartmentGroup = await DepartmentGroup.findByIdAndUpdate(
        id,
        { name, isActive },
        { new: true }
      );
  
      if (!updatedDepartmentGroup) {
        return res.status(404).json({ error: 'group not found' });
      }
  
       return res.json({success:true, data : updatedDepartmentGroup});
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // Delete Location
  const deleteDepartmentGroup = async (req, res) => {
    try {
      const  id  = req.params.id;
      const deletedDepartmentGroup = await DepartmentGroup.findByIdAndDelete(id);
  
      if (!deletedDepartmentGroup) {
        return res.status(404).json({ error: 'group not found' });
      }
  
       return res.json({success : true , msg:"Department Group Deleted Successfully"});
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // Get All Locations
  const getAllDepartmentGroup = async (req, res) => {
    try {
      const departmentGroup = await DepartmentGroup.find().exec();
       return res.json({data:departmentGroup});
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // Get Specific Location
  const getSpecificDepartmentGroup = async (req, res) => {
    try {
      const  id  = req.params.id;
      const departmentGroup = await DepartmentGroup.findById(id);
  
      if (!departmentGroup) {
        return res.status(404).json({ error: 'group not found' });
      }
  
     return res.json({success : true , data:departmentGroup});
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

 //get Departmentgrps by their respective location id

router.get("/department-groups/:locationId", async (req, res) => {
  try {
    const { locationId } = req.params;
    const departmentGroups = await DepartmentGroup.find({ locationId });
    res.json(departmentGroups);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
});

module.exports = router;

  
  module.exports = {
    addDepartmentGroup,
    editDepartmentGroup,
    deleteDepartmentGroup,
    getAllDepartmentGroup,
    getSpecificDepartmentGroup,
  };