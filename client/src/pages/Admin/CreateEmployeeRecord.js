import { useFetcher, useLoaderData} from "react-router-dom";
import { axiosPrivate } from "../../api/axiosPrivate.js";

import {useEffect, useRef, useState, Fragment} from "react";
import InputField from "../../components/InputField";
import SelectField from "../../components/SelectField";



const CreateEmployeeRecord = () => {
    const contractsAndPatterns = useLoaderData()
    const contracts = contractsAndPatterns[1].data
    const patterns = contractsAndPatterns[0].data
    const [contract, setContract]=useState('ASOS')

    //const contract = signal(null)

    const fetcher = useFetcher()
    const formRef = useRef()
    const isSubmiting = fetcher.state ==='submitting'

    
    

    useEffect(()=>{
        if(!isSubmiting){
        formRef.current.reset()
        setContract('')
        }
        },[isSubmiting])
    

    const updateContract = (e)=>{
        setContract(contracts.find(el=>el.name===e.target.value))
        
    }


    
    return (     
    <fetcher.Form ref={formRef} autoComplete="off" className="basicForm" method="POST">
        <h2 className="header">Create Employee Record</h2>
        <InputField inputData={{name:'name', required:true}}/> 
        <InputField inputData={{name:'surname', required:true}}/>
        <InputField inputData={{type:'number', name:'employeeNo'}}/>
        <InputField inputData={{type:'date', name:'startDate', required:true}}/>
        <InputField inputData={{label:'Shift Hours', type:'number', name:'shiftHours', step:'0.25', min:'0.25', max:'11.5' , required:true}}/>
        <SelectField  inputData={{name:'contract',  required:true, onChange:updateContract, options:contracts.map((el)=>el.name) }}/>
        {contract?.agency&&<SelectField inputData={{name:'employeer',  required:true,  options:contract.agency}}/>}
        {contract?.shifts&&<SelectField inputData={{label:'Shift' ,name:'shiftName',  required:true,  options:contract.shifts}}/>}
        {patterns&&<SelectField inputData={{name:'pattern',  required:true,  options:patterns.map((el)=>el.name)}}/>}
        
        {contract?.skills&&<fieldset className='basicCheckbox'>
            <legend>Jobs</legend>
            {contract.skills.map((el)=>{
                return <Fragment key={el}><input type="checkbox" name="skills" id={el} value={el}></input><label htmlFor={el}>{el}</label></Fragment>
            })}
        </fieldset>
        }
        {!isSubmiting&&<button className="btnSubmit">Submit</button>}

    </fetcher.Form>
     );
}
 
export default CreateEmployeeRecord;

export const createEmployeeRecord = async ({request})=>{
    const data = await request.formData()
    let {...values} = Object.fromEntries(data)
    if(values?.skills){
        values.skills = data.getAll('skills')
    }
    try {       
        const res = await axiosPrivate.post("/employees/",values)
        return res
    } catch (err) { 
        if(err?.response?.data?.status===409){
            throw new Error (err?.response?.data?.message)
        }      
        throw Error('something went wrong with Contract')}  
}