const SelectField = ({inputData}) => {
    return ( 
        <>
            {<label htmlFor={inputData.id||inputData.name}>{inputData.label||inputData.name[0].toUpperCase() + inputData.name.slice(1)}</label>}          
            
            {<select
            name={inputData.name}
            id={inputData.id||inputData.name}
            required={inputData.required}
            onChange={inputData.onChange?e=>inputData?.onChange(e):null}
            multiple={inputData.multiple||false}
            defaultValue={inputData.defaultValue}
            >
                <option value='' >Select option</option>
                {inputData?.options&&inputData.options.map((el, index)=>{
                    return <option key={index} value={el}>{el}</option>
                })}
            </select>
           
           }
        </>
     );
}
 
export default SelectField;