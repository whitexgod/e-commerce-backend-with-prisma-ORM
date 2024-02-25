import "dotenv/config";

export const config = {
  port: process.env.PORT || 4000,
  saltValue: process.env.SALT_VALUE || 10,
  jwtSecret: process.env.JWT_SECRET || "JWT_ecret",
};
