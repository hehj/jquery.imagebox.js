# jquery.imagebox.js
A jquery plugin, dependencies fancybox

项目开发中遇到图库CRUD界面，于是模仿了QQ空间的布局。

默认只需要一个可以返回JOSN格式报文的请求地址。

```
$('#test_div').imagebox({
			'requestUrl':'http://your-server/your_json_list.json'
});
```
	
JSON格式默认如下

```
{
    "rows": [
        {
            "id": 1,
            "description": "凤竹村",
            "url": "http://yjcun-village.oss-cn-hangzhou.aliyuncs.com/1.jpg"
        },
        {
            "id": 2,
            "description": "蓝玉村",
            "url": "http://yjcun-village.oss-cn-hangzhou.aliyuncs.com/2.jpg"
        },
        {
            "id": 3,
            "description": "马排村",
            "url": "http://yjcun-village.oss-cn-hangzhou.aliyuncs.com/3.jpg"
        },
        {
            "id": 4,
            "description": "沙州村",
            "url": "http://yjcun-village.oss-cn-hangzhou.aliyuncs.com/4.jpg"
        },
        {
            "id": 5,
            "description": "冠洲村",
            "url": "http://yjcun-village.oss-cn-hangzhou.aliyuncs.com/5.jpg"
        }
    ]
}
```

当然如果你的服务端返回不同的字段，也允许在插件中自定义。

```
$('#test_div').imagebox({
			'requestUrl':'http://your-server/your_json_list.json'，
			'idField' : 'your_id',
			'urlField' : 'your_url',
			'descriptionField' : 'your_description'
});
```

对应于你的报文如下：

```
{
    "rows": [
        {
            "your_id": 1,
            "your_description": "凤竹村",
            "your_url": "http://yjcun-village.oss-cn-hangzhou.aliyuncs.com/1.jpg"
        }
    ]
}
```

其它自定义的写法查看下代码也不难理解。

接下来我想实现: $('#test_div').imagebox('reload');但是不知道该如何编码，希望得到大家的帮助。
我的邮箱是hehangjie@hotmail.com
