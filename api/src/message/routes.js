const MessageController = require("./controllers/message.controller");
const PermissionMiddleware = require("../common/middlewares/auth.permission.middleware");
const ValidationMiddleware = require("../common/middlewares/auth.validation.middleware");
const { Router } = require("express");
const multer = require("multer");
const config = require("../common/config/env.config");
const path = require("path");

const ADMIN = config.permissionLevels.ADMIN;
const PAID = config.permissionLevels.PAID_USER;
const FREE = config.permissionLevels.NORMAL_USER;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      `${file.fieldname}-${uniqueSuffix}.${file?.mimetype?.split("/")?.[1]}`
    );
  },
});

function fileFilter(req, file, cb) {
  // Allowed ext
  const filetypes = /jpeg|webp|jpg|png|gif|pdf|doc|docx|ppt|pptx|txt/;

  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error: Images Only!");
  }
}

const upload = multer({ storage, limits: { fileSize: 20000000 }, fileFilter });

const router = Router();

router.post("/messages", [upload.array("files", 12), MessageController.insert]);

router.get("/messages", [
  ValidationMiddleware.validJWTNeeded,
  PermissionMiddleware.minimumPermissionLevelRequired(FREE),
  MessageController.list,
]);

router.post("/:userId/messages/last", [
  ValidationMiddleware.validJWTNeeded,
  PermissionMiddleware.minimumPermissionLevelRequired(FREE),
  MessageController.last,
]);

router.get("/:userId/messages/:contactId/count", [
  ValidationMiddleware.validJWTNeeded,
  PermissionMiddleware.minimumPermissionLevelRequired(FREE),
  MessageController.count,
]);

router.get("/:senderId/messages/:receiverId", [
  ValidationMiddleware.validJWTNeeded,
  PermissionMiddleware.minimumPermissionLevelRequired(FREE),
  MessageController.listBySenderReceiver,
]);

// router.get("/:userId/messages", [
//   ValidationMiddleware.validJWTNeeded,
//   PermissionMiddleware.minimumPermissionLevelRequired(FREE),
//   MessageController.listByUser,
// ]);

router.get("/messages/:id", [
  ValidationMiddleware.validJWTNeeded,
  PermissionMiddleware.minimumPermissionLevelRequired(FREE),
  PermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
  MessageController.getById,
]);

router.patch("/messages/:id", [
  ValidationMiddleware.validJWTNeeded,
  upload.array("files", 12),
  PermissionMiddleware.minimumPermissionLevelRequired(FREE),
  PermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
  MessageController.patchById,
]);

router.delete("/messages/:id", [
  ValidationMiddleware.validJWTNeeded,
  PermissionMiddleware.minimumPermissionLevelRequired(ADMIN),
  MessageController.removeById,
]);

module.exports = router;
