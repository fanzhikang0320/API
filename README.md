# API 公共平台开发文档

### 请求基础路径

baseUrl: ``http://api.izone.fun``

### 邮件发送

#### 请求方式

method：``POST``

#### 请求路径

url: ``/sms/mail``

#### 参数

| 参数 | 参数名 |  类型 | 是否必须（Y/N） | 描述 | 示例 |
| ------- | ------- |------- | ------- |------- | ------- |
|    name     |     发送人的名称    |	string	|    Y     |         |
|    title     |   邮件标题      |	string	|     Y    |         |
|    email     |   收件人邮箱账号      |	string	|    Y     |         |
|    content     |   发送的内容      |	string	|     Y    |         |


#### 响应示例

##### 成功


````js

{
	code: 1001,
	msg: 'success',
	data: []
}


````

##### 失败
````js
{
	code: 1002,
	msg: 'fail'
}

````

### 上传图片


## 文章模块