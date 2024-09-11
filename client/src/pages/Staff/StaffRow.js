import { capitals } from "../../utils";
import {Link} from "react-router-dom";


const StaffRow = ({record}) => {
    const capitalHeaders = ['Name', 'Surname']

    return ( 
        <tr>
            {Object?.entries(record).map((el, index) => {
                    let content
                if(el[0]==='Edit'){
                    content =<Link to={`/staff/${record.Edit}`}><i className="fa-solid fa-pen-to-square"></i></Link>
                }else if(capitalHeaders.includes(el[0])){
                    content = capitals(el[1])
                } 
                else if(el?.[0]==='Confirm'){
                    content = <div className="confirms" >{reduceComfirmed(el[1]).map(el=><div key={Object.keys(el)} className={Object.keys(el)}>{Object.values(el)}</div>)}</div>
                } 
                else{
                    content = el[1]||null
                }
                return (<td key={index}>
                            {content}
                        </td>)
            })}  

        </tr>
     );
}
 
export default StaffRow;

function reduceComfirmed (data){
    const filteredData= data.filter((item) => (
        item.confirmed===false||item.updated
        )).sort((a,b) => (a.eventName > b.eventName) ? 1 : ((b.eventName > a.eventName) ? -1 : 0))

    const summedBookings = filteredData.reduce((r, booking) => {
        const { eventName} = booking;
        if (!r[eventName]) {
            r[eventName] = 0;}
        r[eventName] += 1;      
        return r;
        }, {});

    let forHtml=[]
    for(const key in summedBookings){        
        forHtml.push({[key]:summedBookings[key]})
    }
    return forHtml
}
