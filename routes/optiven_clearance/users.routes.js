const express = require("express");
const router = express.Router();

// user routers

// post
module.exports = (Pool) => {
  router.post("/", async (req, res) => {
    try {
      const {
        first_name,
        middle_name,
        surname,
        user_email,
        user_role,
        user_contact,
        user_password,
        confirm_password,
      } = req.body;
      Pool.query(
        "INSERT INTO users( first_name, middle_name,surname,user_email, user_role, user_contact, user_password, confirm_password)VALUES(?,?,?,?,?,?,?,?)",
        [
          first_name,
          middle_name,
          surname,
          user_email,
          user_role,
          user_contact,
          user_password,
          confirm_password,
        ],
        (err, results) => {
          if (err) {
            console.error("error in adding user", err);
            res.status(500).json({
              message: "user not added",
            });
          } else {
            res.status(201).json({
              message: "User added Successfully",
            });
          }
        }
      );
    } catch (err) {
      console.error("Error in adding the user", err);
      res.status(500).json({
        message: "User not added",
      });
    }
  });

  // Get request
  router.get("/", (req, res) => {
    try {
      Pool.query("SELECT * FROM users", (err, results) => {
        if (err) throw err;
        res.status(200).json(results);
      });
    } catch (err) {
      console.error("Users can't be fetched", err);
      res.status(500).json({
        message: "Users not found",
      });
    }
  });
  //retrieve single user
  router.get("/:id", async (req, res) => {
    // Implementation for get by id
    const { id } = req.params;
    try {
      Pool.query(
        "SELECT  * FROM users WHERE user_id = ?",
        [id],
        (err, results) => {
          if (err) throw err;
          if (results.length > 0) {
            res.status(200).json(results[0]);
          } else {
            res.status(404).json({
              message: "User not found",
            });
          }
        }
      );
    } catch (error) {
      console.error("Error fetching data", error);
      res.status(500).json({
        message: "user not found",
      });
    }
  });
  //   update functionality
  router.patch("/:id", async (req, res) => {
    try {
      const {
        first_name,
        middle_name,
        surname,
        user_email,
        user_role,
        user_contact,
        user_password,
        confirm_password,
      } = req.body;
      const { id } = req.params;
      Pool.query(
        "UPDATE users SET first_name = ?, middle_name = ?,surname = ?,user_email = ?, user_role = ?, user_contact = ?, user_password = ?, confirm_password = ? WHERE user_id = ?",
        [
          first_name,
          middle_name,
          surname,
          user_email,
          user_role,
          user_contact,
          user_password,
          confirm_password,
          id,
        ],
        (err, results) => {
          if (err) throw err;
          if (results.affectedRows > 0) {
            res.status(200).json({
              message: "User Data updated Successfully",
            });
          } else {
            res.status(404).json({
              message: "User not found",
            });
          }
        }
      );
    } catch (err) {
      console.error("Error in updating", err);
      res.status(500).json({
        message: "User data not updated",
      });
    }
  });
//   delete functionality
router.delete('/:id',(req,res)=>{

    try{
        const{id} = req.params
        Pool.query(
            'DELETE FROM users WHERE user_id = ?',[id], (err,results) => {
                if(err) throw err
                if (results.affectedRows > 0){
                    res.status(200).json({
                        message:"User deleted Successfully"
                    })
                }else{
                    res.status(404).json({
                        message:"user not found"
                    })
                }


            }
        )

    }catch(error){
        console.error("User not found" ,error)
        res.status(500).json({
            message:"user not deleted"
        })

    }
})

  return router;
};
