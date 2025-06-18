import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import AppError from "../utils/appError.js";
import catchAsync from "../utils/catchAsync.js";

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  const cookieOption = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  };
  res.cookie("jwt", token, cookieOption);

  // Remove password from output:
  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

exports.signup = catchAsync (async (req, res, next) => {
  try {
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
    });
    createSendToken(newUser, 201, res);
  } catch (error) {
    next(error);
  }
});

exports.login =  catchAsync (async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Condition to check if email and password exist:
    if (!email || !password) {
      return next(new AppError("Please provide email & password!", 400));
    }

    // Condition to check if user exist and password is correct:
    const user = await User.findOne({ email }).select("+password");

    if (!user || !(await user.correctPassword(password, user.password))) {
      return next(new AppError("Incorrect email or password", 401));
    }

    createSendToken(user, 200, res);
  } catch (error) {
    next(error);
  }
});

exports.protect = catchAsync (async (req, res, next) => {
  try {
    //Getting token and check if it's there:
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies.jwt) {
      token = req.cookies.jwt;
    }
    if (!token) {
      return next(
        new AppError("You are not loggedIn! Please login to get access.", 401)
      );
    }

    //Verification token:
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);

    //Check if user still exist:
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      return next(
        new AppError(
          "The user belonging to this token does no longer exist.",
          401
        )
      );
    }

    //Condition to check if user changed password after the token was issued:
    if (currentUser.changePasswordAfter(decoded.iat)) {
      return next(
        new AppError("User recently changed password! Please log in again", 401)
      );
    }

    // Grant access to protected route:
    req.user = currentUser;
    res.locals.user = currentUser;
    next();
  } catch (error) {
    next(error);
  }
});

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.roles)) {
      return next(
        new AppError("You do not have permission to perform this action", 403)
      );
    }
    next();
  };
};

exports.logout = (req, res) => {
  res.cookie('jwt', 'loggedout', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true
  });
  res.status(200).json({ status: 'success' });
}