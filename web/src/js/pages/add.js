define(['mui'], function(mui) {
    let btn = document.getElementById('btn');
    let shop = document.getElementById('shop');
    let price = document.getElementById('price');

    function init() {
        mui.init();
        btn.addEventListener('tap', addFn);
        let idx = Math.floor(Math.random() * 4);
        console.log(idx);
    }

    function addFn() {
        let shopVal = shop.value.trim();
        let priceVal = price.value.trim();
        let arr = ["pic5.png", "pic1.png", "pic4.png", "pic6.png"];
        let num = [171, 170, 135, 153];
        let idx = Math.floor(Math.random() * 4);
        mui.ajax('/addProduct', {
            type: 'post',
            data: {
                "img": arr[idx],
                "title": shopVal,
                "detail": "3D纯手工",
                "table": "标签1",
                "classify": "品类1",
                "price": priceVal,
                "fukuan": "幅宽2",
                "imgH": num[idx] * 1
            },
            success: function(rs) {
                console.log(rs);
                if (rs.code == 1) {
                    alert("添加成功！");
                    location.href = 'index.html';
                }
            }
        })
    }
    init();
});