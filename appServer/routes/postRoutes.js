const express = require("express");
const postControllers = require("../controllers/postControllers");
const router = express.Router();

// EMPLOYEES


router.route("/employees/")
    .get(postControllers.getAllEmployees)
    .post(postControllers.setEmployee)

router.route("/employees/:id")
    .get(postControllers.getEmployee)
    .put(postControllers.editEmployee)
    .delete(postControllers.deleteEmployee);


// DEALS

router.route("/deals/")
    .get(postControllers.getAllDeals)
    .post(postControllers.setDeal)

router.route("/deals/:id")
    .get(postControllers.getDeal)
    .put(postControllers.editDeal)
    .delete(postControllers.deleteDeal)


module.exports = router;