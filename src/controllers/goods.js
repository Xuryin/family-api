let pool = require('../../scripts/mysql')

exports.getGoodLists = (req, res) => {
    let type = req.body.type
    let list = []
    if (!type) {
        let sql = `select * from m_goods`
        pool.getConnection(sql, [], (err, results) => {
            if (err) throw err
            list = results
            res.send({status: 1, data: list, msg: 'success'})
        })
    } else {
        let sql = `select * from m_goods where type = ${type}`
        pool.getConnection(sql, [type], (err, results) => {
            if (err) throw err
            list = results
            res.send({status: 1, data: list, msg: 'success'})
        })
    }
}

exports.getGoodDetails = (req, res) => {
    let id = req.body.id
    console.log(id)
    let list = {}
    if (id) {
        let sql = `select * from m_goods where id = ${id}`
        pool.getConnection(sql, [id], (err, results) => {
            if (err) throw err
            list = results
            res.send({status: 1, data: list, msg: 'success'})
        })
    } else {
        res.send({status: 0, data: [], msg: '商品id不正确'})
    }
}
