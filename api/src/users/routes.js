const UsersController = require("./controllers/users.controller");
const PermissionMiddleware = require("../common/middlewares/auth.permission.middleware");
const ValidationMiddleware = require("../common/middlewares/auth.validation.middleware");
const { Router } = require("express");
const config = require("../common/config/env.config");

const ADMIN = config.permissionLevels.ADMIN;
const PAID = config.permissionLevels.PAID_USER;
const FREE = config.permissionLevels.NORMAL_USER;

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
