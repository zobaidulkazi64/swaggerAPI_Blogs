const { model, Schema } = require("mongoose");

const articleSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    cover: {
      type: String,
    },
    status: {
      type: String,
      enum: ["draft", "public", "private"],
      default: "public",
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Article = model("Article", articleSchema);

module.exports = Article;
