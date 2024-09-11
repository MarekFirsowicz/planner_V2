

const Paginate = ({pagination, query, setQuery}) => {
    const recordsNo = 10
    const {pageNo,total, pages} = pagination
    const startPage = Math.floor((pageNo-1)/recordsNo)*recordsNo;
    const data = recordsNo<pages-startPage?recordsNo:pages%recordsNo
    const paginationData = [...Array(data)].map((el,index)=>startPage+index+1)
    
    function updateURL(update){
        const updatedParams = new URLSearchParams(query.toString());
        updatedParams.set(Object.keys(update), Object.values(update))
        setQuery(updatedParams.toString())
    }

    return ( 
        <tr>
            <th colSpan={'100%'} className="pagination">                
                {pageNo>recordsNo&&
                    <>
                        <button onClick={()=>updateURL({page:pageNo-1})}><i className="fa-solid fa-circle-chevron-left"></i></button>
                        <button onClick={()=>updateURL({page:1})}>1</button>
                        <span> ... </span>
                    </>
                }
                {paginationData?.map(el=><button disabled={pageNo===el} onClick={()=>updateURL({page:el})} className="paginationBtn" key={el}>{el}</button>)}
                {recordsNo<pages-startPage&&
                    <>
                        <span> ... </span>
                        <button onClick={()=>updateURL({page:pages})}>{pages}</button>
                        <button onClick={()=>updateURL({page:pageNo+1})}><i className="fa-solid fa-circle-chevron-right"></i></button>                
                    </>
                }                
            </th>
        </tr> 
    );
}
 
export default Paginate;