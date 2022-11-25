import { Router } from "express";
import { main } from "../util/sendemail.js";
//Database imports
import { db } from "../database/database.js"
import mysql from "mysql"


const router = Router()



//Sends ethereal email and sends a message to the user
router.post("/forgotpassword", (req, res) => {
    const email = req.body.forgotemail
    db.getConnection(async (err, connection) => {
        const sqlSearch = "Select * from user where email = ?"
        const search_query = mysql.format(sqlSearch, [email])

        await connection.query(search_query, async (err, result) => {
            console.log(result)
            connection.release()
            if (result.length != 0) {
                main(email)
                await router.get("/forgotpasswordapi", (req, res) => {
                    res.send({ sent: true })
                })
            }else{
                await router.get("/forgotpasswordapi", (req, res) => {
                    res.send({ sent: false })
                })
            }
            res.redirect("/forgotpassword")
        })
    })
})


export default router;