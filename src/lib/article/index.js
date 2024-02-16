const { Article } = require("../../models");
const defaults = require("../../config/defaults");

const findAllItems = async ({
  page = defaults.page,
  limit = defaults.limit,
  sortType = defaults.sortType,
  sortBy = defaults.sortBy,
  search = defaults.search,
}) => {
  const sortStr = `${sortType === "dsc" ? "-" : ""}${sortBy}`;

  const filter = {
    title: { $regex: search, $options: "i" },
  };

  // const doc = await Article.findOne().populate("author");

  // console.log(doc.author.name);
  // console.log(doc.populated('author')); /
  const articles = await Article.find(filter)
    .populate({ path: "author", select: "name" })
    .sort(sortStr)
    .skip(page * limit - limit)
    .limit(limit);

  return articles.map((article) => ({
    ...article._doc,
    id: article.id,
  }));
};

/**
 * count all articles
 * @param {} param0
 * @returns
 */

const count = ({ search = "" }) => {
  const filter = {
    title: { $regex: search, $options: "i" },
  };

  return Article.countDocuments(filter);
};

/**
 * Create a new article
 * @param {*} param0
 * @returns
 */

const create = async ({
  title,
  body = "",
  cover = "",
  status = "draft",
  author,
}) => {
  if (!title || !author) throw badRequest("Invalid parameters");

  const article = new Article({
    title,
    body,
    cover,
    status,
    author: author.id,
  });

  await article.save();
  return {
    ...article._doc,
    id: article.id,
  };
};

module.exports = {
  findAllItems,
  create,
  count,
};
