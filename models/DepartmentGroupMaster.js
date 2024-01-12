const mongoose = require("mongoose");
const { Schema } = mongoose;

const departmentGroup = mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
      },
      locationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "location",
        required: true,
      },
      // Add other fields as needed
    },
    { timestamps: true }
  );
  
  
const DepartmentGroup = mongoose.model ("DepartmentGroup" , departmentGroup);

module.exports = DepartmentGroup;
