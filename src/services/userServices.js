import { instance, protectedInstance } from "./instances"

const userServices = {
    resgister:async(values) =>{
        return await instance.post('/user',values)
    },
    activation:async(values)=>{
        return await instance.put('/user/useractivation',values)
    },
    login:async(values)=>{
        return await protectedInstance.post('/user/login',values)
    },
    passwordReset:async(values)=>{
        return await instance.post('/user/sendforgotmail',values)
    },
    newPassword:async(values)=>{
        return await instance.put('/user/resetPassword',values)
    },
    currentUser:async()=>{
        return await protectedInstance.get('/user/currentuser')
    },
    logout:async()=>{
        return await protectedInstance.get('/user/logout')
    }
}
export default userServices