const express = require("express");
const router = new express.Router();
const Product = require("../models/Product");
const Tag = require("../models/Tag");
const uploadCloud = require("../config/cloudinary.js");

router.get("/prod-add", (req, res) => {
  Tag.find()
    .then(tags => {
      res.render("products_add", { tags });
    })
    .catch(error => console.error(error));
});

router.post("/prod-add", uploadCloud.single("image_product"), (req, res) => {
  const { name, ref, size, description, price, category } = req.body;
  const imgUrl = req.file.url;
  const imgName = req.file.originalname;
  Product.create({
    name,
    ref,
    size,
    description,
    price,
    category,
    image_product: imgUrl
  })
    .then(newShoe => {
      console.log(newShoe);
      res.redirect("/prod-manage");
    })
    .catch(error => console.error("error creating product:", error));
});

// router.post(
//   "/addimage",
//   uploadCloud.single("image_product"),
//   (req, res, next) => {
//     const { name } = req.body;
//     const newImg = { name };
//     if (req.file) newImg.image = req.file.secure_url;
//     console.log(newImg.image);
//     Image.create(newImg)
//       .then(dbRes => res.redirect("/"))
//       .catch(dbErr => console.log(dbErr));
//   }
// );

router.post("/tag-add", (req, res) => {
  const label = req.body;
  Tag.create(label)
    .then(newTag => {
      console.log("new tag added:", newTag);
      res.redirect("/prod-add");
    })
    .catch(error => {
      console.log("error adding tag:", error);
      res.redirect("/prod-add");
    });
});

module.exports = router;
