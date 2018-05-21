// 引入mockjs
const Mock = require('mockjs');
// 获取 mock.Random 对象
const Random = Mock.Random;
// mock一组数据
/*
const newsData = function() {
    let articles = [];
    for (let i = 0; i < 10; i++) {
        let tmpArticleObj = {
            id: i+1,
            title: Random.csentence(5, 30), //  Random.csentence( min, max )
            thumbnail_pic_s: Random.dataImage('300x250', 'mock的图片'), // Random.dataImage( size, text ) 生成一段随机的 Base64 图片编码
            author_name: Random.cname(), // Random.cname() 随机生成一个常见的中文姓名
            date: Random.date() + ' ' + Random.time() // Random.date()指示生成的日期字符串的格式,默认为yyyy-MM-dd；Random.time() 返回一个随机的时间字符串
        }
        articles.push(tmpArticleObj)
    }
 
    return {
        articles: articles
    }
}
*/
var newsData = Mock.mock({
    // 属性 list 的值是一个数组，其中含有 5 到 10 个元素
    'articles|5-10': [{
        'id|+1': 1,// 属性 id 是一个自增数，起始值为 1，每次增 1
		'title': '@csentence(5,20)',
		'thumb_pic': '@dataImage("300x250","mock的图片")', 
		'author': '@cname',
		'date':'@date("yyyy-MM-dd")'
    }]
});

var users = Mock.mock({  
    'users|5-10': [{
        'id|+1':1,// 属性 id 是一个自增数，起始值为 1，每次增 1
        'userId|1-100': 200,
        'username': '@cname',
        'email':'@email',
        'province':'@province'
    }]
});
 
// Mock.mock( url, post/get , 返回的数据)；
Mock.mock('/news/list', 'get', newsData);

Mock.mock('/news/detail/1','get', function() {
    return Mock.mock({
        "detail": {
            title: '@csentence(5,20)',
            content: '@csentence(80,120)',
			date:'@date("yyyy-MM-dd")'
        }
    });
});

Mock.mock('/login','get',function() {
    return 'ok'
});

Mock.mock('/user/list', 'get', users);

// 输出结果
console.log('mock',JSON.stringify(users, null, 4))