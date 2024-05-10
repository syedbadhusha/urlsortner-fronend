import React, { useEffect, useState } from 'react'
import urlServices from '../services/urlServices';
import { Link } from 'react-router-dom';

function ListofURL() {
    const [usrlList,setUrlList] = useState([]);
    async function getUrlList (){
        try{
            const res = await urlServices.urlList()
            setUrlList(res.data)    
        }catch(error){
            console.error(error)
        }
    }
    useEffect(()=>{
        getUrlList()
    },[])
  return (
    <table className="table table-striped">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Short URL</th>
      <th scope="col">Clicked</th>
    </tr>
  </thead>
  <tbody>
    {usrlList.map((list,index)=>
        {return (<tr key={index}>
            <th scope="row">{index+1}</th>
            <td><Link to={list.sortUrlLink} target='_Blank'>{list.sortUrlLink}</Link></td>
            <td>{list.clickedCount.length}</td>
        </tr>)})}
  </tbody>
</table>
  )
}

export default ListofURL