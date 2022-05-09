const { Car } = require("../models");

exports.indexDashboard = (req, res) => {
  Car.findAll().then((datas) => {
    res.render("dashboard.ejs", {
      title: "Dashboard",
      datas,
      quicklink: "Dashboard",
      href: "/dashboard",
    });
  });
};

exports.smallCars = (req, res) => {
  Car.findAll({ where: { size: "Small" } }).then((datas) => {
    res.render("cars.ejs", {
      title: "Car",
      datas,
      quicklink: "List Cars",
      href: "/cars",
      query: "small",
      messages: {
        success: req.flash("success"),
        delete: req.flash("delete"),
      },
    });
  });
};
exports.mediumCars = (req, res) => {
  Car.findAll({ where: { size: "Medium" } }).then((datas) => {
    res.render("cars.ejs", {
      title: "Car",
      datas,
      quicklink: "List Cars",
      href: "/cars",
      query: "medium",
      messages: {
        success: req.flash("success"),
        delete: req.flash("delete"),
      },
    });
  });
};
exports.largeCars = (req, res) => {
  Car.findAll({ where: { size: "Large" } }).then((datas) => {
    res.render("cars.ejs", {
      title: "Car",
      datas,
      quicklink: "List Cars",
      href: "/cars",
      query: "large",
      messages: {
        success: req.flash("success"),
        delete: req.flash("delete"),
      },
    });
  });
};

exports.index = (req, res) => {
  Car.findAll().then((datas) => {
    res.render("cars.ejs", {
      title: "Car",
      datas,
      quicklink: "List Cars",
      href: "/cars",
      query: "all",
      messages: {
        success: req.flash("success"),
        delete: req.flash("delete"),
      },
    });
  });
};

exports.addCar = (req, res) => {
  res.render("add.ejs", {
    title: "Add Car",
    selectedData: {},
    titleContent: "Add List Car",
    action: "/add",
    quicklink: "List Cars",
    href: "/cars",
  });
};

exports.store = (req, res, next) => {
  Car.findAll().then((datas) => {
    console.log(datas);
    const { nama, harga, ukuran } = req.body;
    const file = req.file;
    if (!file) {
      const error = new Error("upload file");
      error.httpStatusCode = 400;
      return next(error);
    }

    const car = {
      name: nama,
      price: harga,
      size: ukuran,
      picture: file.path.replace("public", ""),
    };

    Car.create(car).then((data) => {
      console.log(file);
      req.flash("success", "Data berhasil disimpan");
      res.redirect("/cars");
    });
  });
};

function getPath(url) {
  return require("path").join(__dirname, url);
}

exports.editCar = (req, res) => {
  const id = req.params.id;
  Car.findByPk(id).then((data) => {
    res.render("add.ejs", {
      title: "Edit Car",
      selectedData: data,
      titleContent: "Edit List Car",
      action: `/edit/${id}?_method=PUT`,
      quicklink: "List Cars",
      href: "/cars",
      path: getPath(data.picture),
    });
  });
};

exports.update = (req, res, next) => {
  const id = req.params.id;
  const { nama, harga, ukuran } = req.body;
  const file = req.file;
  if (file) {
    const car = {
      name: nama,
      price: harga,
      size: ukuran,
      picture: file.path.replace("public", ""),
    };
    Car.update(car, {
      where: { uid: id },
    }).then((num) => {
      if (num == 1) {
        req.flash("success", "Data Berhasil Disimpan");
        res.redirect("/cars");
      }
    });
  } else {
    const car = {
      name: nama,
      price: harga,
      size: ukuran,
    };

    Car.update(car, {
      where: { uid: id },
    }).then((num) => {
      if (num == 1) {
        req.flash("success", "Data Berhasil Disimpan");
        res.redirect("/cars");
      }
    });
  }
};

exports.delete = (req, res) => {
  const { id } = req.params;
  Car.destroy({
    where: { uid: id },
  }).then((num) => {
    if (num == 1) {
      req.flash("delete", "Data Berhasil Dihapus");

      res.redirect("/cars");
    }
  });
};
