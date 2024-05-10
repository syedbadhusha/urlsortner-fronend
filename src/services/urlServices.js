import { instance, protectedInstance } from "./instances"

const urlServices = {
    createUrl:async(values)=>{
        return await protectedInstance.post('/url',values)
    },
    urlList:async()=>{
        return await protectedInstance.get('/url/geturls')
    },
    reDirect:async(urlid)=>{
        return await instance.get(`/url/${urlid}`)
    },
    monthWiseClick:async()=>{
        return await protectedInstance.get('/url/monthwiseclicked')
    },
    datewiseClicked:async()=>{
        return await protectedInstance.get('/url/datewiseclicked')
    }
}

export default urlServices;