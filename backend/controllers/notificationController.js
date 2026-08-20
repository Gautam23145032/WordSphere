import pool from "../config/db.js";
import webpush from "../config/webpush.js";
export async function saveSubscription(req, res) {

    try {

        const userId = req.user.userId;

        const { endpoint, keys } = req.body;

        await pool.query(

            `

            INSERT INTO push_subscriptions(

                user_id,

                endpoint,

                p256dh,

                auth

            )

            VALUES($1,$2,$3,$4)

            ON CONFLICT(endpoint)

            DO UPDATE SET

                user_id = EXCLUDED.user_id,

                p256dh = EXCLUDED.p256dh,

                auth = EXCLUDED.auth

            `,

            [

                userId,

                endpoint,

                keys.p256dh,

                keys.auth

            ]

        );

        res.json({

            success: true,

            message: "Subscription Saved"

        });

    }

    catch(error){

        console.log(error);

        res.status(500).json({

            success:false,

            message:"Server Error"

        });

    }

}


export async function sendTestNotification(
    req,
    res
) {

    try {

        const userId =
            req.user.userId;

        const result =
            await pool.query(

                `

                SELECT *

                FROM push_subscriptions

                WHERE user_id = $1

                LIMIT 1

                `,

                [userId]

            );

        if(result.rows.length === 0){

            return res.status(404).json({

                success:false,

                message:"Subscription not found"

            });

        }

        const subscription =
            {

                endpoint:
                    result.rows[0].endpoint,

                keys:{

                    p256dh:
                        result.rows[0].p256dh,

                    auth:
                        result.rows[0].auth

                }

            };

        await webpush.sendNotification(

            subscription,

            JSON.stringify({

                title:"WordSphere",

                body:"This is your first notification 🎉"

            })

        );

        res.json({

            success:true,

            message:"Notification Sent"

        });

    }

    catch(error){

        console.log(error);

        res.status(500).json({

            success:false,

            message:"Server Error"

        });

    }

}
