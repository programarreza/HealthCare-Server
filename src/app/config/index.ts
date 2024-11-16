import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join((process.cwd(), ".env")) });

export default {
  NODE_ENV: process.env.NODE_ENV,
  bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
  jwt_access_secret: process.env.JWT_ACCESS_SECRET,
  jwt_access_expires_in: process.env.JWT_ACCESS_EXPIRES_IN,
  jwt_refresh_secret: process.env.JWT_REFRESH_SECRET,
  jwt_refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN,
  jwt_reset_pass_secret: process.env.JWT_RESET_PASS_SECRET,
  jwt_reset_pass_token_expires_in: process.env.JWT_RESET_PASS_TOKEN_EXPIRES_IN,
  reset_pass_link: process.env.RESET_PASS_LINK,
  senderEmail: process.env.EMAIL,
  app_pass: process.env.APP_PASS,
};
