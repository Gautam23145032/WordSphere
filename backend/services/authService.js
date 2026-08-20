    import pool from "../config/db.js";
    import bcrypt from "bcrypt";

    export async function registerUser(
        username,
        email,
        password
    ) {

    
    const existingUser = await pool.query(
        `
        SELECT id
        FROM users
        WHERE email = $1
        `,
        [email]
    );

    if (existingUser.rows.length > 0) {
        throw new Error("EMAIL_ALREADY_EXISTS");
    }

    const passwordHash =
        await bcrypt.hash(password, 10);


    const result = await pool.query(
        `
        INSERT INTO users
        (
            username,
            email,
            password_hash
        )
        VALUES
        (
            $1,
            $2,
            $3
        )
        RETURNING
            id,
            username,
            email,
            created_at
        `,
        [
        username,
        email,
        passwordHash,
        ]
    );

    return result.rows[0];
    }

    export async function loginUser(
    email,
    password
    ) {

    const result = await pool.query(
        `
        SELECT *
        FROM users
        WHERE email = $1
        `,
        [email]
    );

    if (result.rows.length === 0) {
        throw new Error("INVALID_CREDENTIALS");
    }

    const user = result.rows[0];

    const isMatch =
        await bcrypt.compare(
        password,
        user.password_hash
        );

    if (!isMatch) {
        throw new Error("INVALID_CREDENTIALS");
    }

    return user;
    }