const tokenService = require("../services/token.service");

module.exports = (request, response, next) => {
  if (request.method === "OPTIONS") {
    return next();
  }

  try {
    const token = request.headers.authorization.split(" ")[1];

    if (!token) {
      return response.status(401).json({ message: "Unauthorized", token: token });
    }

    const data = tokenService.validateAccess(token);

    if (!data) {
      return response.status(401).json({ message: "Unauthorized", data: data });
    }

    request.user = data;
    next();
  } catch (error) {
    response
      .status(401)
      .json({ message: "Unauthorized" });
  }
};