define(['mui', 'bscroll'], function(mui, bscroll) {
    let page = 1;
    let BS = null;
    let [a, b] = [
        [],
        []
    ];
    let flag = false;
    let total = 0;
    let section = document.querySelectorAll('.main-scroll section');
    let pullUp = document.getElementById('pullUp');


    function init() {
        mui.init();
        // 获取商品列表数据
        getProduct(0, 4);
        // 初始化bScroll
        BS = new bscroll('.main', {
            probeType: 2
        });
        bindEvent();
    }
    // 绑定事件
    function bindEvent() {
        BS.on('scroll', function() {

            if (this.y < this.maxScrollY - 20) {
                flag = true;
                pullUp.innerHTML = "释放加载...";
            } else {
                flag = false;
                pullUp.innerHTML = "上拉加载";
            }
        });
        BS.on('scrollEnd', function() {
            if (flag) {
                console.log(total);
                if (page < total) {
                    page++;
                    let skip = (page - 1) * 4;
                    getProduct(skip, 4);
                } else {
                    pullUp.innerHTML = "没有更多数据了";
                }
            } else {

            }
        })
    }

    // 获取商品列表数据
    function getProduct(skip, limit) {
        mui.ajax('/getProduct', {
            type: 'post',
            data: {
                skip: skip,
                limit: limit
            },
            success: function(rs) {
                console.log(rs)
                total = rs.len;
                // 处理瀑布流数据
                render(waterFull(rs.data));
                BS.refresh();
            }
        })
    }
    // 渲染
    function render(data) {
        console.log(data)
        data.forEach((item, index) => {
            section[index].innerHTML = item.map(val => {
                return `<dl>
							<dt><img src="image/${val.img}" alt=""> </dt>
							<dd>${val.title}</dd>
							<dd>${val.detail}</dd>
						</dl>`;
            }).join('');
        });

    }
    // 处理瀑布流数据
    function waterFull(data) {
        data.forEach(item => {
            if (!a.length) {
                return a.push(item);
            } else if (!b.length) {
                return b.push(item);
            }
            if (a.reduce((s, v) => s + v.imgH, 0) > b.reduce((s, v) => s + v.imgH, 0)) {
                b.push(item);
            } else {
                a.push(item);
            }
        })
        return [a, b];
    }
    init();
});