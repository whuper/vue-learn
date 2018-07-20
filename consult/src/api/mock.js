// 引入mockjs
const Mock = require('mockjs');
// 获取 mock.Random 对象
const Random = Mock.Random;
// mock一组数据

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
    'users|5-20': [{
        'id|+1':1,// 属性 id 是一个自增数，起始值为 1，每次增 1
        'userId|1-100': 200,
        'userName': '@cname',
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

Mock.mock('/api/meetClinicService/findTianJinOrgans','get', function(){
		return  Mock.mock({
				'mockHospitals|5-10': [{
						'id|+1': 1,// 属性 id 是一个自增数，起始值为 1，每次增 1
				'organId|1-50':100,
				'organName': '@csentence(5,20)'
				}]
		})
});

Mock.mock('/api/meetClinicService/findByOrganIds','post', function(){
		return  Mock.mock({
				'mockList|5-10': [{
						'id|+1': 1,// 属性 id 是一个自增数，起始值为 1，每次增 1
				'meetClinicId|1-100': 200
				}]
		})
});

