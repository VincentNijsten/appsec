import {
    User as UserPrisma,
} from '@prisma/client';
import { Role } from "../types";


export class User {
    readonly id?: number;
    public firstName: string;
    public lastName: string;
    public email: string;
    public password: string;
    public role: Role;

    constructor(user: {
        id?: number;
        firstName: string;
        lastName: string;
        email: string;
        password: string;
        role: Role;
    }) {
        this.validate(user);

        this.id = user.id;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.email = user.email;
        this.password = user.password;
        this.role = user.role;
    }

    // getters
    getId(): number | undefined {
        return this.id;
    }

    getFirstName(): string {
        return this.firstName
    }

    getLastName(): string {
        return this.lastName;;
    }

    getEmail(): string {;
        return this.email
    }

    getPassword(): string {
        return this.password;
    }

    getRole(): Role {
        return this.role;
    }

    // Validation
    validate(user: {
        firstName: string;
        lastName: string;
        email: string;
        password: string;
        role: Role;
    }) {
        if (!user.firstName?.trim()) {
            throw new Error('First name is required');
        }
        if (!user.lastName?.trim()) {
            throw new Error('Last name is required');
        }
        if (!user.email?.trim()) {
            throw new Error('Email is required');
        }
        if (!user.password?.trim()) {
            throw new Error('Password is required');
        }
        if (!user.role?.trim()) {
            throw new Error('Role is required');
        }
    }

    // Equals
    equals ( user: User ): boolean {
        return (
            this.id === user.getId() &&
            this.firstName === user.getFirstName() &&
            this.lastName === user.getLastName() &&
            this.email === user.getEmail() &&
            this.password === user.getPassword() &&
            this.role === user.getRole()
        );
    }

    // from
    static from({
        id,
        firstName,
        lastName,
        email,
        password,
        role,
    }: UserPrisma) {
        return new User({
            id,
            firstName,
            lastName,
            email,
            password,
            role: role as Role,
        });
    }


}