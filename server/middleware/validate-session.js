const jwt = require("jsonwebtoken");

const prisma = require("../db");

const validateSession = async (req, res, next) => {
  // Middleware still has access to the request, response, and requires the next() function to move passed it

  try {
    //? Take token provided by the request object (headers.authorization)
    const auth = req.headers.authorization;
    console.log(auth);

    //? Checking if authorization header is present and value, if not, throw an error
    if (!auth) throw new Error("Unauthorized");

    //? Separate the token from the string
    const token = auth.split(" ")[1];

    //? Checking if token present. ex.) is there a token after the "Bearer" portion of the string
    if (!token) throw new Error("Unauthorized");

    //? Decode the token - Should be decoded payload (obj with user id on it)
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);

    //? Find user in our db

    const user = await prisma.users.findUnique({
      where: {
        id: decoded.id,
        // from decoded object above on line 24
      },
    });
    console.log({ user });

    //? checks parent if no user validation needed
    if (!user) {
      const parent = await prisma.parents.findUnique({
        where: {
          id: decoded.id,
        },
      });
      console.log({ parent });
      if (!parent) {
        throw new Error("Parent not found");
      }
      req.user = parent;
      req.user.type = "parent";
    } else {
      req.user = user;
      req.user.type = "child";
    }

    console.log("found user", req.user);

    return next();
  } catch (err) {
    console.log(err);
    res.status(401).json({ Error: err.message });
  }
};

module.exports = validateSession;
