db.user.save([ {username:"mingming"},{username:"leson"}])

db.user.insert({username:"huahua"})

db.user.insert({username:"mingming"},{username:"小露纯"})

db.user.insert([{username:"鹏展"},{username:"小露纯"}])

db.user.insertOne({username:"hello hello"})

db.user.insertMany([{username:"hello"},{username:"liangliang"}])


// 只修改一条数据
db.user.update({},{
    $set:{
        password:"abc123"
    }
})

db.user.update(
    {
        username:"leson"
    },
    {
        $set:{
            password:"123456"
        }
    }
)

db.user.update(
    {
        username:"mingming"
    },
    {
        $set:{
            age:28
        }
    }
)
// update user set password = "abc1234" where username = 'leson'

// true 查不到就直接插入  insert  查得到就去修改
db.user.update({
    username:"liuyuling"
},{
    $set:{

        password:"abc123"
    }
},true)


db.user.update({

},{
    $set:{
        password:"abc123"
    }
},true,true)

// true 表示修改满足条件的所有数据    updateMany
// false 表示修改满足条件的第一条数据  updateOne  默认false


db.user.updateOne({

},{
    $set:{
        password:"000000",
        age:28
    }
})

db.user.updateMany({

},{
    $set:{
        password:"000",
        age:18
    }
})

db.user.updateMany({

},{
    $set:{
        password:"abc123",
    },
    $inc:{
        age:50
    }
})


db.user.deleteOne({
    username:'leson'
})

db.user.deleteMany({
    username:"huahua"
})

db.user.remove({
    age:68
})

db.user.remove({},2)


// db.user.find(query,filed)
db.user.find({},{})

db.user.find({username:"leson"})

db.user.find({username:"leson"},{username:1,age:1,_id:0})

db.user.find({username:"leson",age:18},{_id:0})

db.user.distinct("username");


db.user.find({age:{
    $gt:20
}},{_id:0})
