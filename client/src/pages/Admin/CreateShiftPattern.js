import { useEffect, useRef, useState} from "react";
import { axiosPrivate } from "../../api/axiosPrivate.js";
import { useFetcher, useLoaderData, Link, useSubmit} from "react-router-dom";
import InputField from "../../components/InputField";
import InputFieldWithArray from "../../components/InputFieldWithArray.js";
import { isJsonString } from "../../utils.js";

const CreateShiftPattern = () => {
    const submit = useSubmit()
    const patterns = useLoaderData()
    const [shiftType, setShiftType] = useState('')

    const formRef = useRef(null)
    const fetcher = useFetcher()
    const isSubmiting = fetcher.state ==='submitting'

    useEffect(()=>{
        if(!isSubmiting){
        formRef.current.reset()
        setShiftType('')
    }
        },[isSubmiting])

    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    const patternType ={d:'Days', n:'Nights', dn:'Days/Nights', nd:'Nights/Days'}

    const deletePattern =(id)=>{

        const confirmed = window.confirm('Are you sure you want to delete this adjustment?');
        if(!confirmed){
            return
        }
        submit({'id': id},{method:'DELETE'})
    }

    return ( 
        <>
        <fetcher.Form className="basicForm" ref={formRef} autoComplete="off" method='post'>
            <h2 className="header">Create shift pattern</h2>
            <InputField inputData={{type:'text', name:'name', required:true}}/>
            <InputField inputData={{label:'Start Date', type:'date', name:'startDate', required:true}}/>

            <fieldset className="basicCheckbox" required>
                <legend>Shift type</legend>
                <InputField inputData={{label:'Shift', type:'radio', name:'type', id:'shift', value:'shift',checked:shiftType==='shift' ,onChange:(e)=>setShiftType(e.target.value), required:true }}/>
                <InputField inputData={{label:'M-F', type:'radio', name:'type', id:'wk', value:'wk',checked:shiftType==='wk' ,onChange:(e)=>setShiftType(e.target.value)}}/>
            </fieldset>

            <fieldset className="basicCheckbox"  required>
                <legend>Pattern type</legend>
                <InputField inputData={{label:'Days', type:'radio', name:'pattern', id:'d', value:'d',required:true }}/>
                <InputField inputData={{label:'Nights', type:'radio', name:'pattern', id:'n', value:'n'}}/>
                <InputField inputData={{label:'Days/Nights', type:'radio', name:'pattern', id:'dn', value:'dn'}}/>
                <InputField inputData={{label:'Nights/Days', type:'radio', name:'pattern', id:'nd', value:'nd'}}/>
            </fieldset>

            {shiftType==='shift'&&<>
            <InputField inputData={{label:'Days On',type:'number', name:'daysOn', min:1,max:6 ,required:true}}/>
            <InputField inputData={{label:'Days Off',type:'number', name:'daysOff', min:1,max:6 ,required:true}}/>
            </>}

            {shiftType==='wk'&&<fieldset className="basicCheckbox">
                    <legend >Work Days</legend>
                    <InputField inputData={{label:'Mon',type:'checkbox', name:'check', value:1, id:'check1'}}/>
                    <InputField inputData={{label:'Tue',type:'checkbox', name:'check', value:2, id:'check2'}}/>
                    <InputField inputData={{label:'Wed',type:'checkbox', name:'check', value:3, id:'check3'}}/>
                    <InputField inputData={{label:'Thu',type:'checkbox', name:'check', value:4, id:'check4'}}/>
                    <InputField inputData={{label:'Fri',type:'checkbox', name:'check', value:5, id:'check5'}}/>
                    <InputField inputData={{label:'Sat',type:'checkbox', name:'check', value:6, id:'check6'}}/>
                    <InputField inputData={{label:'Sun',type:'checkbox', name:'check', value:0, id:'check7'}}/>
            </fieldset>}

            {!isSubmiting&&<button className="btnSubmit">Submit</button>}
        </fetcher.Form>

        <div className="edit">
                {patterns.map((pattern)=>{
                        return <div className="card" key={pattern._id}>
                                    <h2 className="header">{pattern.name}
                                        <span><button className="headerButton" onClick={()=>deletePattern(pattern._id)}><i className="fa-solid fa-trash-can"></i></button></span>             
                                    </h2> 
                                    <div className="body">
                                        <div>start: <span>{pattern.startDate.slice(0,10)}</span></div>
                                         {Array.isArray(pattern.daysOn)?
                                        <div>On:<span>{pattern.daysOn.map(day=>days[day]).join(',')}</span></div>
                                        :
                                        <div>On/Off<span>{pattern.daysOn}/{pattern.daysOff}</span></div>
                                        }
                                        <div>pattern :<span>{patternType[pattern.pattern]}</span></div>
                                    </div>
                                                                     
                                </div>
                    })}
            </div>
        
        </>

     );
}
 
export default CreateShiftPattern;

export const createShiftPattern = async ({request})=>{
    
    const data = await request.formData()
    let {...values} = Object.fromEntries(data)
    if(values?.daysOn){
        values.daysOn = parseInt(values.daysOn)
        values.daysOff = parseInt(values.daysOff)
    }
    if(values?.check){
        const days = [1,2,3,4,5,6,0]
        //const nameOn = `(${daysOn})`
        const daysOn = data.getAll('check')
        values.daysOn = daysOn.map(element => {
            return parseInt(element)
        });
        values.daysOff = days.filter(el=>!values.daysOn.includes(el))
        delete values.check
    }
    
    

    const method = request.method    
    try {

        if(method==='POST'){ 
            const res = await axiosPrivate.post("/patterns/",values)
            return res
        }

        if(method==='DELETE'){ 
            const res = await axiosPrivate.delete("/patterns/"+values.id)
            return res
        }
    } catch (err) {       
    throw Error('something went wrong with ShiftPattern')}  
}