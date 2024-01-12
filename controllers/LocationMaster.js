const express = require("express");
const router = express.Router();
const Location = require("../models/LocationMaster");

// Add Location
const addLocation = async (req, res) => {
    try {
      const { name, isActive } = req.body;
      const newLocation = new Location({ name, isActive });
      const savedLocation = await newLocation.save();
      res.json({success : true , data : savedLocation});
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // Edit Location
  const editLocation = async (req, res) => {
    try {
      const  id  = req.params.id;
      const { name, isActive } = req.body;
  
      const updatedLocation = await Location.findByIdAndUpdate(
        id,
        { name, isActive },
        { new: true }
      );
  
      if (!updatedLocation) {
        return res.status(404).json({ error: 'Location not found' });
      }
  
      res.json({success:true, data : updatedLocation});
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // Delete Location
  const deleteLocation = async (req, res) => {
    try {
      const  id  = req.params.id;
      const deletedLocation = await Location.findByIdAndDelete(id);
  
      if (!deletedLocation) {
        return res.status(404).json({ error: 'Location not found' });
      }
  
      res.json({success : true , msg:"Location Deleted Successfully"});
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // Get All Locations
  const getAllLocations = async (req, res) => {
    try {
      const locations = await Location.find().exec();
      res.json({data:locations});
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // Get Specific Location
  const getSpecificLocation = async (req, res) => {
    try {
      const  id  = req.params.id;
      const location = await Location.findById(id);
  
      if (!location) {
        return res.status(404).json({ error: 'Location not found' });
      }
  
      res.json({success : true , data:location});
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };


router.get("/locations", async (req, res) => {
  try {
    const locations = await Location.find();
    res.json(locations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
});

module.exports = router;

  
  module.exports = {
    addLocation,
    editLocation,
    deleteLocation,
    getAllLocations,
    getSpecificLocation,
  };