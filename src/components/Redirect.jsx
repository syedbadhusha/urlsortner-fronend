import { useEffect } from 'react';
import urlServices from '../services/urlServices'
import {useParams } from 'react-router'

function Redirect() {
    const {urlid} = useParams()
        async function getRealUrl(){
            try{
                const getRealUrl = await urlServices.reDirect(urlid) 
                location=getRealUrl.data.urlLink;
            }catch(error){
                console.error('Error fetching URL:', error)
            }
        }   
        useEffect(()=>{
            const timeOutId = setTimeout(()=>{getRealUrl()},1000);
            return ()=>clearTimeout(timeOutId);
        },[]) 
  return null
}
export default Redirect