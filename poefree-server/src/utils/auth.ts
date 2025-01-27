import jwt from "jsonwebtoken";

const JWT_SECRET =
  process.env.JWT_SECRET ||
  "nclaijnsldkhfagsdlihbcvkablsdiuhfgq4y3owe8rfhoq8w37eh4afp9328hewf90q124hq38ehouwadfsq874w3eu9jpq9eiwasdwersdfhgetrsgadfq43f5wy6hurj678udjtyhrsgerf";

export const generateToken = (userId: number): string => {
  return jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: "1h" });
};

export const verifyToken = (token: string): any => {
  return jwt.verify(token, JWT_SECRET);
};
