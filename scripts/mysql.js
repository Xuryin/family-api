let mysql = require('mysql');
let dbconfig = require('../config/database');

let pool = mysql.createPool(dbconfig.connection);//连接池

exports.getConnection = (sql,params,callback)=>{
    pool.getConnection((err,conn)=>{
        if (err){
            throw err
        }
        conn.query(sql,params,callback)
    })
}
