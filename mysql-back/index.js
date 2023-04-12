const express = require("express");

const bodyParser = require("body-parser");

const sqlQuery = require("./msql");

const jsonParser = bodyParser.json();

const urlencodedParser = bodyParser.urlencoded({ extended: false });

const cors = require("cors");

const app = express();

app.use(cors());

//新增管理员用户
app.post("/settings/admin", jsonParser, async (req, res) => {
  let sql = `select * from admin where ID = ? or username = ?`;
  let arr = [];
  arr[0] = req.body.ID;
  arr[1] = req.body.username;
  arr[2] = req.body.passwd;
  arr[3] = req.body.nickname;
  let arr1 = [];
  arr1[0] = arr[0];
  arr1[1] = arr[1];
  const result = await sqlQuery(sql, arr1);
  if (result.length > 0) {
    res.json({
      code: 1000,
    });
  } else {
    const sql1 = `INSERT INTO admin (ID, username, passwd, nickname, position, token)
                values(?, ?,?,?,'管理员', 'uesr-admin-123')`;
    const result1 = await sqlQuery(sql1, arr);
    console.log(result1);
    res.json(result1);
  }
});
//提交编辑管理员菜单
app.put("/settings/admin/:id", jsonParser, async (req, res) => {
  let sql = `select * from admin where ID != ? and username = ?`;
  let arr = [];
  arr[0] = req.body.ID;
  arr[1] = req.body.username;
  arr[2] = req.body.passwd;
  arr[3] = req.body.nickname;
  arr[4] = req.params.id;
  let arr1 = [];
  arr1[0] = arr[0];
  arr1[1] = arr[1];
  const result = await sqlQuery(sql, arr1);
  if (result.length > 0) {
    res.json({
      code: 1000,
      message: "输入的管理员账号重复，修改失败，请重新修改！",
    });
  } else {
    const sql1 = `update admin set ID = ?, username = ?, passwd = ?, nickname = ? where ID = ?`;
    const result1 = await sqlQuery(sql1, arr);
    res.json(result1);
  }
});

//删除
app.delete("/setting/admin/:id", async (req, res) => {
  const sql = `delete from admin where id = ${req.params.id}`;
  await sqlQuery(sql);
  res.end();
});
//加载管理员表单
app.get("/settings", async (req, res) => {
  const itemPerPage = req.query.limit;
  const currentPage = req.query.page;
  const sql3 = `select count(ID) as pageNum from admin`;
  const sql4 = `select count(ID) as pageNum from admin where nickname = ?`;
  const sql5 = `select count(ID) as pageNum from admin where username = ?`;
  const sql =
    `select ID,username,nickname from admin 
              group by ID 
              order by ID 
              limit ` +
    (currentPage - 1) * itemPerPage +
    "," +
    itemPerPage;
  //按姓名查找
  const sql1 =
    `select ID,username,nickname from admin 
  where nickname = ?
  group by ID 
  order by ID
  limit ` +
    (currentPage - 1) * itemPerPage +
    "," +
    itemPerPage;
  //按用户名查找
  const sql2 =
    `select ID,username,nickname from admin 
where username = ?
    group by ID 
      order by ID 
      limit ` +
    (currentPage - 1) * itemPerPage +
    "," +
    itemPerPage;

  let result, result1;
  if (req.query.nickname) {
    result = await sqlQuery(sql1, req.query.nickname);
    result1 = await sqlQuery(sql4, req.query.nickname);
  } else if (req.query.username) {
    result = await sqlQuery(sql2, req.query.username);
    result1 = await sqlQuery(sql5, req.query.username);
  } else {
    result = await sqlQuery(sql);
    result1 = await sqlQuery(sql3);
  }
  const pageAll = Math.ceil(result1[0].pageNum / itemPerPage);
  res.json({
    data: Array.from(result),
    pageAll,
  });
});

//加载编辑菜单
app.get("/settings/:id/edit", async (req, res) => {
  const sql = `select * from admin where admin.ID = ${req.params.id}`;
  const result = await sqlQuery(sql);
  res.json(result);
});

