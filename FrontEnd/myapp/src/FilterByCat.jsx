/* eslint-disable array-callback-return */
/* eslint-disable eqeqeq */
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";


const FilterByCat = (props) =>{


    const [ddData,setDDdata] = useState([]);

  useEffect(()=>{

    axios.get("http://localhost:5500/addTasks")
    .then(async(res)=>{
        const ddata = await res.data;
        setDDdata(ddata);
    })
    .catch((err)=>{
        console.log(err);
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])


  let FilterRecord = ddData.filter(row =>{

    if(props.cat == row.category)
    {
        return(row);
    } 
  })


  return(
    <>
    {FilterRecord.length}
    </>
  )
}

export default FilterByCat;