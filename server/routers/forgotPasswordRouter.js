import { Router } from "express";
import { main } from "../util/sendemail.js";
//Database imports
import { db } from "../database/database.js"
import mysql from "mysql"


const router = Router()


//Sends ethereal email and sends a message to the user
//NOGET JEG IKKE KAN FÅ TIL AT VIRKE:
//If/else statement går ind i enten if eller else og kører koden første gang jeg poster.
//Derefter kan jeg godt komme ind i if/else, men kun til console.log.
router.post("/forgotpassword", (req, res) => {
    const email = req.body.forgotemail
    db.getConnection(async (err, connection) => {
        const sqlSearch = "Select * from user where email = ?"
        const search_query = mysql.format(sqlSearch, [email])

        await connection.query(search_query, async (err, result) => {
            console.log(result)
            connection.release()
            if (result.length != 0) {
                console.log("True")
                main(email)
                await router.get("/api/forgotpassword", (req, res) => {
                    console.log("Inside true")
                    res.send({ sent: true })
                })
            }else{
                console.log("False")
                await router.get("/api/forgotpassword", (req, res) => {
                    console.log("inside false")
                    res.send({ sent: false })
                })
            }
            res.redirect("/forgotpassword")
        })
    })
})

//Sends ethereal email and sends a message to the user
// router.post("/forgotpassword", (req, res) => {
//     const email = req.body.forgotemail
//     db.getConnection(async (err, connection) => {
//         const sqlSearch = "Select * from user where email = ?"
//         const search_query = mysql.format(sqlSearch, [email])

//         await connection.query(search_query, async (err, result) => {
//             console.log(result)
//             connection.release()
//             if (result.length !== 0) {
//                 main(email)
//                 await router.get("/api/forgotpassword", (req, res) => {
//                 return res.write(JSON.stringify({ sent: true }), "utf8", ()=> {
//                     console.log("we are in true")
//                     res.end()
//                 }) 
//             })
//             }
//             if(result === 0){
//                 await router.get("/api/forgotpassword", (req, res) => {
//                     return res.write(JSON.stringify({ sent: false }), "utf8", ()=> {
//                         console.log("we are in false")
//                         res.end()
//                     })
//                 })
//             }
//             res.redirect("/forgotpassword")
//         })
//     })
// })

export default router;