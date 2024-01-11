const express = require("express");
const router = express.Router();


module.exports = (Pool) => {
  router.get("/", async (req, res) => {
    try {
       Pool.query("SELECT * FROM employeeData",(err,results)=>{
        if (err) throw err
        res.status(200).json(results);
       }) 
      
    } catch (err) {
      console.error("Error fetching data:", err);
      res.status(500).json({
        message: "An error occurred while fetching data",
      });
    }
  });

  router.post("/", async (req, res) => {
    try {
      const {
        employee_name,
        employee_email,
        employee_number,
        employee_phone,
        employee_department,

       
      } = req.body;
      if(!employee_email || !employee_name || !employee_phone   || !employee_department || !employee_number){
        return res.status(404).json({
          message:"All field are required"
        })

      }

       Pool.query(
        "INSERT INTO employeeData (employee_name, employee_email,employee_number, employee_phone, employee_department) VALUES (?, ?, ?, ?,?)",
        [employee_name, employee_email,employee_number, employee_phone, employee_department]
      );

      res.status(201).json({
        message: "Data submitted successfully",
      });
    } catch (err) {
      console.error("Error submitting data:", err);
      res.status(500).json({
        message: "Data not submitted",
      });
    }
  });

  router.put("/:id", async (req, res) => {
    try {
      const {id} = req.params;
      const {
        employee_name,
        employee_email,
        employee_number,
        employee_phone,
        employee_department,
        status, // This can be updated dynamically
      } = req.body;
  
      if (!status) {
        return res.status(400).json({
          message: "Status field is required for updating",
        });
      }
  
      Pool.query(
        "UPDATE employeeData SET employee_name=?, employee_email=?, employee_number=?, employee_phone=?, employee_department=?, status=? WHERE employee_id=?",
        [employee_name, employee_email, employee_number, employee_phone, employee_department, status,id],
        (err, results) => {
          if (err) throw err;
          res.status(200).json({
            message: "Data updated successfully",
          });
        }
      );
    } catch (err) {
      console.error("Error updating data:", err);
      res.status(500).json({
        message: "Data not updated",
      });
    }
  });
  

  router.delete("/:id", (req, res) => {
    // Implementation for delete
  });

  return router;
};
