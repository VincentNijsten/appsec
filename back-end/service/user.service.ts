import bcrypt from 'bcrypt';
import { User } from "../model/user";
import userDb from "../repository/user.db";
import { UserInput, AuthenticationResponse } from "../types";
import { generateJwtToken } from '../util/jwt';


// get user by email
const getUserByEmail = async (email: string): Promise<User | null> => {
    const user = await userDb.getUserByEmail( email );
    if (!user) {
        throw new Error(`User with email: ${email} does not exist.`)
    }
    return user;
}

// authenticatie
const authenticate = async ({ email, password }: UserInput): Promise<AuthenticationResponse> => {
    const user = await userDb.getUserByEmail( email );
    if (!user) {
        throw new Error("Incorrect email.");
    }

    const isValidPassword = await bcrypt.compare(password, user.getPassword());
    if (!isValidPassword) {
        throw new Error('Incorrect password.')
    }

    return {
        token: generateJwtToken({ email, role: user.getRole() }),
        email: email,
        fullname: `${user.getFirstName()} ${user.getLastName()}`,
        role: user.getRole(),
    };
};

// create user
const createUser = async ({ 
    firstName, 
    lastName, 
    email, 
    password, 
    role 
}: UserInput): Promise<User> => {
    const existing = await userDb.getUserByEmail( email )
    if (existing) {
        throw new Error(`User with email ${email} is already registered`);
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({firstName, lastName, email, password: hashedPassword, role});

    return await userDb.createUser(user);
};

export default {
    getUserByEmail,
    authenticate,
    createUser,
}