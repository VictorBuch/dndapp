const jwt = require("jsonwebtoken");

exports.createJWT = (userName, userId, duration) => {
    const payload = {
        userName,
        userId,
        duration
    };

    return jwt.sign(payload, "secret", {
        expiresIn: duration,
    });
};