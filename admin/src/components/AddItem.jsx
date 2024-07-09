import React from 'react'
import Container from './Container'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const AddItem = () => {
  const navigate=useNavigate()
const[productName,setProductName]=useState(null);
const[productCategory,setProductCategory]=useState(0);
const[productPrice,setProductPrice]=useState(0);
const[productRating,setProductRating]=useState(null);
const[productImg,setProductImg]=useState(null);
const[file,setFile]=useState(null);
const[productDesc,setProductDesc]=useState(null);

    const fromData=new FormData()
    fromData.append('file',file)
    fromData.append('productName',productName)
    fromData.append('productCategory',productCategory)
    fromData.append('productRating',productRating)
    fromData.append('productDesc',productDesc)
    fromData.append('productPrice',productPrice)
   
    const base64Conv=(e)=>{
      const file=e.target.files[0]
      const reader=new FileReader()
      reader.readAsDataURL(file)
      reader.onload=()=>{setProductImg(reader.result) }
     reader.onerror=(err)=>{console.log(err) }
    }

    const sendToDB=async()=>{
       await axios.post("https://mychoice-multer.vercel.app/mychoice/product",fromData)
        .then((res)=>{
          console.log(res.data)
          navigate('/')
        })
        .catch((err)=>{
          console.log(err)
        })
   }
  return (
    <div className='container'>
          <Container/>
          <div className='addItem'>
          <div className='imageUploader'>
          
          <h2 style={{padding:"20px",fontSize:"20px",color:"green",fontWeight:"700"}}>Add Product (MyChoice)</h2>
          <input type="text" onChange={(e)=>{setProductName(e.target.value)}} placeholder='Product Name *'/><br/>
          <input type="number" onChange={(e)=>{setProductPrice(e.target.value)}} placeholder='Product price *'/><br/>
          <input type="number" onChange={(e)=>{setProductCategory(e.target.value)}} placeholder='Product category *'/><br/>
          <input type="number" onChange={(e)=>{setProductRating(e.target.value)}} placeholder='Product rating *'/><br/>
          <input type="text" onChange={(e)=>{setProductDesc(e.target.value)}} placeholder='Product desc *'/><br/>
          <label htmlFor='image' className='label'>{productImg?<><img  src={productImg} className='imageSrc ' /><h3 style={{color:"red"}}>Click to Change</h3></>:<div className='file-label'>upload</div>}</label><br/>
          <input type="file"  onChange={(e)=>{
             setFile(e.target.files[0])
             base64Conv(e)
            } 
          }
          name='image' id="image" /><br/>
          <input type='submit'onClick={sendToDB} className='submitBtn'/>
          
       </div>
          </div>
    </div>
  )
}

export default AddItem