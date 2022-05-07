// import '../Style/Home.css';
import { useState,useRef,useEffect,Fragment } from "react";
import axios from "axios";
import * as XLSX from 'xlsx';
import { Link } from "react-router-dom";
function Home() {
    const [newDiscount, setNewDiscount] = useState([])

    const readExcel=(file)=>{
        const promise= new Promise((resolve,reject)=>{
            const fileReader= new FileReader();
            fileReader.readAsArrayBuffer(file);
            fileReader.onload=(e)=>{
                const bufferArray=e.target.result;
                const wb=XLSX.read(bufferArray,{type:'buffer'});
                const wsname=wb.SheetNames[0];
                const ws=wb.Sheets[wsname];
                const data = XLSX.utils.sheet_to_json(ws)
                resolve(data);
            };
            fileReader.onerror=(error)=>{
                reject(error);
            };
        });

        promise.then((d)=>{
            console.log(d);
            setNewDiscount(d);
            console.log(d.length);
        })
    };

    const handleAddNewDiscount = (d) =>{ 
    // if (d.PHRItemID=discount){}
    
    try{
        
        for(let i in newDiscount){
            console.log(newDiscount[i].PHRItemID);
            console.log(newDiscount)
            
            axios.put(`http://127.0.0.1:8000/discount/discount/${newDiscount[i].PHRItemID}`, {
                product: newDiscount[i].PHRItemID,
                discount: newDiscount[i].Discount,
            }).then((response)=>{
                console.log(response.data)
            })
        }
  
    }catch(error){
        console.log(error)
    }
};
 
    return (

        <form>
            <div>
                <h1>PLease upload your new discount value file</h1>
            </div>
            <input type="file" onChange={(e)=>{
                const file=e.target.files[0];
                readExcel(file)
            }}/>
            <Link onClick={handleAddNewDiscount}>upload</Link>
        </form>
        
    )}

export default Home