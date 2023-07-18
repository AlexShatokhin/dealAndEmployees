const db = require("../config/db");

class Post {

    async getAllEmployees(req, res, next){
        const sql = "SELECT * FROM emps";
        const [response, _] = await db.query(sql);
        
        res.send(response);
    }

    async getEmployee(req, res){
        const empID = req.params.id;

        const [responseName, _] = await db.query(`
        SELECT id, name, login from emps where id = ${empID};
        `)

        const [response, __] = await db.query(`
            SELECT tasks.id as "taskID", tasks.title, tasks.status, tasks.information from tasks_to_emps 
            LEFT JOIN tasks ON tasks.id = taskID  
            INNER JOIN emps ON emps.id = employeeID
            WHERE employeeID = ${empID};
        `)

        const [responseCountAll, ___] = await db.query(`
            SELECT COUNT(taskID) as 'countAll' from tasks_to_emps where employeeID = ${empID};
        `)

        const [responseCountComplete, ____] = await db.query(`
            SELECT COUNT(taskID) as 'countComplete' from tasks_to_emps 
            LEFT JOIN tasks ON tasks.id = taskID  
            INNER JOIN emps ON emps.id = employeeID
            WHERE employeeID = ${empID} and tasks.status = "complete";
        `)

        res.send({responseName, response, responseCountAll, responseCountComplete});
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
        
        // SELECT emps.id as 'employeeID', name, login as 'employee', tasks.id as 'id', tasks.status, tasks.title, tasks.information FROM emps  JOIN tasks ON emps.id = tasks.employeeID;

        const sql = `
        SELECT * FROM tasks
        `;
        const [response, _] = await db.query(sql);
    
        res.send(response);
    }

    async getDeal(req, res){
        const dealID = req.params.id;

        const [response, _] = await db.query(`
            SELECT tasks.id as "taskID", tasks.title, tasks.information, emps.id, emps.login from tasks_to_emps 
            LEFT JOIN tasks ON tasks.id = taskID  
            INNER JOIN emps ON emps.id = employeeID
            WHERE taskID = ${dealID};
        `)

        res.send(response);
    }
    
    async setDeal(req, res, next) {
        const {body} = req;
    
        const sql = 
        `INSERT INTO tasks (title, status, information)
         VALUES('${body.title}', 'new', '${body.information}');
        `
    
        const dataToSend = await db.query(sql);
    
        res.send(dataToSend);
    }
    
    async editDeal(req, res, next){
        const {body} = req
        const dealID = req.params.id;
    
        const sql = 
        `UPDATE tasks 
         SET status = '${body.status}' 
         WHERE id = ${dealID};
         `;
    
        const dataToSend = await db.query(sql);
        if(!body.employeeID.length){
            await db.query(       
            ` DELETE FROM tasks_to_emps WHERE taskID = ${dealID}; `
            );
        } else {
            body.employeeID.forEach(async id => {
                await  await db.query(
                    `
                    INSERT INTO tasks_to_emps (taskID, employeeID)
                    VALUES (${dealID}, ${id});
                    `
                );    
            })
        }
                


    
        res.send(dataToSend);
    }
    
    async deleteDeal(req, res, next){
    
        const dealID = req.params.id;
    
        const sql = `DELETE FROM tasks WHERE id = ${dealID}`;
    
        const dataToSend = await db.query(sql);
        await db.query(
            `
            DELETE FROM tasks_to_emps WHERE taskID = ${dealID};
            `
        )
    
        res.send(dataToSend);
    
    }
    
}

module.exports = new Post();

