
# 相对 长度 单位 vw  vh  rem em  

# 屏幕适配  

# rem 适配  等比缩放      

# 设计稿 宽 750    假定 当前 rem = 100px  

# 随着手机屏幕 宽度  变化  得到变化的rem  从而实现  手机适配  （移动端适配 ）

# width/ 750 = x / 100px 

#  x ==> 当前手机的rem    width*100/ 750 


# 等比缩放  基准  375px  1rpx = 0.5px 
#  rpx  在 iphone6 手机  屏幕宽带 375px ==  750pt   =   750rpx   ==> 1rpx = 0.5px;  

# iphone5 320px 320:375 =  rpx:0.5px rpx ==>    320 * 0.5px / 375  = 0.426666px
# iphone7P 414px 414:375 =  rpx:0.5px rpx ==>    414 * 0.5px / 375  = 0.552px; 