//登陆界面
app.post("/login", jsonParser, async (req, res) => {
  let sql = `select * from admin where username = ? and passwd = ? `;
  let arr = [];
  arr[0] = req.body.user;
  arr[1] = req.body.password;
  let result = await sqlQuery(sql, arr);
  console.log(result);
  if (result.length > 0) {
    res.json({
      message: "登录成功！",
      code: 1000,
      token: result[0].token,
    });
  } else {
    res.json({
      message: "账户或密码错误！",
      code: 2000,
    });
  }
});

//加载订单列表
app.get("/order", async (req, res) => {
  const itemPerPage = req.query.limit;
  const currentPage = req.query.page;
  const sql1 = `select count(订单编号) as pageNum from orderlist`;
  const sql2 = `select count(a.订单编号) as pageNum
  from orderlist as a left join goodsinfo as b
    on a.商品编号 = b.商品编号
    left join customerinfo as c
      on a.客户编号 = c.客户编号
      left join providerinfo as d
        on b.商品编号 = d.商品编号
        where b.商品名称 = ?`;
  const sql3 = `select count(订单编号) as pageNum from orderlist where 收货人 = ?`;
  const sql =
    `select b.商品名称, a.收款, d.公司名称 as 品牌, a.收货人, a.收货地址,a.订单编号
  from orderlist as a left join goodsinfo as b
    on a.商品编号 = b.商品编号
    left join customerinfo as c
      on a.客户编号 = c.客户编号
      left join providerinfo as d
        on b.商品编号 = d.商品编号
          group by a.订单编号 
          order by a.订单编号 
          limit ` +
    (currentPage - 1) * itemPerPage +
    "," +
    itemPerPage;
  //按商品名称查找
  const sql4 =
    `select b.商品名称, a.收款, d.公司名称 as 品牌, a.收货人, a.收货地址,a.订单编号
from orderlist as a left join goodsinfo as b
  on a.商品编号 = b.商品编号
  left join customerinfo as c
    on a.客户编号 = c.客户编号
    left join providerinfo as d
      on b.商品编号 = d.商品编号
      where b.商品名称 = ?
        group by a.订单编号
        order by a.订单编号
        limit ` +
    (currentPage - 1) * itemPerPage +
    "," +
    itemPerPage;
  //按收货人查找
  const sql5 =
    `select b.商品名称, a.收款, d.公司名称 as 品牌, a.收货人, a.收货地址,a.订单编号
  from orderlist as a left join goodsinfo as b
    on a.商品编号 = b.商品编号
    left join customerinfo as c
      on a.客户编号 = c.客户编号
      left join providerinfo as d
        on b.商品编号 = d.商品编号
        where a.收货人 = ?
          group by a.订单编号
          order by a.订单编号 
          limit ` +
    (currentPage - 1) * itemPerPage +
    "," +
    itemPerPage;

  let result, result1;
  if (req.query.商品名称) {
    result = await sqlQuery(sql4, req.query.商品名称);
    result1 = await sqlQuery(sql2, req.query.商品名称);
  } else if (req.query.收货人) {
    result = await sqlQuery(sql5, req.query.收货人);
    result1 = await sqlQuery(sql3, req.query.收货人);
  } else {
    result = await sqlQuery(sql);
    result1 = await sqlQuery(sql1);
  }
  const pageAll = Math.ceil(result1[0].pageNum / itemPerPage);
  console.log(result);
  console.log(result1[0].pageNum);
  res.json({
    data: Array.from(result),
    pageAll,
  });
});

//新增订单
app.post("/order/admin", jsonParser, async (req, res) => {
  let sql = `select 客户编号 from customerinfo where 电话号码 = ?`;
  const result = await sqlQuery(sql, req.body.电话号码);
  let arr = [];
  if (result.length > 0) {
    arr[0] = req.body.订单编号;
    arr[1] = req.body.商品编号;
    arr[2] = result[0].客户编号;
    arr[3] = req.body.收款;
    arr[4] = req.body.收货人;
    arr[5] = req.body.收货地址;
    const sql1 = `INSERT INTO orderlist (订单编号, 商品编号, 客户编号, 收款, 收货人, 收货地址)
    values(?, ?,?,?, ?, ?)`;
    const result1 = await sqlQuery(sql1, arr);
    res.json(result1);
  } else {
    res.json({
      code: 1000,
      message: "未开户或电话号码有误！",
    });
  }
});
//删除订单
app.delete("/order/:id", async (req, res) => {
  const sql = `delete from orderlist where 订单编号 = ${req.params.id}`;
  await sqlQuery(sql);
  res.end();
});

