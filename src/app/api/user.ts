export interface User {
    id?: string;
    userName?: string;
    email?: string;
    password?: string;
    firstName?: string;
    lastName?: string;
    dateOfBirth?: Date;
    gender?: string;
    image?: string;
    imageSmall?: string;
    role?: string;
    appLanguage?: string;
}

export interface UpdateUser {
    email?: string;
    firstName?: string;
    lastName?: string;
    dateOfBirth?: Date;
    gender?: string; // keyof typeof Gender;
    image?: string;
    imageSmall?: string;
    role?: string;
    appLanguage?: string;
}

export interface UserResult {
    data: {
        id?: string;
        userName?: string;
        email?: string;
        password?: string;
        firstName?: string;
        lastName?: string;
        dateOfBirth?: Date;
        gender?: string;
        image?: string;
        imageSmall?: string;
        role?: string;
        appLanguage?: string;
    };
    message: string;
}

export interface UserLogin {
    userName: string;
    password: string;
}

enum Gender {
    NotDefined,
    Male,
    Female,
    Other,
}
