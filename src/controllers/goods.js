let pool = require('../../scripts/mysql')

exports.getGoodLists = (req, res) => {
    let type = req.body.type
    if (type == "") {type = 0}
    let sql = `select * from m_goods where type ${type}`
}