//提交编辑管理员菜单
app.put("/order/admin/:id", jsonParser, async (req, res) => {
  let arr = [];
  arr[0] = req.body.收款;
  arr[1] = req.body.收货人;
  arr[2] = req.params.id;
  const sql1 = `update orderlist set 收款 = ?, 收货人 = ? where 订单编号 = ?`;
  const result1 = await sqlQuery(sql1, arr);
  res.json(result1);
});

//加载编辑菜单
app.get("/order/:id/edit", async (req, res) => {
  const sql = `select b.商品名称, a.收款, d.公司名称 as 品牌, a.收货人, a.收货地址, a.订单编号
    from orderlist as a left join goodsinfo as b
      on a.商品编号 = b.商品编号
      left join customerinfo as c
        on a.客户编号 = c.客户编号
        left join providerinfo as d
          on b.商品编号 = d.商品编号
          where a.订单编号 = ?`;
  const result = await sqlQuery(sql, req.params.id);
  res.json(result);
});

//加载客户信息表单
app.get("/customer", async (req, res) => {
  const itemPerPage = req.query.limit;
  const currentPage = req.query.page;
  const sql3 = `select count(客户编号) as pageNum from customerinfo`;
  const sql4 = `select count(客户编号) as pageNum from customerinfo where 客户编号 = ?`;
  const sql5 = `select count(客户编号) as pageNum from customerinfo where 客户姓名 = ?`;
  const sql =
    `select distinct a.客户编号, a.客户姓名, a.性别, a.电话号码, sum(b.收款) as 总消费, 
    case when sum(b.收款) is null then '无'
      when sum(b.收款)<100 then '黑铁'
      when sum(b.收款)>=100 and sum(b.收款) < 1000 then '白银'
      when sum(b.收款)>=1000 and sum(b.收款) < 10000 then '黄金' 
      when sum(b.收款)>=10000 and sum(b.收款) < 100000 then '铂金'
      else '钻石'
      end as 星级
          from customerinfo as a left join orderlist as b
          on a.客户编号 = b.客户编号
                  group by b.客户编号 
                  order by b.客户编号 
              limit ` +
    (currentPage - 1) * itemPerPage +
    "," +
    itemPerPage;
  //按客户编号查找
  const sql1 =
    `select distinct a.客户编号, a.客户姓名, a.性别, a.电话号码, sum(b.收款) as 总消费, 
    case when sum(b.收款) is null then '无'
      when sum(b.收款)<100 then '黑铁'
      when sum(b.收款)>=100 and sum(b.收款) < 1000 then '白银'
      when sum(b.收款)>=1000 and sum(b.收款) < 10000 then '黄金' 
      when sum(b.收款)>=10000 and sum(b.收款) < 100000 then '铂金'
      else '钻石'
      end as 星级
          from customerinfo as a left join orderlist as b
          on a.客户编号 = b.客户编号
          where a.客户编号 = ?
                  group by b.客户编号 
                  order by b.客户编号 
  limit ` +
    (currentPage - 1) * itemPerPage +
    "," +
    itemPerPage;
  //按客户姓名查找
  const sql2 =
    `select distinct a.客户编号, a.客户姓名, a.性别, a.电话号码, sum(b.收款) as 总消费, 
    case when sum(b.收款) is null then '无'
      when sum(b.收款)<100 then '黑铁'
      when sum(b.收款)>=100 and sum(b.收款) < 1000 then '白银'
      when sum(b.收款)>=1000 and sum(b.收款) < 10000 then '黄金' 
      when sum(b.收款)>=10000 and sum(b.收款) < 100000 then '铂金'
      else '钻石'
      end as 星级
          from customerinfo as a left join orderlist as b
          on a.客户编号 = b.客户编号
          where a.客户姓名 = ?
                  group by b.客户编号 
                  order by b.客户编号 
      limit ` +
    (currentPage - 1) * itemPerPage +
    "," +
    itemPerPage;

  let result, result1;
  if (req.query.客户编号) {
    result = await sqlQuery(sql1, req.query.客户编号);
    result1 = await sqlQuery(sql4, req.query.客户编号);
  } else if (req.query.客户姓名) {
    result = await sqlQuery(sql2, req.query.客户姓名);
    result1 = await sqlQuery(sql5, req.query.客户姓名);
  } else {
    result = await sqlQuery(sql);
    result1 = await sqlQuery(sql3);
  }
  const pageAll = Math.ceil(result1[0].pageNum / itemPerPage);
  res.json({
    data: Array.from(result),
    pageAll,
  });
});
//新增客户
app.post("/customer/admin", jsonParser, async (req, res) => {
  let sql = `select * from customerinfo where 客户编号 = ? `;
  let arr = [];
  arr[0] = req.body.客户编号;
  arr[1] = req.body.客户姓名;
  arr[2] = req.body.性别;
  arr[3] = req.body.电话号码;
  const result = await sqlQuery(sql, arr[0]);
  if (result.length > 0) {
    res.json({
      code: 1000,
    });
  } else {
    const sql1 = `INSERT INTO customerinfo (客户编号, 客户姓名, 性别, 电话号码)
                values(?, ?,?,?)`;
    const result1 = await sqlQuery(sql1, arr);
    console.log(result1);
    res.json(result1);
  }
});

