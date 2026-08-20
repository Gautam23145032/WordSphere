    import { registerUser } from "../services/authService.js";
    import { loginUser } from "../services/authService.js";

    import { generateAccessToken }
    from "../utils/jwt.js";
    export async function register(req, res) {

    try {

        const {
            username,
            email,
            password,
        } = req.body;

        
        if (
            !username ||
            username.trim().length < 3
            ) {
            return res.status(400).json({
                success: false,
                message:
                "Username must be at least 3 characters long",
            });
        }

        if (
            !email ||
            !email.includes("@")
            ) {
            return res.status(400).json({
                success: false,
                message:
                "Please enter a valid email",
            });
        }

       
        if (
        !password ||
        password.length < 8
        ) {
        return res.status(400).json({
            success: false,
            message:
            "Password must be at least 8 characters long",
        });
        }

        const user = await registerUser(
            username.trim(),
            email.trim().toLowerCase(),
            password
        );

        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            user,
        });

    } catch (error) {

        if (
            error.message ===
            "EMAIL_ALREADY_EXISTS"
            ) {
            return res.status(409).json({
                success: false,
                message:
                "Email already exists",
            });
        }

        return res.status(500).json({
            success: false,
            message:
                "Internal Server Error",
            });
        }
    }

    export async function login(
        req,
        res
        ) {

        try {

            const {
                email,
                password,
            } = req.body;

            if (!email || !password) {

            return res.status(400).json({
                success: false,
                message:
                "Email and password are required",
            });

            }

            const user =
                await loginUser(
                    email.trim().toLowerCase(),
                    password
                );

            const token = generateAccessToken(user);

            return res.json({
                success: true,

                message:
                    "Login successful",

                token,

                user: {
                    id: user.id,
                    username: user.username,
                    email: user.email,
                },
            });

        }
        catch (error) {

            if (
                error.message ===
                "INVALID_CREDENTIALS"
                ) {

                return res.status(401).json({
                    success: false,
                    message:
                    "Invalid email or password",
                });

            }

            return res.status(500).json({
                success: false,
                message: "Internal Server Error",
            });

        }

    }