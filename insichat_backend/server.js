import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import mongoSchema from './mongoSchema.js'
import Pusher from 'pusher'

//app config
//pxx - pusherinfo
const app = express();
const port = process.env.PORT||8000;
const pusher = new Pusher({
    appId: "pxx",
    key: "pxx",
    secret: "pxx",
    cluster: "pxx",
    useTLS: true
  });
  
//middleware
app.use(express.json());
app.use(cors());

//db config
// mxx - mongoinfo
const mongoURL = 'mxx';
mongoose.connect(mongoURL, {useCreateIndex:true, useNewUrlParser:true,useUnifiedTopology: true})
mongoose.connection.once('open', ()=>{
    console.log('Database connected');
    const stream = mongoose.connection.collection('messages').watch();

    stream.on('change', (newChange)=>{
        if(newChange.operationType==='insert'){
            pusher.trigger('groupForPusher', 'newGroupPusher', {
                'change':newChange
            })
        } else if (newChange.operationType==='update'){
            pusher.trigger('groupMSG', 'newGroupMSG', {
                'change':newChange
            })
           
        } else if(newChange.operationType==='delete'){
            pusher.trigger('groupForPusher', 'newGroupPusher', {
                'change':newChange
            })
        }
        else{
            console.log('pusher trigger error')
        }
    })
})
//api routes
app.get('/', (req,res)=> res.status(200).send('hello from InsiChat'));

app.post('/new/group', (req,res)=>{
    const dataBase = req.body;
    mongoSchema.create(dataBase, (err, data)=>{
        if(err){
            res.status(500).send(err);
        }
        else{
            res.status(201).send(data)
        }
    })
})

app.get('/get/groupList', (req,res)=>{
    mongoSchema.find((err, data) =>{
        if(err){
            res.status(500).send(err);
        }
        else{
             let groups = [];
            
            data.map((groupInfo)=>{
                const groupParams = {
                    _id: groupInfo.id,
                    groupName: groupInfo.groupName,
                    private: groupInfo.private,
                    creator: groupInfo.creator,
                    userList: groupInfo.userList,
                }
                groups.push(groupParams);
            })
            res.status(200).send(groups);
        }
    })
})

app.post('/new/message', (req,res)=>{
    const newMSG = req.body;
    const id = req.body.id;
    const myquery = { _id: id};
    const mynewvalue = { $push: {groupMSG: newMSG}}
    mongoSchema.updateOne(
        myquery,
        mynewvalue,
        (err, data) =>{
            if(err){
                console.log(err);
                res.status(500).send(err);
            }else{
                res.status(201).send(data);
            }
        }
        )
})

app.get('/get/conversation', (req,res)=>{
    const id = req.query.id;
    mongoSchema.find({_id:id},(err, data)=>{
        if(err){
            console.log(err);
            res.status(500).send(err);
        }else{
            res.status(200).send(data);
        }
    })
})

app.post('/update/delete_group', (req, res)=>{
    const idOfGroup = req.body.id;
    const myquery={_id:idOfGroup};
    mongoSchema.deleteOne(myquery, (err, data)=>{
        if(err){
            console.log(err);
            res.status(500).send(err);
        }else{
            res.status(201).send(data);
        }
    })
})
app.post('/update/add_user_to_group_list', (req, res)=>{
    const idOfGroup = req.body.id;
    const newUser = req.body;
    const query = {_id:idOfGroup};
    const updatequery={$push: {userList: newUser}}
    mongoSchema.updateOne(query,updatequery,
        (err, data)=>{
        if(err){
            console.log(err);
            res.status(500).send(err);
        }
        else{
            res.status(201).send(data);
        }
    })
})
app.post('/update/delete_user_from_group_list', (req, res)=>{
    const idOfGroup = req.body.id;
    const idOfUser = req.body.uid;
    const userToDelete = req.body.uid;
    const query1 = {_id:idOfGroup};
   
 
    const query3= {$pull: {userList:{uid: userToDelete}}}
   
    mongoSchema.updateOne(query1 ,query3,
        (err, data)=>{
        if(err){
            
            res.status(500).send(err);
        }
        else{

           
            res.status(201).send(data);
        }
        })
})
//listen

app.listen(port, ()=>{console.log(`listening on lh: ${port}`)})