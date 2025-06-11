import e from "cors";
import jwt from "jsonwebtoken";

const signToken = id  => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
}

const createSendToken = (user, statusCode, res) => {
    const token = signToken(user._id);
    const cookieOption = {
        expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production'
    }
    res.cookie('jwt', token, cookieOption);

    // Remove password from output:
    user.password = undefined;

    res.status(statusCode).json({
        status: 'success',
        token,
        data: {
            user
        }
    });
}

exports.signup = async (req, res, next) => {
    try {
        const newUser = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            passwordConfir: req.body.passwordConfirm,
        });
        createSendToken(newUser, 201, res);
    } catch (error) {
        next(error);
    }
};

exports.login = async (req, res, next)  => {
       try {
        const {email , password} = req.body;

        // Condition to check if email and password exist:
        if (!email || !password) {
            return next(new AppError('Please provide email & password!', 400));
        }

        // Condition to check if user exist and password is correct:
        const user = await newUser.findOne({email}).select('+password');

        if (!user || !(await user.correctPassword(password, user.password))) {
            return next(new AppError('Incorrect email or password', 401));
        }

        createSendToken(user, 200, res);
       } catch (error) {
         next(error);
       }
}
