const router = require("express").Router();
const { controllers: articleController } = require("../api/v1/article");
const authenticate = require("../middleware/authenticate");

router
  .route("/api/v1/articles")
  .get(articleController.findAllItems)
  .post(authenticate, articleController.create);

module.exports = router;
