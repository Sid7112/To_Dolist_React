/* eslint-disable eqeqeq */
import axios from "axios";
import { useState ,useEffect} from "react"; 
import FilterByCat from "./FilterByCat";
import "./ShowItems.css";


const ShowItems = () =>{

    const [dbData,setDbData] = useState([]);

    const[updateVal,setUpdateVal] = useState();

    const [id,setId] = useState();



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




    const updateRecord = (id,v) =>{

        document.getElementById("b").click();

        setUpdateVal(v);

        setId(id);

    }




    const deleteRecord = (id) =>{
        setId(id);
        axios.delete(`http://localhost:5500/tasks/${id}`)
        alert("Data deleted Successfully!");
        window.location.reload();
    }







    const getOperation = (e,id,val) =>{

       document.getElementById(`i${id}`).style.display = "none";

        if(e.target.value.toLowerCase() == "update")
        {
            updateRecord(id,val);
        }
        else if(e.target.value.toLowerCase() == "delete")
        {
            deleteRecord(id);
        }

        
    }

    const updateHanlder = (e) =>{

        e.preventDefault();

        const dataObj = {
            category:updateVal
        }

        axios.put(`http://localhost:5500/tasks/${id}`,dataObj)
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


    return (
        <>

                {
                dbData.map(row =>{

                   return(
                    <div className="d-flex justify-content-between align-items-center py-2 px-4 my-4 mx-auto df1">

                       <div>
                       <h3 style={{fontSize:"22px"}}>
                            {row.category}
                   
                        </h3>
                        <p style={{color:"red"}}>
                            <FilterByCat cat = {row.category}/>Tasks</p>
                       </div>
                        <select onChange={(e)=>getOperation(e,row._id,row.category)}  className="s1" id={`i${row._id}`}>
                            <option selected style={{display:"none"}}>⁝</option>
                            <option value="Update">Update</option>
                            <option value="Delete">Delete</option>
                    </select>
                    </div>
                   )
                    
                })}

         <button  data-bs-toggle="modal" data-bs-target="#exampleModal1" data-bs-whatever="@mdo"id="b"  style={{display:"none"}}></button>
                <div className="modal fade" id="exampleModal1" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Update Categoery : </h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={reload}></button>
                    </div>
                    <div className="modal-body">
                        <form autoComplete="off"onSubmit={updateHanlder}>
                        <div className="mb-3">
                            <label htmlFor="recipient-name" className="col-form-label">Categoery Name :</label>
                            <input type="text" className="form-control" id="recipient-name" onChange={(e)=>setUpdateVal(e.target.value)} value={updateVal}/>
                        </div>
                    <div className="modal-footer">
                        <button type="submit" className="btn bg-success text-white">Update Categoery</button>
                    </div>
                    </form>
                    </div>
                </div>
                </div>
                </div>
        </>

    )
}

export default ShowItems;

