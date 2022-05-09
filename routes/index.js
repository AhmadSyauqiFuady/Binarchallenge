var express = require("express");
var router = express.Router();
const { upload } = require("./middleware.js");
const carController = require("../controllers/car.controller.js");

router.get("/", (req, res) => {
  res.redirect("/cars");
});

router.get("/dashboard", (req, res) => {
  carController.indexDashboard(req, res);
});

router.get("/cars", (req, res) => {
  carController.index(req, res);
});

router.get("/cars/small", (req, res) => {
  carController.smallCars(req, res);
});
router.get("/cars/medium", (req, res) => {
  carController.mediumCars(req, res);
});
router.get("/cars/large", (req, res) => {
  carController.largeCars(req, res);
});

// add
router.get("/add", (req, res) => {
  carController.addCar(req, res);
});

router.post("/add", upload.single("foto"), (req, res, next) => {
  carController.store(req, res, next);
});

router.get("/edit/:id", (req, res) => {
  carController.editCar(req, res);
});

router.put("/edit/:id", upload.single("foto"), (req, res) => {
  carController.update(req, res);
});

router.delete("/delete/:id", (req, res) => {
  carController.delete(req, res);
});

module.exports = router;
