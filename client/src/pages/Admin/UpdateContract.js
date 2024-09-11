import { useEffect, useRef } from "react";
import { useLoaderData, useFetcher, useSubmit, useNavigate} from "react-router-dom";
import { axiosPrivate } from "../../api/axiosPrivate.js";
import InputField from "../../components/InputField";

const UpdateContract = () => {
    const contract = useLoaderData()
    const formRef1 = useRef(null)
    const formRef2 = useRef(null)
    const formRef3 = useRef(null)
    const submit = useSubmit()
    const navigate = useNavigate()
    const fetcher = useFetcher()
    const isSubmiting = fetcher.state ==='submitting'


    useEffect(()=>{
        if(!isSubmiting){
        formRef1.current.reset();
        formRef2.current.reset();
        formRef3.current.reset();        
        }
    },[isSubmiting])


    function deleteContract(){
        const confirmed = window.confirm('Are you sure you want to delete this Contract?');
        if(!confirmed){
            return}
        console.log(contract._id)
        submit({},{method:'delete'})
            navigate(-1)
    }

    function removeFromContract(e, data){        
        const confirmed = window.confirm(`Are you sure you want to remove from Contract?`);
        if(!confirmed){
            e.preventDefault()
        }
        submit(data, {method:'put'})
    }

    return ( 
        <div className="basicForm">
            <h2 className="header">{contract?.name}
                <button className="headerButton" onClick={deleteContract}><i className="fa-solid fa-trash-can"></i></button>
            </h2>

            <div className="adjustments">
                <h3>Employeer:</h3>
                {contract?.agency.map((employeer,index)=>{
                    return <div className="formDiv" key={index}>{employeer}<button  onClick={(e)=>removeFromContract(e,{agency:employeer})}><i className="fa-solid fa-trash-can"></i></button></div>     
                })}
            </div> 

            <fetcher.Form className="inputFlex" ref={formRef1}  method="put" >
                <InputField inputData={{label:'off', type:'text', name:"agency", placeholder:'add employeer' }}/>
                <button name="intent" value='add'><i className="fa-solid fa-circle-check"></i></button>
            </fetcher.Form>

            <div className="adjustments">
                <h3>Shift:</h3>
                {contract?.shifts.map((shift,index)=>{
                    return <div className="formDiv" key={index}>{shift}<button  onClick={(e)=>removeFromContract(e,{shifts:shift})}><i className="fa-solid fa-trash-can"></i></button></div>     
                })}
            </div> 
            <fetcher.Form className="inputFlex" ref={formRef2}  method="put" >
                <InputField inputData={{label:'off', type:'text', name:"shifts", placeholder:'add shift' }}/>
                <button name="intent" value='add'><i className="fa-solid fa-circle-check"></i></button>
            </fetcher.Form>

            <div className="adjustments">
                <h3>Jobs:</h3>
                {contract?.skills.map((skill,index)=>{
                    return <div className="formDiv" key={index}>{skill}<button  onClick={(e)=>removeFromContract(e,{skills:skill})}><i className="fa-solid fa-trash-can"></i></button></div>     
                })}
            </div> 
            <fetcher.Form className="inputFlex" ref={formRef3}  method="put" >
                <InputField inputData={{label:'off', type:'text', name:"skills", placeholder:'add job' }}/>
                <button name="intent" value='add'><i className="fa-solid fa-circle-check"></i></button>
            </fetcher.Form>

        </div>
     );
}
 
export default UpdateContract;

export const updateContract = async({params,request})=>{
    const id = params.contractId
    const method = request.method
    const data = await request.formData()
    let {...values} = Object.fromEntries(data)
    let intent = data.get("intent");
    
    try {
        if(method==='PUT'&&intent==='add'){
            const res = await axiosPrivate.put("/contracts/"+id, values)            
            return res
        }
        
         if(method==='PUT'){ 
            const res = await axiosPrivate.put("/contracts/remove/"+id, values)
            return res
        }

        if(method==='DELETE'){
            await axiosPrivate.delete("/contracts/"+id)
            return null
        }

    } catch (err) {        
        throw Error('something went wrong with Contract') 
    } 

}

