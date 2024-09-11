import { useEffect, useRef, useState} from "react";
const FormField = ({inputRef,errors, inputData}) => {
   const handleKey =(e)=>{
      if (e.keyCode === 13){
         e.preventDefault()
      }
      
   }

   
    return ( 
        <>           
            
           {(inputData.label!=='off'&&!['radio', 'checkbox'].includes(inputData.type))&&<label htmlFor={inputData.id||inputData.name}>{inputData.label||inputData.name[0].toUpperCase() + inputData.name.slice(1)}</label>}          
            
            {<input
            className={errors&&'inputError'}
            ref={inputRef}
            autoComplete="off"
            type={inputData.type}
            name={inputData.name}
            id={inputData.id||inputData.name}
            step={inputData.step}
            min={inputData.min}
            max={inputData.max}
            required={inputData.required}
            value={inputData.value}
            defaultValue={inputData.defaultValue}
            disabled={inputData.disabled||false}
            onChange={inputData.onChange?e=>inputData?.onChange(e):null}
            placeholder={inputData.placeholder}
            onKeyDown={(e)=>handleKey(e)}
            checked={inputData.checked}
            />           
           }

           {(inputData.label!=='off'&&['radio', 'checkbox'].includes(inputData.type))&&<label htmlFor={inputData.id||inputData.name}>{inputData.label||inputData.name[0].toUpperCase() + inputData.name.slice(1)}</label>}          

        </>
     );
}
 
export default FormField;