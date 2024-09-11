import { useEffect, useRef, useState } from "react";
import { axiosPrivate } from "../../api/axiosPrivate.js";
import { useFetcher, Link, useLoaderData} from "react-router-dom";
import InputField from "../../components/InputField";
import { formatDate } from "../../utils.js";



const CreateCalendar = () => {
    const calendars = useLoaderData()
    const formRef = useRef(null)
    const fetcher = useFetcher()
    const isSubmiting = fetcher.state ==='submitting'
    const [startDate, setStartdate] = useState(null)
    const [endDate, setEndDate] = useState(null)
    
    useEffect(()=>{
        if(!isSubmiting){
        formRef.current.reset()}
        setStartdate(null)
        setEndDate(null)
        },[isSubmiting])

    const updateStartDate = (e)=>{
        setStartdate(e.target.value)  
        setDefaultEndDate(e.target.value)
    }

    const updateEndDate = (e) =>{
        setEndDate(e.target.value)
    }

    function setDefaultEndDate (data){
        const date = new Date(data)
        const start = new Date(data)
        
        const dateYear = start.getFullYear()
        const leap = new Date(dateYear,1,29).getDate()===29
        const leap2 = new Date((dateYear+1),1,29).getDate()===29

        if((start>=new Date(dateYear,1,28)&&leap2)||(start<=new Date(dateYear,1,29)&&leap)){
            const result = date.setDate(date.getDate()+ 365)
            setEndDate(formatDate(result))
        }else{
            const result = date.setDate(date.getDate()+ 364)
            setEndDate(formatDate(result))
        }
    }

    return ( 
        <>
            <fetcher.Form ref={formRef} autoComplete="off" className="basicForm" method="POST">
                <h2 className="header">Create Calndar</h2>
                <InputField inputData={{label:'Start Calendar', type:'date', name:'startCalendar', required:true, onChange:updateStartDate}}/>
                {endDate&&<InputField inputData={{label:'End Calendar', type:'date', name:'endCalendar', required:true, min:startDate, value:endDate, onChange:updateEndDate}}/>}
                <InputField inputData={{label:'Start Weeks No', type:'date', name:'startClipperWeeks', required:true}}/>
                <InputField inputData={{label:'Number of Weeks', type:'number', name:'weekNo',  min:'52', max:'53' , required:true, defaultValue:'52'}}/>

                {!isSubmiting&&<button className="btnSubmit">Submit</button>}
            </fetcher.Form>
            <div className="edit">
                {calendars.map((calendar)=>{
                    return <div className="card" key={calendar._id}>
                                <h2 className="header">{calendar.startCalendar.slice(0,4)+'/'+calendar.endCalendar.slice(0,4)}
                                    <span>
                                        <Link to={`/admin/calendar/${calendar._id}`}><i className="fa-solid fa-pen-to-square"></i></Link>
                                    </span>
                                </h2>
                                <div className="body">
                                    <div>start: <span>{calendar.startCalendar.slice(0,10)}</span></div>
                                    <div>end: <span>{calendar.endCalendar.slice(0,10)}</span></div>
                                    <div>start weeks: <span>{calendar.startClipperWeeks.slice(0,10)}</span></div>
                                    <div>weeks No: <span>{calendar.weekNo}</span></div>
                                </div>
                            </div>
                })}
            </div>
        </>
    );
}
 
export default CreateCalendar;


export const createCalendar = async ({request})=>{
    const data = await request.formData()
    let {...values} = Object.fromEntries(data)

    try {
        const res = await axiosPrivate.post("/calendars/",values)
        return res
    } catch (err) {
       if(err?.response?.data?.status===409){
            throw new Error (err?.response?.data?.message)
        }
      
        throw Error('something went wrong with Calendar')}  
}