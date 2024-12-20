import jwt from "jsonwebtoken";
import { Role } from "../types";

const generateJwtToken = ({ email, role }: { email: string, role: Role }): string => {
    const options = { expiresIn: `${process.env.JWT_EXPIRES_HOURS}h`, issuer: 'vhl_API' };
    
    try {
        return jwt.sign({ email, role }, process.env.JWT_SECRET!, options);
    } catch (error) {
        console.error(error);
        throw new Error("Error generating JWT token, see server log for details.");
    }
};

export { generateJwtToken };
