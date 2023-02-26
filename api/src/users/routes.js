const UsersController = require("./controllers/user.controller");
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
  const filetypes = /jpeg|webp|jpg|png|gif/;

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

router.post("/users", [UsersController.insert]);

router.get("/users", [
  ValidationMiddleware.validJWTNeeded,
  PermissionMiddleware.minimumPermissionLevelRequired(PAID),
  UsersController.list,
]);

router.get("/users/:userId", [
  ValidationMiddleware.validJWTNeeded,
  PermissionMiddleware.minimumPermissionLevelRequired(FREE),
  PermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
  UsersController.getById,
]);

router.patch("/users/:userId", [
  ValidationMiddleware.validJWTNeeded,
  upload.single("avatar"),
  PermissionMiddleware.minimumPermissionLevelRequired(FREE),
  PermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
  UsersController.patchById,
]);

router.delete("/users/:userId", [
  ValidationMiddleware.validJWTNeeded,
  PermissionMiddleware.minimumPermissionLevelRequired(ADMIN),
  UsersController.removeById,
]);

module.exports = router;
