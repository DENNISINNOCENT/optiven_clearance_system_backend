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
        employee_phone,
        employee_department,
      } = req.body;
      if(!employee_email || !employee_name || !employee_phone   || !employee_department){
        return res.status(404).json({
          message:"All field are required"
        })

      }

       Pool.query(
        "INSERT INTO employeeData (employee_name, employee_email, employee_phone, employee_department) VALUES (?, ?, ?, ?)",
        [employee_name, employee_email, employee_phone, employee_department]
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

  router.put("/:id", (req, res) => {
    // Implementation for update
  });

  router.delete("/:id", (req, res) => {
    // Implementation for delete
  });

  return router;
};
