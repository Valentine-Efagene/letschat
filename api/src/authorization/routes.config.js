const VerifyUserMiddleware = require("./middlewares/verify.user.middleware");
const AuthorizationController = require("./controllers/authorization.controller");
const AuthValidationMiddleware = require("../common/middlewares/auth.validation.middleware");
const { Router } = require("express");

const router = Router();

router.post("/auth", [
  VerifyUserMiddleware.hasAuthValidFields,
  VerifyUserMiddleware.isPasswordAndUserMatch,
  AuthorizationController.login,
]);

router.post("/auth/refresh", [
  AuthValidationMiddleware.validJWTNeeded,
  AuthValidationMiddleware.verifyRefreshBodyField,
  AuthValidationMiddleware.validRefreshNeeded,
  AuthorizationController.login,
]);

module.exports = router;
