import { view } from "../helper/backendUtilities.js"



export default{
    index : (req, res)=>{
        view('index.html', res);
        
    }
}