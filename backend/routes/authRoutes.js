    import express from "express";
    import {verifyAccessToken} from "../middleware/authMiddleware.js";
    import {
    register, login,
    } from "../controllers/authController.js";

    const router = express.Router();

    router.post( "/register", register);

    router.post( "/login", login );

    router.get( "/profile", verifyAccessToken, (req,res)=>{

        res.json({
            success:true,
            user:req.user
        });

    });
    export default router;