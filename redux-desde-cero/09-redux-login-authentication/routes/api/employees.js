//express
import express from "express";

//controllers
import {
  getAllEmployees,
  getEmployee,
  createNewEmployee,
  updateEmployee,
  deleteEmployee,
} from "../../controllers/employeesController.js";

//middlewares
import verifyRoles from "../../middleware/verifyRoles.js";

//config
import ROLES_LIST from "../../config/roles_list.js";

//variables
const router = express.Router();

//routes
router
  .route("/")
  .get(getAllEmployees)
  .post(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), createNewEmployee)
  .put(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), updateEmployee)
  .delete(verifyRoles(ROLES_LIST.Admin), deleteEmployee);

router.route("/:id").get(getEmployee);

export default router;
