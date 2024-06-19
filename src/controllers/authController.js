const AuthService = require("../service/AuthService");

const authService = new AuthService();

const register = async (req, res, next) => {
  try {
    const inputData = req.body;
    const newUser = await authService.register(inputData);
    res
      .status(200)
      .json({ message: `Verification email sent to ${inputData.email}` });
  } catch (error) {
    next(error);
  }
};

const verify = async (req, res, next) => {
  try {
    const { email, token } = req.body;
    const accessToken = await authService.verify(email, token);
    res
      .status(200)
      .json({
        message: "Registration complete, Welcome to Petaverse",
        accessToken,
      });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const accessToken = await authService.login(email, password);
    res.status(200).json({ message: "Login successful", accessToken });
  } catch (error) {
    next(error);
  }
};

module.exports = { register, verify, login };
