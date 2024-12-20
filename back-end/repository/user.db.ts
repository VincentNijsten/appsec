import { PrismaClient } from "@prisma/client";
import { User } from "../model/user";

const prisma = new PrismaClient();


// get user by email
const getUserByEmail = async (email: string): Promise<User | null> => {
    try {
        console.log("Searching for user with email:", email);
        const userPrisma = await prisma.user.findFirst({ 
            where: { email },
        });
        console.log("Database result:", userPrisma);
        return userPrisma ? User.from(userPrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
}
// create user 
const createUser = async (user: User): Promise<User> => {
    try {
        const userPrisma = await prisma.user.create({
            data: {
                firstName: user.getFirstName(), 
                lastName: user.getLastName(), 
                email: user.getEmail(), 
                password: user.getPassword(), 
                role: user.getRole()
            },
        });
        return User.from(userPrisma);
    } catch (error) {
        console.error(error);
        throw new Error("Database error. See server log for details.");
    }
};


export default {
    getUserByEmail,
    createUser,
}