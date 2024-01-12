const mongoose = require("mongoose");
const CommunityUpdatesMessage = require("../models/communityUpdatesMessage");
const CommunityUpdatesMessage = require("../models/DepartmentType");
const CommunityUpdatesMessage = require("../models/EmployeesRole");
const CommunityUpdatesMessage = require("../models/DepartmentGroupMaster");
const DepartmentGroup = require("../models/DepartmentGroupMaster");
const DepartmentType = require("../models/DepartmentType");
const EmployeeRoles = require("../models/EmployeesRole");

const mongoose = require("mongoose");
const CommunityUpdatesMessage = require("../models/communityUpdatesMessage");
const DepartmentGroup = require("../models/DepartmentGroupMaster");
const DepartmentType = require("../models/DepartmentType");
const EmployeeRoles = require("../models/EmployeesRole");

exports.createCommunityUpdatesMessage = async (req, res) => {
  console.log("body", req.body);
  try {
    const {
      CommunityUpdatesName,
      UploadedMessage,
      CommunityUpdatesMessage,
      isDepartmentGroupList,
      isDepartmentType,
      isEmployeeRole,
      isDepartmentGroup,
      LocationList,
      DepartmentTypeList,
      EmployeeRoleList,
    } = req.body;

    const locationDataId = mongoose.Types.ObjectId(LocationList[0]); // Assuming LocationList is an array
    const departmentGroupId = mongoose.Types.ObjectId(DepartmentGroup._id.$oid);
    const departmentTypeId = mongoose.Types.ObjectId(DepartmentType._id.$oid);
    const employeeRoleId = mongoose.Types.ObjectId(EmployeeRoles._id.$oid);

    const communityUpdatesMessageCheck = await CommunityUpdatesMessage.findOne({
      CommunityUpdatesName: req.body.CommunityUpdatesName,
    });

    if (communityUpdatesMessageCheck) {
      return res.status(200).json({
        isOk: false,
        field: 1,
        message: "This Community Updates Name Already Exists!",
      });
    } else {
      const add = await new CommunityUpdatesMessage({
        CommunityUpdatesName,
        UploadedMessage,
        CommunityUpdatesMessage,
        isDepartmentGroupList,
        isDepartmentType,
        isEmployeeRole,
        isDepartmentGroup,
        locationDataId,
        departmentGroupId,
        departmentTypeId,
        employeeRoleId,
      }).save();

      res.status(200).json({
        isOk: true,
        message: add,
      });
    }
  } catch (err) {
    console.log("error in create", err);
    return res.status(400).send("Something went wrong", err);
  }
};

