const authenticate = (req, res, next) => {
  req.user = {
    id: "65ccfe6d1c50effabd83dc2d",
    name: "John Doe",
    email: "jH7wZ@example.com",
    role: "user",
  };
  next();
};

module.exports = authenticate;
