var express = require('express');
var router = express.Router();
const Mongo = require('mongodb-curd');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});
// 查询商品列表
router.post('/getProduct', function(req, res, next) {
    let { skip, limit } = req.body;
    if (!skip || !limit) {
        return res.send({ code: 2, msg: "参数不完整" });
    }
    Mongo.find('month3', 'product', function(result) {
        if (result) {
            let len = Math.ceil(result.length / limit);
            Mongo.find('month3', 'product', function(rs) {
                if (rs) {
                    res.send({ code: 1, data: rs, len: len })
                } else {
                    res.send({ code: 0, msg: "error" })
                }
            }, {
                skip: skip,
                limit: limit
            })
        } else {
            res.send({ code: 0, msg: "查询失败" })
        }
    })
});
router.post('/addProduct', function(req, res, next) {
    Mongo.insert('month3', 'product', req.body, function(result) {
        if (result) {
            res.send({ code: 1, msg: 'success', data: result });
        } else {
            res.send({ code: 0, msg: "error" })
        }
    })
});
module.exports = router;