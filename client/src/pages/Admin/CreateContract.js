import { useEffect, useRef} from "react";
import { axiosPrivate } from "../../api/axiosPrivate.js";
import { useFetcher, useLoaderData, Link} from "react-router-dom";
import InputField from "../../components/InputField";
import InputFieldWithArray from "../../components/InputFieldWithArray.js";
import { isJsonString } from "../../utils.js";


const CreateContract = () => {
    const contracts = useLoaderData()
    const formRef = useRef(null)
    const fetcher = useFetcher()
    const isSubmiting = fetcher.state ==='submitting'
    const retData = fetcher?.data
    const errors = retData?.errors

    const isObjectEmpty = (objectName) => {
        return Object.keys(objectName).length === 0
      }

    useEffect(()=>{        
        if(errors&&!isObjectEmpty(errors)){
            return
        }
        else if(!isSubmiting){
        formRef.current.reset()
        retData?.res&&alert(retData.res)
        }
        },[isSubmiting,errors,retData?.res])

    return (         
        <>
            <fetcher.Form className="basicForm" ref={formRef} autoComplete="off" method='post' action={createContract} > 
                <h2 className="header">Create Contract</h2>
                <InputField errors={errors?.name} inputData={{label:'Contract', type:'text', name:'name'}}/>
                
                <fieldset >
                    <legend>Shifts</legend>
                    <InputFieldWithArray errors={errors} isSubmiting={isSubmiting} inputData={{label:'off', type:'text',name:'shifts', placeholder:'add shift'}}/>
                </fieldset>

                <fieldset >
                    <legend>Employeer</legend>
                    <InputFieldWithArray errors={errors} isSubmiting={isSubmiting} inputData={{label:'off', type:'text',name:'agency', placeholder:'add employeer'}}/>
                </fieldset>                

                <fieldset >
                    <legend>Jobs</legend>
                    <InputFieldWithArray errors={errors} isSubmiting={isSubmiting} inputData={{label:'off', type:'text',name:'skills', placeholder:'add Job'}}/>
                </fieldset>

                {!isSubmiting&&<button className="btnSubmit">Submit</button>}
            </fetcher.Form>

            <div className="edit">
                {contracts.map((contract)=>{
                        return <div className="card" key={contract._id}>
                                    <h2 className="header">{contract.name}
                                        <span>
                                            <Link to={`/admin/contract/${contract._id}`}><i className="fa-solid fa-pen-to-square"></i></Link>
                                        </span>                                  
                                    </h2>                                    
                                </div>
                    })}
            </div>
        </>
     );
}
 
export default CreateContract;

export const createContract = async ({request})=>{
    const data = await request.formData()
    let {...values} = Object.fromEntries(data)
    const errors ={}

    for (const prop in values){
        values[prop]=isJsonString(values[prop])?JSON.parse([values[prop]]):values[prop]
        if(values[prop]===''||values[prop].length===0){
            errors[prop] = 'add record to'
        }
    }

    if (Object.keys(errors).length) {
        const returnedErrors= {errors:errors}
        return returnedErrors;
      }

    try {        
            const res = await axiosPrivate.post("/contracts/",values)
            return {res:res.data}
    } catch (err) {       
    throw Error('something went wrong with Contract')}  
}