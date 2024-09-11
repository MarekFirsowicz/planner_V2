const StaffHeader = ({headers}) => {
    console.log(headers)
    return ( 
        <tr>
            {headers.map((header) => {                
                return <th  key={header}>{header}<span>{header==='Shift'&&<button>x</button>}</span></th>
            })}

        </tr>
     );
}
 
export default StaffHeader;