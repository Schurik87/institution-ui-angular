enum Roles {
    PLATFORM_ADMIN = 'PLATFOR_MADMIN',
    SUPER_ADMIN = 'SUPER_ADMIN',
    USER = 'USER',
    GUEST = 'GUEST',
}

enum UserTypes {
    CLIENT = 'CLIENT',
    CLIENT_MEMBER = 'CLIENT_MEMBER',
    EMPLOYEE = 'EMPLOYEE',
}

enum Genders {
    FEMALE = 'FEMALE',
    MALE = 'MALE',
    OTHER = 'OTHER',
}

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
    role?: Roles;
    appLanguage?: string;
    type?: UserTypes;
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
    type?: UserTypes;
}

export interface UserResult {
    data: User;
    message: string;
}

export interface UserLogin {
    userName: string;
    password: string;
}

// class User  {
//     constructor() {
//     id: undefined,
//     userName: undefined,
//     email: undefined,
//     password: undefined,
//     firstName: undefined,
//     lastName: undefined,
//     dateOfBirth: undefined,
//     gender: undefined,
//     image: undefined,
//     imageSmall: undefined,
//     role: Roles.USER,
//     appLanguage: undefined,
//     type: undefined,
//     }

//     public DefaultUser(): User {
//         return new User() = {

//         }
//     }
// }

// export User;
