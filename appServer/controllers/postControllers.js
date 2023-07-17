const db = require("../config/db");

class Post {

    async getAllEmployees(req, res, next){
        const sql = "SELECT * FROM emps";
        const [response, _] = await db.query(sql);
        
        res.send(response);
    }
    
    async setEmployee(req, res, next){
        const {body} = req;
    
        const sql = 
        `INSERT INTO emps (name, login, password)
         VALUES('${body.name}', '${body.login}', '${body.password}');`
    
    
        const dataToSend = await db.query(sql);
    
        res.send(dataToSend);
    }
    
    async deleteEmployee (req, res, next){
        const empID = req.params.id;
    
        const sql = `DELETE FROM emps WHERE id = ${empID}`;
    
    
        const dataToSend = await db.query(sql);
    
        res.send(dataToSend);
    
    }
    
    // DEALS
    
    
    async getAllDeals(req, res, next){
        
        // SELECT emps.id as 'employeeID', name, login, tasks.id as 'taskID', tasks.status, tasks.title, tasks.information FROM emps LEFT JOIN tasks ON emps.id = tasks.employeeID;

        const sql = "SELECT emps.id as 'employeeID', name, login as 'employee', tasks.id as 'id', tasks.status, tasks.title, tasks.information FROM emps  JOIN tasks ON emps.id = tasks.employeeID;";
        const [response, _] = await db.query(sql);
    
        res.send(response);
    }
    
    async setDeal(req, res, next) {
        const {body} = req;
    
        const sql = 
        `INSERT INTO tasks (title, status, information)
         VALUES('${body.title}', 'new', '${body.information}');`
    
        const dataToSend = await db.query(sql);
    
        res.send(dataToSend);
    }
    
    async editDeal(req, res, next){
        const {body} = req
        const dealID = req.params.id;
    
        const sql = 
        `UPDATE tasks 
         SET status = '${body.status}', title = '${body.title}', employeeID = ${body.employeeID === "nobody" ? null : `'${body.employeeID}'`} 
         WHERE id = ${dealID};`;
    
        const dataToSend = await db.query(sql);
    
        res.send(dataToSend);
    }
    
    async deleteDeal(req, res, next){
    
        const dealID = req.params.id;
    
        const sql = `DELETE FROM tasks WHERE id = ${dealID}`;
    
        const dataToSend = await db.query(sql);
    
        res.send(dataToSend);
    
    }
    
}

module.exports = new Post();

