const db = require("../config/db");
const crypto = require("crypto");

class Post {

    async getAllEmployees(req, res, next){
        const sql = "SELECT * FROM emps";
        const [response] = await db.query(sql);
        
        res.send(response);

    }

    async getEmployee(req, res){
        const empID = req.params.id;

        const [responseName] = await db.query(`
            SELECT id, name, login, isWork from emps where id = ${empID};
        `)

        const [response] = await db.query(`
            SELECT tasks.id as "taskID", tasks.title, tasks.information, tasks_to_emps.status from tasks 
            JOIN tasks_to_emps ON taskID = tasks.id
            JOIN emps ON emps.id = employeeID
            WHERE employeeID = ${empID};
        `)

        const [responseCountAll] = await db.query(`
            SELECT COUNT(taskID) as 'countAll' from tasks_to_emps where employeeID = ${empID};
        `)

        const [responseCountComplete] = await db.query(`
            SELECT COUNT(taskID) as 'countComplete' from tasks_to_emps 
            LEFT JOIN tasks ON tasks.id = taskID  
            INNER JOIN emps ON emps.id = employeeID
            WHERE employeeID = ${empID} and tasks_to_emps.status = "complete";
        `)

        res.send({responseName, response, responseCountAll, responseCountComplete});
    }
    
    async setEmployee(req, res, next){
        const {body} = req;

        const loginHash = crypto.createHash("sha512").update(body.login).digest("hex");
        const passwordHash = crypto.createHash("sha512").update(body.password).digest("hex");

        if(body.name){
            const [response] = await db.query(`
                SELECT * FROM emps WHERE login = '${loginHash}';
            `);
            if(response.length === 1){
                res.send({
                    message: "Employee with the same name already exist",
                    code: 100
                })
            } else {
                    const sql = 
                    `INSERT INTO emps (name, login, password)
                     VALUES('${body.name}', '${loginHash}', '${passwordHash}');`
            
                    await db.query(sql);
                    res.send({
                        message: "Employee created successfully!",
                        code: 200
                    });
            }
        } else {
            const [response] = await db.query(`
                SELECT * FROM emps WHERE login = '${loginHash}' AND password = '${passwordHash}';
            `);
            if(response.length === 1){
                if(response[0].isWork === "true")
                    res.send({
                        message: "Welcome!",
                        id: response[0].id,
                        code: 100
                    })
                else
                    res.send({
                        message: "You are disable!",
                        id: response[0].id,
                        code: 400
                    })
            } else {
                res.send({
                    message: "login/password is wrong",
                    code: 300
                })
            }
        }
    }

    async editEmployee (req, res, next) {
        const {body} = req;
        const id = req.params.id

        await db.query(`
            UPDATE emps SET isWork = '${body.status}' WHERE id = ${id};
        `)

        res.send({
            message: "employee edited successfully!"
        })
    }
    
    async deleteEmployee (req, res, next){
        const empID = req.params.id;
    
        const sql = `DELETE FROM emps WHERE id = ${empID}`;
    
    
        const dataToSend = await db.query(sql);
    
        res.send(dataToSend);
    
    }

    async checkAuth (req, res) {
        const {body} = req;
        const loginHash = crypto.createHash("sha512").update(body.login);
        const passwordHash = crypto.createHash("sha512").update(body.password);

        const [response] = await db.query(`
            SELECT * FROM emps WHERE login = ${loginHash.digest("hex")} AND password = ${passwordHash.digest("hex")}
        `);

        console.log(response);

    }
    
    // DEALS
    
    
    async getAllDeals(req, res, next){
        
        const sql = `SELECT * FROM tasks`;
        const [response] = await db.query(sql);
    
        res.send(response);
    }

    async getDeal(req, res){
        const dealID = req.params.id;

        const [response] = await db.query(`
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

        switch(body.action){
            case "DEL_EMP": 
                await db.query(`
                DELETE FROM tasks_to_emps WHERE employeeID = ${body.employeeID} AND taskID = ${dealID};
                `);
                break;
            case "RECHOOSE_EMP": 
                    let [resPrev] = await db.query(
                        `SELECT employeeID FROM tasks_to_emps WHERE taskID = ${dealID}`);

                    resPrev = resPrev.map(item => item.employeeID)

                    const dataToSend = [...body.employeeID.filter(id => resPrev.indexOf(id) === -1)];
                    const dataToDelete = [...resPrev.filter(id => body.employeeID.indexOf(id) === -1)];
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
                            `DELETE FROM tasks_to_emps
                            WHERE employeeID = ${id} AND taskID = ${dealID};`
                        ); 

                });

                break;

            case "CHOOSE_DEAL": 
                await db.query(
                    `INSERT INTO tasks_to_emps (taskID, employeeID, status)
                    VALUES (${dealID}, ${body.employeeID}, '${body.status}');`
                ); 
                break;
            default:
                const sql = 
                `UPDATE tasks_to_emps 
                 SET status = '${body.status}' 
                 WHERE taskID = ${dealID} AND employeeID = ${body.employeeID};`;
                await db.query(sql); 
            break;
        }

        res.send({message: "ok"});
    }
    
    async deleteDeal(req, res, next){
    
        const dealID = req.params.id;
    
        const sql = `DELETE FROM tasks WHERE id = ${dealID}`;
    
        const dataToSend = await db.query(sql);
        await db.query(`DELETE FROM tasks_to_emps WHERE taskID = ${dealID};`)
    
        res.send(dataToSend);
    
    }
    
}

module.exports = new Post();

