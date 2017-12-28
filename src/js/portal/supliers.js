/**
 * My module:
 *  description about what it does
 */
X.sub("init", function() {
    var e = {};
    e.id = 1;
    e.code = "A02";
    e.supName = "大视界";
    e.representative = "李四";
    e.range = "服务行业";
    e.address = "北京朝阳";
    e.track = "12345678901";
    e.status = "草稿";

    X.post('/db/supliers', e);
});