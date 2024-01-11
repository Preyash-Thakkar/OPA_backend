const mongoose = require("mongoose")
const CommunityUpdatesMessageSchema = mongoose.Schema(
    {
      CommunityUpdatesName: {
      type: String,
      required: true,
      },
      UploadedMessage: {
        type: Image ,
      },
      CommunityUpdatesMessage: {
        type: String,
        required: true,
      },
      isDepartmentGroupList: {
        type: Boolean,
        //required: true,
      },
      isDepartmentType: {
        type: Boolean,
        // required: true,
      },
      isEmployeeRole: {
        type: Boolean,
        // required: true,
      },
      isDepartmentGroup: {
        type: Boolean,
        //required: true,
      },
      LocationList: {
        type: Array,
        //default: false,
      },
      DepartmentTypeList: {
        type: Array,
        // required: true,
      },
      EmployeeRoleList: {
        type: Array,
        // required: true,
      },
      EmployeeNameList: {
        type: Array,
        // required: true,
      },
      
    },
    { timestamps: true }
  );
  
  module.exports = mongoose.model(
    "CommunityUpdatesMessageSchema",
    CommunityUpdatesMessageSchema
  );
  