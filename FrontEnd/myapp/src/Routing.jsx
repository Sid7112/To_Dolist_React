
import { Routes,Route } from "react-router-dom";
import App from "./App";
import App1 from "./ScheduleTask/App1";

const Routing = () =>{

    return(

        <Routes>

        <Route exact path="/" element={<App/>}></Route>

        <Route exact path = "/schedule" element={<App1/>}></Route>

    </Routes>


    )

}

export default Routing;