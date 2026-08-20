import express from "express";

const router = express.Router();
import {
    verifyAccessToken
} from "../middleware/authMiddleware.js";

import {
    saveSubscription,
    sendTestNotification
} from "../controllers/notificationController.js";

router.post( "/subscribe", verifyAccessToken, saveSubscription );

router.get( "/vapid-public-key", (req, res) => {
        
        res.json({
            publicKey:
                process.env.VAPID_PUBLIC_KEY
        });

    }
);

router.post( "/test", verifyAccessToken, sendTestNotification );

export default router;