//提交编辑客户信息
app.put("/customer/admin/:id", jsonParser, async (req, res) => {
  let arr = [];
  arr[0] = req.body.客户编号;
  arr[1] = req.body.客户姓名;
  arr[2] = req.body.性别;
  arr[3] = req.body.电话号码;
  arr[4] = req.params.id;
  const sql1 = `update customerinfo set 客户编号 = ?, 客户姓名 = ?, 性别 = ?, 电话号码 = ? where 客户编号 = ?`;
  const result1 = await sqlQuery(sql1, arr);
  res.json(result1);
});

//加载编辑菜单
app.get("/customer/:id/edit", async (req, res) => {
  const sql = `select * from customerinfo where customerinfo.客户编号 = ${req.params.id}`;
  const result = await sqlQuery(sql);
  res.json(result);
});

//删除
app.delete("/customer/admin/:id", async (req, res) => {
  const sql = `delete from customerinfo where 客户编号 = ${req.params.id}`;
  await sqlQuery(sql);
  res.end();
});

//加载商品列表
app.get("/goods", async (req, res) => {
  const itemPerPage = req.query.limit;
  const currentPage = req.query.page;
  const sql3 = `select count(商品编号) as pageNum from goodsinfo`;
  const sql4 = `select count(商品编号) as pageNum from goodsinfo where 商品编号 = ?`;
  const sql5 = `select count(商品编号) as pageNum from goodsinfo where 商品名称 = ?`;
  const sql =
    `select a.商品编号, a.商品名称, a.出厂年份, a.价格, b.公司名称 as 品牌, b.供应商编号, b.公司地址, b.公司电话, b.公司联系人
     from  goodsinfo as a left join providerinfo as b
     on a.商品编号 = b.商品编号
              group by a.商品编号 
              order by a.商品编号 
              limit ` +
    (currentPage - 1) * itemPerPage +
    "," +
    itemPerPage;
  //按商品编号查找
  const sql1 =
    `select a.商品编号, a.商品名称, a.出厂年份, a.价格, b.公司名称 as 品牌, b.供应商编号, b.公司地址, b.公司电话, b.公司联系人
    from  goodsinfo as a left join providerinfo as b
    on a.商品编号 = b.商品编号
    where a.商品编号 = ?
             group by a.商品编号 
             order by a.商品编号 
  limit ` +
    (currentPage - 1) * itemPerPage +
    "," +
    itemPerPage;
  //按商品名称查找
  const sql2 =
    `select a.商品编号, a.商品名称, a.出厂年份, a.价格, b.公司名称 as 品牌, b.供应商编号, b.公司地址, b.公司电话, b.公司联系人
    from  goodsinfo as a left join providerinfo as b
    on a.商品编号 = b.商品编号
    where a.商品名称 = ?
             group by a.商品编号 
             order by a.商品编号 
      limit ` +
    (currentPage - 1) * itemPerPage +
    "," +
    itemPerPage;

  let result, result1;
  if (req.query.商品编号) {
    result = await sqlQuery(sql1, req.query.商品编号);
    result1 = await sqlQuery(sql4, req.query.商品编号);
  } else if (req.query.商品名称) {
    result = await sqlQuery(sql2, req.query.商品名称);
    result1 = await sqlQuery(sql5, req.query.商品名称);
  } else {
    result = await sqlQuery(sql);
    result1 = await sqlQuery(sql3);
  }
  const pageAll = Math.ceil(result1[0].pageNum / itemPerPage);
  res.json({
    data: Array.from(result),
    pageAll,
  });
});

