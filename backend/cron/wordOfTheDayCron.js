import cron from "node-cron";
import { words } from "../services/trieService.js";
import pool from "../config/db.js";
import webpush from "../config/webpush.js";

function getRandomWord() {

    const index = Math.floor(
        Math.random() * words.length
    );

    return words[index];

}

cron.schedule("* * * * *", async () => {

    try {

        console.log("Cron Running...");

        const word = getRandomWord();

        const result = await pool.query(

            `
            SELECT
                endpoint,
                p256dh,
                auth
            FROM push_subscriptions
            `

        );

        const subscriptions = result.rows;

        for (const sub of subscriptions) {

            const subscription = {

                endpoint: sub.endpoint,

                keys: {

                    p256dh: sub.p256dh,

                    auth: sub.auth

                }

            };

            try {

                await webpush.sendNotification(

                    subscription,

                    JSON.stringify({

                        title: "📖 Word of the Day",

                        body: word,

                        data: {
                            word
                        }

                    })

                );


            } catch (err) {

                console.log(
                    "Failed:",
                    err.statusCode,
                    sub.endpoint
                );

                
            }

        }

    } catch (error) {

        console.log(error);

    }

});