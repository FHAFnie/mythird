



# 什么是 flux
Flux 是一种架构思想，专门解决软件的结构问题

flux 集中式管理组件的状态    
单向数据流


#flux 分层  
view 视图
action  动作
dispatcher  派发器  
store       中央容器  

View： 视图层
Action（动作）：视图层发出的消息（比如mouseClick）
Dispatcher（派发器）：用来接收Actions、执行回调函数
Store（数据层）：用来存放应用的状态，一旦发生变动，就提醒Views要更新页面


# flux 原理
用户访问 View
View 发出用户的 Action
Dispatcher 收到 Action，要求 Store 进行相应的更新
Store 更新后，发出一个"change"事件
View 收到"change"事件后，更新页面