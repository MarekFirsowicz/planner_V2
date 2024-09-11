import { useLoaderData, useSearchParams} from "react-router-dom";
import StaffHeader from "./StaffHeader";
import StaffRow from "./StaffRow";
import Paginate from "./Paginate";


const Staff = () => {
    const [query, setQuery] = useSearchParams();

    const staff = useLoaderData()
    const headers = (staff?.employees.length>0&&(Object.keys(staff.employees[0])))||[]
   console.log(staff)
    return ( 
        <table className="basicTable">
            <thead>
            <Paginate query={query} setQuery={setQuery} pagination={staff.pagination} />
            <StaffHeader headers={headers}/></thead>
            <tbody>
            {staff?.employees.map((record) => (
                    <StaffRow  record={record} key={record.Edit} />
                ))}
            </tbody>
        </table>
     );
}
 
export default Staff;