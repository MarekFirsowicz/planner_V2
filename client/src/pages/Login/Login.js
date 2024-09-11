import { useFetcher, redirect} from "react-router-dom";
import axios from 'axios';
const Login = () => {
    const fetcher = useFetcher()
    return ( 
                   
            <fetcher.Form className='basicForm login' action="/login" method="POST">
                <h1 className={`${fetcher?.data?.status===401&&'error'} header`}>{fetcher?.data?.status===401?'No Access':'Login'}</h1>
                
                <label>Login:</label>
                <input name="username" type="text"                
                required
                />
                
                <label>Password:</label>
                <input name="password" type="password"                
                required
                />
                
                <button disabled={fetcher.state==='submitting'?true:false}className="btnSubmit">Log In</button>
            </fetcher.Form>        
     );
}
 
export default Login;


export const loginUser = async({request})=>{
    //console.log('ok')
    const data = await request.formData()
    let {...values} = Object.fromEntries(data)
    try {
        const res = await axios.post('/auth/login/', values)   
        localStorage.setItem('user', JSON.stringify(res.data))  
        return redirect('/', { replace: true})
       
    } catch (err) {
        if(err?.response?.data?.status===401){
            return  {status:401, message:err?.response?.data?.message}
        }
        throw Error('cannot log in') 
    }   
}