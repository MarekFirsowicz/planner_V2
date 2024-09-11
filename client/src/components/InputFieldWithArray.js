import InputField from "./InputField";
import { useState, useRef, useEffect} from "react";



const InputFieldWithArray = ({errors,isSubmiting,inputData}) => {
    const inputRef = useRef(null)
    const [data, setData] = useState(new Set())

    
    useEffect(()=>{        
        if(errors){return}
        else if(!isSubmiting){
        setData(new Set())
        }},[isSubmiting, errors])
    
    

    const updateData=(e)=>{
        e.preventDefault()
        if(inputRef.current.value==='') return
        const newItem = inputRef.current.value
        setData(prevState=> new Set(prevState).add(newItem.trim().toUpperCase()))
        inputRef.current.value=null
    }

    function deleteItem (e){
        e.preventDefault()
        const item = e.target.value
        data.delete(item.trim().toUpperCase())
        setData(new Set(data))
    }

    
    
    return ( 
        <div>
            <div>
            {[...data].length>0&&[...data].map(item=><button className="btnSubmit" key={item} value={item} onClick={(e)=>deleteItem(e)}>{item}</button>)}
            </div>
            <InputField inputData={{...inputData, value: JSON.stringify([...data]),type:'hidden'}}/>
            <InputField errors={errors?.[inputData.name]} inputRef={inputRef} inputData={{...inputData, name:null}}/>
            <button onClick={(e)=>updateData(e)}><i className="fa-solid fa-circle-check"></i></button>
        </div>
     );
}
 
export default InputFieldWithArray;