router.get("/auth/department-groups/:locationId", async (req, res) => {
  try {
    const locationId = req.params.locationId;
    const departmentGroups = await DepartmentGroup.find({ locationId });
    res.json(departmentGroups);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
});

// Get all department types based on their department group ID
router.get("/auth/department-types/:departmentGroupId", async (req, res) => {
  try {
    const departmentGroupId = req.params.departmentGroupId;
    const departmentTypes = await DepartmentType.find({ departmentGroupId });
    res.json(departmentTypes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
});

// Get all employee roles based on their department type ID
router.get("/auth/employee-roles/:departmentTypeId", async (req, res) => {
  try {
    const departmentTypeId = req.params.departmentTypeId;
    const employeeRoles = await EmployeeRole.find({ departmentTypeId });
    res.json(employeeRoles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
});

// Get all community updates messages based on their employee role ID
router.get("/auth/community-updates-messages/:employeeRoleId", async (req, res) => {
  try {
    const employeeRoleId = req.params.employeeRoleId;
    const communityUpdatesMessages = await CommunityUpdatesMessage.find({ employeeRoleId });
    res.json(communityUpdatesMessages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
});

// exports.createCommunityUpdatesMessage = async (req, res) => {
//   console.log("body", req.body);
//   try {
//     const {
//       CommunityUpdatesName,
//       UploadedMessage,
//       CommunityUpdatesMessage,
//       isDepartmentGroupList,
//       isDepartmentType,
//       isEmployeeRole,
//       isDepartmentGroup,
//       LocationList,
//       DepartmentTypeList,
//       EmployeeRoleList,
//     } = req.body;
//     // const LocationId = mongoose.Types.ObjectId(departmentGroupData._id.$oid);
//     // console.log("Department Group ID:", LocationId);

//     const locationDataId = mongoose.Types.ObjectId(LocationData._id.$oid);
//     console.log("Location Data ID:", locationDataId);
    
//     // Extracting ObjectId for DepartmentGroup based on LocationData
//     const departmentGroupId = mongoose.Types.ObjectId(DepartmentGroup._id.$oid);
//     console.log("Department Group ID:", departmentGroupId);
    
//     // Extracting ObjectId for DepartmentType based on DepartmentGroup
//     const departmentTypeId = mongoose.Types.ObjectId(DepartmentType._id.$oid);
//     console.log("Department Type ID:", departmentTypeId);
    
//     // Extracting ObjectId for EmployeeRoles based on DepartmentType
//     const employeeRoleId = mongoose.Types.ObjectId(EmployeeRoles._id.$oid);
//     console.log("Employee Role ID:", employeeRoleId);
    
//     // Checking for a document in CommunityUpdatesMessage
//     const communityUpdatesMessageCheck = await CommunityUpdatesMessage.findOne({
//       CommunityUpdatesName: req.body.CommunityUpdatesName,
//     });
    
    
//     if (communityUpdatesMessageCheck) {
//       return res.status(200).json({
//         isOk: false,
//         field: 1,
//         message: "This Community Updates Name Already Exists!",
//       });
//     } else {
//       const add = await new CommunityUpdatesMessage({
//         CommunityUpdatesName:CommunityUpdatesName,
//         UploadedMessage:UploadedMessage,
//         CommunityUpdatesMessage:CommunityUpdatesMessage,
//         isDepartmentGroupList:isDepartmentGroupList,
//         isDepartmentType:isDepartmentType,
//         isEmployeeRole:isEmployeeRole,
//         isDepartmentGroup:isDepartmentGroup,
//         LocationList:LocationList,
//         DepartmentTypeList:DepartmentTypeList,
//         EmployeeRoleList:EmployeeRoleList,
//       }).save();

//       res.status(200).json({
//         isOk: true,
//         message: add,
//       });
//     }
//   } catch (err) {
//     console.log("error in create", err);
//     return res.status(400).send("Something went wrong", err);
//   }
// };

// exports.getCommunityUpdatesMessage = async (req, res) => {
//     const communityUpdatesMessage = await CommunityUpdatesMessage.findOne({
//       _id: req.params._id,
//     }).exec();
//     res.json(communityUpdatesMessage);
//   };
  
//   exports.updateCommunityUpdatesMessage = async (req, res) => {
//     try {
//       const {
//         CommunityUpdatesName,
//         UploadedMessage,
//         CommunityUpdatesMessage,
//         isDepartmentGroupList,
//         isDepartmentType,
//         isEmployeeRole,
//         isDepartmentGroup,
//         LocationList,
//         DepartmentTypeList,
//         EmployeeRoleList,
//       } = req.body;
  
//       const update = await CommunityUpdatesMessage.findOneAndUpdate(
//         { _id: req.params._id },
//         {
//           CommunityUpdatesName,
//           UploadedMessage,
//           CommunityUpdatesMessage,
//           isDepartmentGroupList,
//           isDepartmentType,
//           isEmployeeRole,
//           isDepartmentGroup,
//           LocationList,
//           DepartmentTypeList,
//           EmployeeRoleList,
//         },
//         { new: true }
//       );
  
//       res.json(update);
//     } catch {
//       res.status(400).send("Update community updates message failed");
//     }
//   };
  
//   exports.deleteCommunityUpdatesMessage = async (req, res) => {
//     try {
//       const del = await CommunityUpdatesMessage.findOneAndDelete({
//         _id: req.params._id,
//       });
//       res.json(del);
//     } catch {
//       res.status(400).send("Delete community updates message failed");
//     }
//   };
  
//   exports.listCommunityUpdatesMessage = async (req, res) => {
//     let { skip, per_page, sorton, sortdir, match } = req.body;
  
//     let query = [
//       {
//         $facet: {
//           stage1: [
//             {
//               $group: {
//                 _id: null,
//                 count: {
//                   $sum: 1,
//                 },
//               },
//             },
//           ],
//           stage2: [
//             {
//               $skip: skip,
//             },
//             {
//               $limit: per_page,
//             },
//           ],
//         },
//       },
//       {
//         $unwind: {
//           path: "$stage1",
//         },
//       },
//       {
//         $project: {
//           count: "$stage1.count",
//           data: "$stage2",
//         },
//       },
//     ];
  
//     if (match) {
//       query = [
//         {
//           $match: {
//             $or: [
//               {
//                 CommunityUpdatesName: { $regex: match, $options: "i" },
//               },
//               {
//                 CommunityUpdatesMessage: { $regex: match, $options: "i" },
//               },
//             ],
//           },
//         },
//       ].concat(query);
//     }
  
//     if (sorton && sortdir) {
//       let sort = {};
//       sort[sorton] = sortdir == "desc" ? -1 : 1;
//       query = [
//         {
//           $sort: sort,
//         },
//       ].concat(query);
//     } else {
//       let sort = {};
//       sort["createdAt"] = -1;
//       query = [
//         {
//           $sort: sort,
//         },
//       ].concat(query);
//     }
  
//     const list = await CommunityUpdatesMessage.aggregate(query);
//     console.log("LIST IN CommunityUpdatesMessage", list);
//     res.json(list);
//   };
