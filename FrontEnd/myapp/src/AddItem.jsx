/* eslint-disable eqeqeq */
import React from "react";
import { useState } from "react";
import "./AddItem.css";
import axios from "axios";
import ShowItems from "./ShowItems";
import {NavLink} from "react-router-dom";

const AddItem = () =>{


    const [taskVal,setTaskVal] =  useState("");

    const[formView,setFormView] = useState(false);

    const submitHandle = (e) =>{


        e.preventDefault();

       if(taskVal == "" || taskVal == " ")
       {
        alert("Input Can not Be Blank!");
       }
       else
       {
            const dataObj = {
                category:taskVal
            }
            
            axios.post("http://localhost:5500/tasks",dataObj)
            .then(()=>{
                alert("Data Added Successfully!");
                setTaskVal("");
                window.location.reload();
            })
            .catch(()=>{
                alert("Data couldn't be Added!");
            })
           }
    

        }

    return(
        <>
               <div className="my-5 mx-auto d1">
               <div className="df">
                   <div>
                   <button style={{cursor:"pointer"}} onClick={(e)=>setFormView(!formView)}><i className="fas fa-solid fa-align-left"></i></button>
                   <div className={formView ? "dBlock w":"dNone w"} style={{zIndex:9999}}>
                            <NavLink exact to = "/schedule">
                                    <button title="Add Task Page" >Schedule Task</button><br/>
                            </NavLink>
                   </div>
                   </div>
                    <h3>Category</h3>
                    <button  data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo"className="b">+</button>
                </div>
                <ShowItems/>
               </div>

                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Add Categoery : </h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={submitHandle} autoComplete="off">
                        <div className="mb-3">
                            <label htmlFor="recipient-name" className="col-form-label">Categoery Name :</label>
                            <input type="text" className="form-control" id="recipient-name" onChange={(e)=>setTaskVal(e.target.value)} value={taskVal}/>
                        </div>
                    <div className="modal-footer">
                        <button type="submit" className="btn btn-primary">Add Categoery</button>
                    </div>
                    </form>
                    </div>
                </div>
                </div>
                </div>

        </>
    )
}

export default AddItem;

