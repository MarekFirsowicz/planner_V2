import { useEffect, useRef } from "react";
import { useLoaderData, useFetcher, useSubmit, useNavigate} from "react-router-dom";
import { axiosPrivate } from "../../api/axiosPrivate.js";
import { formatDate } from "../../utils.js";
import InputField from "../../components/InputField";



const UpdateCalendar = () => {
    const calendar = useLoaderData()
    const formRef = useRef(null)
    const submit = useSubmit()
    const navigate = useNavigate()
    const fetcher = useFetcher()
    const isSubmiting = fetcher.state ==='submitting'

    useEffect(()=>{
        if(!isSubmiting){
        formRef.current.reset();}
    },[isSubmiting])

    function confirmRemoveAdj(data){  
        //console.log(data)      
        const confirmed = window.confirm('Are you sure you want to delete this adjustment?');
        if(!confirmed){
            return
        }
        if(confirmed){
            submit(data,{method:'put'})           
        } 
    }

    function deleteCalendar(){
        const confirmed = window.confirm('Are you sure you want to delete this Calendar?');
        if(!confirmed){
            return
        }
        if(confirmed){
            submit({},{method:'delete'})
            navigate(-1)
        } 
    }

    const updateCalendarField = (e)=>{
        const name = e.target.name
        const value = e.target.value
        submit({[name]: value}, {method:'put'})
    }

    return (
        
    
    <div className="basicForm">
        <h2 className="header">{calendar.startCalendar.slice(0,4)+'/'+calendar.endCalendar.slice(0,4)}
        <button className="headerButton" onClick={deleteCalendar}><i className="fa-solid fa-trash-can"></i></button></h2>

        <InputField inputData={{label:'start Calendar', type:'text', defaultValue:formatDate(calendar.startCalendar), disabled:true}}/>
        <InputField inputData={{label:'End Calendar', type:'date', name:'endCalendar', defaultValue:formatDate(calendar.endCalendar), onChange:updateCalendarField}}/>
        <InputField inputData={{label:'Start Weeks', type:'date', name:'startClipperWeeks', defaultValue:formatDate(calendar.startClipperWeeks), onChange:updateCalendarField}}/>
        <InputField inputData={{label:'No of Weeks', type:'number', name:'weekNo',  min:'52', max:'53' , defaultValue:calendar.weekNo, onChange:updateCalendarField}}/>

        <div className="adjustments">
            <h3>Adjustments:</h3>
            {calendar.allowanceAdj.map((adj,index)=>{
                return <div className="formDiv" key={index}>{adj}{adj!=='base'&&<button onClick={()=>confirmRemoveAdj({allowanceAdjRemove:adj})}><i className="fa-solid fa-trash-can"></i></button>}</div>     
            })}
        </div>       

        <fetcher.Form className="inputFlex" ref={formRef}  method="put" >
            <InputField inputData={{label:'off', type:'text', name:"allowanceAdj", placeholder:'add adjustment' }}/>
            <button><i className="fa-solid fa-circle-check"></i></button>
        </fetcher.Form>
    </div>
    
    
    );
}
 
export default UpdateCalendar;

export const updateCalendar = async ({params ,request})=>{    
    const id = params.calendarId
    const method = request.method
    const data = await request.formData()
    let {...values} = Object.fromEntries(data)

    try {
        if(method==='PUT'){
            const res = await axiosPrivate.put("/calendars/"+id, values)            
            return res
        }
        
        if(method==='DELETE'){ 
            const res = await axiosPrivate.delete("/calendars/"+id)
            return res
        }
       
    } catch (err) {
        if(err?.response?.data?.status===409){
            throw new Error (err?.response?.data?.message)
        }
        throw Error('something went wrong with Calendar') 
    }    
}