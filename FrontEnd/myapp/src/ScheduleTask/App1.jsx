import { NavLink } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import ShowItems1 from "./ShowItems1";
import "./App1.css";

const App1 = () =>{


    
    const [taskVal,setTaskVal] =  useState("");
    const [taskTime,setTaskTime] =  useState();
    const [taskCategoery,setTaskCategoery] =  useState("");
    const[formView,setFormView] = useState(false);
    const[dbData,setDbData] = useState([]);



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

    console.log(dbData);


    const submitHandle  = (e) =>{


        e.preventDefault();

        const taskObj = {

            taskName : taskVal,
            category:taskCategoery,
            taskTime:taskTime
        }

        axios.post("http://localhost:5500/addTasks",taskObj)
        .then(()=>{
            alert("Task Added Sucessfully!");
            window.location.reload();
        })
        .cath((err)=>{
            alert("Task Couldn't be Added!");
            window.location.reload();
        })
    }

    return(
        <>

            <div className="my-5 mx-auto d1">
               <div className="df">
                   <div>
                   <button style={{cursor:"pointer"}} onClick={(e)=>setFormView(!formView)}><i className="fas fa-solid fa-align-left"></i></button>
                   <div className={formView ? "dBlock w":"dNone w"} style={{zIndex:9999}}>
                            <NavLink exact to = "/">
                                    <button>Add Categories</button>
                            </NavLink>
                   </div>
                   </div>
                    <h3>Schedule Task</h3>
                    <button  data-bs-toggle="modal" data-bs-target="#exampleModal2" data-bs-whatever="@mdo" title="Add New Task">+</button>
                </div>
                <ShowItems1/>
               </div>

                <div className="modal fade" id="exampleModal2" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Add New Task : </h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={submitHandle} autoComplete="off">
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
                            <select className="form-select" onChange={(e)=>setTaskCategoery(e.target.value)}>
                                <option disabled selected>Select Category :</option>
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
                        <button type="submit" className="btn btn-primary">Add Task</button>
                    </div>
                    </form>
                    </div>
                </div>
                </div>
                </div>

        
        </>
    )


}

export default App1;