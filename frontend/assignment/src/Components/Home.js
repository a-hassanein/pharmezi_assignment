import '../Style/Home.css';
import { useState } from "react";
import axios from "axios";
import * as XLSX from 'xlsx';
import { Link } from "react-router-dom";
function Home() {
    const [newDiscount, setNewDiscount] = useState([])

    // Use Sheet.js
    const readExcel = (file) => {
        const promise = new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsArrayBuffer(file);
            fileReader.onload = (e) => {
                const bufferArray = e.target.result;
                const wb = XLSX.read(bufferArray, { type: 'buffer' });
                const wsname = wb.SheetNames[0];
                const ws = wb.Sheets[wsname];
                const data = XLSX.utils.sheet_to_json(ws)
                resolve(data);
            };
            fileReader.onerror = (error) => {
                reject(error);
            };
        });

        promise.then((d) => {
            console.log(d);
            setNewDiscount(d);
            console.log(d.length);
        })
    };


    // Update table seller_products by axios
    const handleAddNewDiscount = (d) => {
        try {
            for (let i in newDiscount) {
                console.log(newDiscount[i].PHRItemID);
                console.log(newDiscount)

                axios.put(`http://127.0.0.1:8000/discount/discount/${newDiscount[i].PHRItemID}`, {
                    product: newDiscount[i].PHRItemID,
                    discount: newDiscount[i].Discount,
                }).then((response) => {
                    console.log(response.data)
                })
            }

        } catch (error) {
            console.log(error)
        }
    };

    return (
        <>
            <section className='container formPart text-center'>
                <div className='container '>
                <h1>PLease upload your new discount value file</h1>
                </div>
                <div className='row'>
                <ul>
                    <dt>*Must file format 'xlsx' or 'csv'</dt>
                    <dt>*File Must have 2 column:</dt>
                    <dd>- Discount</dd>
                    <dd>- PHRItemID</dd>
                </ul>
                </div>  

                <form className='row text-center'>
                    <div className='row btn-wrap' id='formInput'>
                        {/* <label class="btn" for="upload">Upload File</label> */}
                        <div className='input'></div>
                        <input type="file" onChange={(e) => {
                            const file = e.target.files[0];
                            readExcel(file)
                        }} />
                        <Link to={'#'} type="btn" className='btn sub_btn' onClick={handleAddNewDiscount}>upload</Link>
                    </div>
                </form>

            </section>
        </>

    )
}

export default Home