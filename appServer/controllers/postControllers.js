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
            SELECT tasks.id as "taskID", tasks.title, tasks.information, tasks_to_emps.status from tasks 
            JOIN tasks_to_emps ON taskID = tasks.id
            JOIN emps ON emps.id = employeeID
            WHERE employeeID = ${empID};
        `)

        const [responseCountAll, ___] = await db.query(`
            SELECT COUNT(taskID) as 'countAll' from tasks_to_emps where employeeID = ${empID};
        `)

        const [responseCountComplete, ____] = await db.query(`
            SELECT COUNT(taskID) as 'countComplete' from tasks_to_emps 
            LEFT JOIN tasks ON tasks.id = taskID  
            INNER JOIN emps ON emps.id = employeeID
            WHERE employeeID = ${empID} and tasks_to_emps.status = "complete";
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
        `INSERT INTO tasks (title, information)
         VALUES('${body.title}', '${body.information}');
        `
    
        const dataToSend = await db.query(sql);
    
        res.send(dataToSend);
    }
    
    async editDeal(req, res, next){
        const {body} = req
        const dealID = req.params.id;
        let dataToSend;

        // if(body.status && body.employeeID.length){
        //     const sql = 
        //     `UPDATE tasks_to_emps 
        //      SET status = '${body.status}' 
        //      WHERE taskID = ${dealID} AND employeeID = ${body.employeeID};
        //      `;
        //     dataToSend = await db.query(sql);
        // }

    


        switch(body.action){
            case "DEL_EMP": 
                await db.query(`
                DELETE FROM tasks_to_emps WHERE employeeID = ${body.employeeID} AND taskID = ${dealID};
                `);
                break;
            case "RECHOOSE_EMP": 
                // if(!body.employeeID){
                //     await db.query(       
                //     ` DELETE FROM tasks_to_emps WHERE taskID = ${dealID}; `
                //     );
                    let [resPrev,_] = await db.query(
                        `SELECT employeeID FROM tasks_to_emps WHERE taskID = ${dealID}`);

                    resPrev = resPrev.map(item => item.employeeID)

                    const dataToSend = [...body.employeeID.filter(id => resPrev.indexOf(id) == -1)];
                    const dataToDelete = [...resPrev.filter(id => body.employeeID.indexOf(id) == -1)];
                    dataToSend.forEach(async id => {
                            await db.query(
                                `
                                INSERT INTO tasks_to_emps (taskID, employeeID, status)
                                VALUES (${dealID}, ${id}, "work");
                                `
                            ); 
                    });

                    dataToDelete.forEach(async id => {

                        await db.query(
                            `
                            DELETE FROM tasks_to_emps
                            WHERE employeeID = ${id} AND taskID = ${dealID};
                            `
                        ); 

                });

                break;

            case "CHOOSE_DEAL": 
                await db.query(
                    `
                    INSERT INTO tasks_to_emps (taskID, employeeID, status)
                    VALUES (${dealID}, ${body.employeeID}, '${body.status}');
                    `
                ); 
                break;
            default:
                const sql = 
                `UPDATE tasks_to_emps 
                 SET status = '${body.status}' 
                 WHERE taskID = ${dealID} AND employeeID = ${body.employeeID};
                 `;
                await db.query(sql); 
            break;
        }

        res.send({message: "ok"});
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

