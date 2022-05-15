import mongoose from 'mongoose'

//one group, one schema
const insiChatSchema = mongoose.Schema({
    
    groupName: String,
    private: Boolean,
    creator: {
                email:String,
                uid:String,
                photo:String,
                displayName:String
    },
    userList:[
        {
            email:String,
            uid:String
         }],
    groupMSG: [
        {
            message:String,
            timestamp: String,
            user:{
                email:String,
                uid:String,
                photo:String,
                displayName:String
            }
        }
    ]
})

export default mongoose.model('messages', insiChatSchema);