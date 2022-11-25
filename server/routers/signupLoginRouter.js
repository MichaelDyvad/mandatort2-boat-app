import { Router } from "express";
//Database imports

import { db } from "../database/database.js"
import mysql from "mysql"
//Password encryptions
import bcrypt from "bcrypt"
const router = Router()

//Login for both USER and ADMIN. The ADMIN will be redirected to the admin, while USER will be redirected to home.
router.post("/login", (req, res) => {
  const user = req.body.email
  const password = req.body.password
  
  db.getConnection(async (err, connection) => {
    if (err) throw (err)
    const sqlSearch = "Select * from user where email = ?"
    const searchQuery = mysql.format(sqlSearch, [user])

    await connection.query(searchQuery, async (err, result) => {
      connection.release()
      if (result.length === 0) {
        res.redirect("/login")
      } else {
        if (err) throw (err)
        else {
          const hashedPassword = result[0].password

          //get the hashedPassword from result
          if (await bcrypt.compare(password, hashedPassword)) {

            const sessionUserRole = result[0].role
            console.log("here")
            req.session.userRole = sessionUserRole
            req.session.email = user
            res.redirect("/admin")
          }
          else {
            res.redirect("/admin")
          }
        }
      }

    })
  })
})

//Create a user with the role "USER".
router.post("/signup", async (req, res) => {
  const user = req.body.email
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const role = "USER"

  db.getConnection(async (err, connection) => {
    if (err) throw (err)
    const sqlSearch = "SELECT * FROM user WHERE email = ?"
    const search_query = mysql.format(sqlSearch, [user])
    const sqlInsert = "INSERT INTO user VALUES (0,?,?,?)"
    const insert_query = mysql.format(sqlInsert, [user, hashedPassword, role])

    await connection.query(search_query, async (err, result) => {
      if (result.length != 0) {
        connection.release()
        console.log("------> User already exists")
        res.redirect("/signup")
      }
      else {
        await connection.query(insert_query, (err, result) => {
          connection.release()

          //Another connection.query to find the new inserted role on the result. 
          connection.query(search_query, async (err, result) => {
            const sessionUserRole = result[0].role


            if (err) throw (err)
            console.log("--------> Created new User")
            //Here we put the user in session with the sessionUserRole
            req.session.userRole = sessionUserRole
            res.redirect("/home")
          })
        })
      }
    })
  })
})

//Creates a new admin. Only an admin can create another admin
router.post("/createnewadmin", async (req, res) => {
  const user = req.body.adminemail
  const hashedPassword = await bcrypt.hash(req.body.adminpassword, 10);
  const role = "ADMIN"
  console.log(user)
  console.log(hashedPassword)

  db.getConnection(async (err, connection) => {
    if (err) throw (err)
    const sqlSearch = "SELECT * FROM user WHERE email = ?"
    const search_query = mysql.format(sqlSearch, [user])
    const sqlInsert = "INSERT INTO user VALUES (0,?,?,?)"
    const insert_query = mysql.format(sqlInsert, [user, hashedPassword, role])

    await connection.query(search_query, async (err, result) => {
      if (result.length != 0) {
        connection.release()
        console.log("------> User already exists")
        res.redirect("/createnewadmin")
      }
      else {
        await connection.query(insert_query, (err, result) => {
          connection.release()
          res.redirect("/admin")
        })
      }
    })
  })
})

export default router;