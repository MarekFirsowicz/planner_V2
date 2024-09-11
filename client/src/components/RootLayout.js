import { useReducer, useEffect} from "react";
import { NavLink, Outlet, createSearchParams, useLoaderData, useNavigate} from "react-router-dom";
// import { useLogout } from "../hooks/useLogout"

export default function RootLayout() {
    const navigate = useNavigate()
    /*const calendars = useLoaderData()
    const calendarReducer = (state, action) => {
        switch (action.type) {
            case 'NEXT':
                if (state.currentIndex === (state.dataLength) - 1) {
                    return { ...state }
                }
                else {
                    return { ...state, year: calendars[state.currentIndex + 1], currentIndex: state.currentIndex + 1 }
                }
            case 'PREV':
                if (state.currentIndex === 0) { return { ...state } }
                return { ...state, year: calendars[state.currentIndex - 1], currentIndex: state.currentIndex - 1 }
            case 'UPDATE':
                return { ...state, year: calendars[state.currentIndex] }
            
            default:
                return state
        }
    }
    
    const initialState = {year: calendars[findCalendarIndex(calendars)]||calendars[calendars.length-1], 
        dataLength: calendars.length, 
        currentIndex: findCalendarIndex(calendars)>-1
        ?findCalendarIndex(calendars)
        :parseInt(calendars.length-1) }

    const [state, dispatch] = useReducer(calendarReducer, initialState)
    
    useEffect(()=>{
        dispatch({type:'UPDATE'})
    },[calendars])
    
    const { logout } = useLogout()

    const calendar = state.year

    */

    const logout =()=>{
        localStorage.removeItem('user')
        console.log('log')
        navigate("/login", { replace: true});
    }
    return (
        <div className="root-layout">
            <header>
                <nav>
                    <NavLink to='/'>Home</NavLink>
                    {/* <NavLink to={{
                        pathname: 'staff/',
                        search: `?${createSearchParams({ start: state.year.startCalendar, end: state.year.endCalendar, page:1,limit:30 })}`
                    }}

                
                    >Staff</NavLink>*/
                }
                    <NavLink to='/staff/'>Staff</NavLink>
                    <NavLink to='/report/'>Report</NavLink>
                    <NavLink to='/admin/'>Admin</NavLink> 
                </nav>
                {/* <div className='activeYear'>
                    <button disabled={state.currentIndex > 0 ? false : true} onClick={() => dispatch({ type: 'PREV' })} ><i className="fa-solid fa-chevron-left"></i></button>
                    <div>{state.year.startCalendar.slice(0, 4)}/{state.year.endCalendar.slice(0, 4)}</div>
                    <button disabled={state.currentIndex < state.dataLength - 1 ? false : true} onClick={() => dispatch({ type: 'NEXT' })} ><i className="fa-sharp fa-solid fa-chevron-right"></i></button>
                </div>*/
                <button onClick={logout}><i className="fa-solid fa-right-from-bracket"></i></button> 
                }

            </header>

            
            <main>
                <Outlet  />
            </main>
        </div>
    );
}

function findCalendarIndex(calendars){
    const now = new Date().setHours(0,0,0,0)
    return calendars.findIndex(item => now >= new Date(item.startCalendar).setHours(0,0,0,0)  && now <= new Date(item.endCalendar).setHours(0,0,0,0))
}