//加载编辑菜单
app.get("/goods/:id/edit", async (req, res) => {
  const sql = `select a.商品编号, a.商品名称, a.出厂年份, a.价格, b.公司名称 as 品牌, b.供应商编号, b.公司地址, b.公司电话, b.公司联系人
   from  goodsinfo as a left join providerinfo as b
   on a.商品编号 = b.商品编号
   where a.商品编号 = ${req.params.id}`;
  const result = await sqlQuery(sql);
  res.json(result);
});

//新增商品
app.post("/goods/admin", jsonParser, async (req, res) => {
  let sql = `select * from goodsinfo where 商品编号 = ?`;
  let arr = [];
  arr[0] = req.body.商品编号;
  arr[1] = req.body.商品名称;
  arr[2] = req.body.出厂年份;
  arr[3] = req.body.价格;
  const result = await sqlQuery(sql, arr[0]);
  if (result.length > 0) {
    res.json({
      code: 1000,
      message: "商品编号重复，请重新上架！",
    });
  } else {
    let arr2 = [];
    arr2[0] = req.body.供应商编号;
    arr2[1] = req.body.商品编号;
    arr2[2] = req.body.品牌;
    arr2[3] = req.body.公司地址;
    arr2[4] = req.body.公司电话;
    arr2[5] = req.body.公司联系人;
    const sql2 = `select 供应商编号 from providerinfo where 供应商编号 = ?`;
    const result2 = await sqlQuery(sql2, arr2[0]);
    if (result2.length > 0) {
      res.json({
        code: 1000,
        message: "供应商编号重复，请重新上架！",
      });
    } else {
      const sql1 = `INSERT INTO goodsinfo (商品编号, 商品名称, 出厂年份, 价格)
      values(?, ?, ?, ?)`;
      const result1 = await sqlQuery(sql1, arr);
      const sql3 = `insert into providerinfo (供应商编号,商品编号,公司名称,公司地址,公司电话,公司联系人)
      values(?,?,?,?,?,?)`;
      await sqlQuery(sql3, arr2);
      res.json(result1);
    }
  }
});

//提交编辑商品菜单
app.put("/goods/admin/:id", jsonParser, async (req, res) => {
  let arr = [];
  arr[0] = req.body.商品编号;
  arr[1] = req.body.商品名称;
  arr[2] = req.body.出厂年份;
  arr[3] = req.body.价格;
  arr[4] = req.params.id;
  let arr2 = [];
  arr2[0] = req.body.供应商编号;
  arr2[1] = req.body.商品编号;
  arr2[2] = req.body.品牌;
  arr2[3] = req.body.公司地址;
  arr2[4] = req.body.公司电话;
  arr2[5] = req.body.公司联系人;
  arr2[6] = req.body.供应商编号;
  const sql1 = `update goodsinfo set 商品编号 = ?, 商品名称 = ?, 出厂年份 = ?, 价格 = ? where 商品编号 = ?`;
  const sql2 = `update providerinfo set 供应商编号 = ?,商品编号 = ?, 公司名称 = ?, 公司地址 = ?, 公司电话 = ?, 公司联系人 = ? where 供应商编号 = ?`;
  await sqlQuery(sql2, arr2);
  const result1 = await sqlQuery(sql1, arr);
  res.json(result1);
});

//删除用品
app.delete("/goods/admin/:id", async (req, res) => {
  const sql = `delete from goodsinfo where 商品编号 = ${req.params.id}`;
  await sqlQuery(sql);
  res.end();
});
app.listen(3000);
console.log("正在监听8080端口的请求");
