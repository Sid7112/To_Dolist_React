/* eslint-disable eqeqeq */


import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import "./ShowItems1.css";
import TImeDate from "./TimeDate";



const ShowItems1 =  () =>{

    const [taskVal,setTaskVal] =  useState("");
    const [taskTime,setTaskTime] =  useState();
    const [taskCategoery,setTaskCategoery] =  useState("");
    const[dbData,setDbData] = useState([]);

    const [id,setId] = useState();

    const [taskData,setTaskData] = useState([]);


    useEffect(()=>{

        axios.get("http://localhost:5500/addTasks")
        .then(async(res)=>{
            const rawData = await res.data;
            setTaskData(rawData);
            console.log(rawData.taskName);
        })
        .catch((err)=>{
            console.log(err);
        })
    },[])


    // for getting Categories from Database

    useEffect(()=>{

        axios.get("http://localhost:5500/tasks")
        .then(async(res)=>{
            const rawData = await res.data;
            setDbData(rawData);
        })
        .catch((err)=>{
            console.log(err);
        })
    },[])



   
    const updateRecord = (id,tn,tc,tt) =>{

        document.getElementById("d").click();

        setTaskVal(tn);

        setTaskCategoery(tc);

        setTaskTime(tt);

        setId(id);
    }


    const deleteRecord = (id) =>{

        axios.delete(`http://localhost:5500/addTasks/${id}`)
        .then(()=>{
            alert("Data deleted Successfully!");
            window.location.reload();
        })
        .catch((err)=>{
            alert("Data Couldn't Be Deleted Now!")
        })
    }




    const setOperation = (e,id,tn,tc,tt) =>{

        document.getElementById(`i${id}`).style.display = "none";

        if(e.target.value.toLowerCase() == "update")
        {
            updateRecord(id,tn,tc,tt);
        }
        else if(e.target.value.toLowerCase() == "delete")
        {
            deleteRecord(id);
        }
    }


    const updateHandler = (e) =>{

        e.preventDefault();

        const taskObj = {
            taskName : taskVal,
            category:taskCategoery,
            taskTime:taskTime
        }



        axios.put(`http://localhost:5500/addTasks/${id}`,taskObj)
        .then(()=>{
            alert("Data Updated Sucessfully!");
            window.location.reload();
        })
        .catch(()=>{
            alert("Data couldn't be Updated!");
        })

    }

    const reload = () =>{
        document.getElementById(`i${id}`).style.display = "block";
        document.getElementById(`i${id}`).value= "⁝";
    }


    return(

       <>
             {
                 taskData.map(row =>{

                    return(
                        <div className="py-2 px-4 my-4 mx-auto df1 s1df1">

                            <div className="gb" style={{textAlign:"center",fontFamily: "Saira Stencil One",fontSize:"20px"}}>
                                <TImeDate  dateTime = {row.taskTime} />
                            </div>

                       <div>
                       <h3 style={{textTransform:"capitalize",fontSize:"25px"}}>
                            {row.taskName}
                        </h3>
                        <p style={{color:"magenta",fontSize:"18px"}}>{row.category}</p>
                       </div>

                        <select className="s1" onChange={(e)=>setOperation(e,row._id,row.taskName,row.category,row.taskTime)} id={`i${row._id}`}>
                            <option selected style={{display:"none"}}>⁝</option>
                            <option value="Update">Update</option>
                            <option value="Delete">Delete</option>
                    </select>
                    </div>
                   )
                 })
            }


                    <button  data-bs-toggle="modal" data-bs-target="#exampleModal3" data-bs-whatever="@mdo" id="d" style={{display:"none"}}>+</button>



            <div className="modal fade" id="exampleModal3" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Update Task : </h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={reload}></button>
                    </div>
                    <div className="modal-body">
                        <form  autoComplete="off" onSubmit={updateHandler}>
                        <div className="mb-3">
                            <label htmlFor="recipient-name" className="col-form-label">Task Name :</label>
                            <input type="text" className="form-control" id="recipient-name" onChange={(e)=>setTaskVal(e.target.value)} value={taskVal}/>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="recipient-name" className="col-form-label">Scehdule Time : </label>
                            <input type="datetime-local" className="form-control" id="recipien-time" onChange={(e)=>setTaskTime(e.target.value)} value={taskTime}/>
                        </div>


                        <div className="mb-3">
                            <label htmlFor="recipient-name" className="col-form-label">Select Categories :</label>
                            <select className="form-select" onChange={(e)=>setTaskCategoery(e.target.value)} value={taskCategoery}>
                            {
                            dbData.map(row=>{
                                return(
                                    <option value={row.category}>{row.category}</option>
                                )
                            })
                            }
                            </select>
                        </div>


                    <div className="modal-footer">
                        <button type="submit" className="btn bg-primary text-white">Update Task</button>
                    </div>
                    </form>
                    </div>
                </div>
                </div>
                </div>
       
       </>

       

    )

}

export default ShowItems1;