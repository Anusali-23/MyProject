function displayProduct(products){
    
   return `<div class="new">
     <h3>${products.product_name}</h3>
     <img src="${products.imgsrc}">
     <span>₹${products.price}</span><button onclick="addToCart('${products.product_id}','${products.product_name}','${products.imgsrc}',${products.price})">add-to-cart</button>
   </div>`

}
function myFunction(filter_id){

let cvalue=getCookie("username")
if(!(cvalue===null)&&!(cvalue===""))
{
    if(!(localStorage.getItem("finalHTML")===null))
    {
        document.getElementById("flexOutput").innerHTML=localStorage.getItem("finalHTML")
    }
    let qtyArr=localStorage.getItem("qty").split(",")

    let prodArray=localStorage.getItem("productsArray").split(",")

    for(let i=0 ;i<prodArray.length; i++ )
    {
        document.getElementById(`i${prodArray[i]}`).value=qtyArr[i]
    }
}
    
fetch("myProducts.json").then((response)=>response.json()).then((myObject)=>{
    for(let k in myObject){
        if(myObject[k].filter_id===filter_id){
            let arr =myObject[k].products;
            let productHTML="";
            for(let j in arr){
                productHTML+=displayProduct(arr[j]);
            }
            
            document.querySelectorAll(".myRow")[0].innerHTML = productHTML;
            document.querySelectorAll(".myRow")[0].style.display="flex";
            document.querySelectorAll(".myRow")[0].style.flexWrap="Wrap";
            document.querySelectorAll(".myRow")[0].style.justifyContent="center";
            document.querySelectorAll(".myRow")[0].style.backgroundColor="lightpink"
            // document.querySelectorAll(".myRow")[0].style.style.margin="10px"
            document.querySelectorAll(".myRow")[0].style.padding="5px"
            document.querySelectorAll(".myRow")[0].style.width="1100px"


           
                                                       
            }

    }
})
}


function addToCart(product_id,product_name,imgSrc,price)
{

let myCookie=getCookie("username")

let productsString=localStorage.getItem("productsArray")

if((myCookie!="")&&(myCookie!=null))
{
    
       let productsString=localStorage.getItem("productsArray")

       let prodArray=productsString.split(",")

       if(prodArray.indexOf(String(product_id))!=-1)
       {

        alert("product already in cart")
       }

    else
    {
    productsString+=","+product_id

    localStorage.setItem("productsArray",productsString)
    let newDiv=document.createElement("div")

    

    newDiv.id=product_id

    let productNameLabel=document.createElement("label")
    let productLabelText=document.createTextNode("product Name :")
    productNameLabel.appendChild(productLabelText)

    newDiv.appendChild(productNameLabel)

    let nameSpan=document.createElement("span")
    let nameText=document.createTextNode(product_name)
    nameSpan.appendChild(nameText)
    nameSpan.style.marginLeft="20px"
    newDiv.appendChild(nameSpan)

    let myBr=document.createElement("br")
    newDiv.appendChild(myBr)

    let quantityLabel=document.createElement("label")
    let quanLabelText=document.createTextNode("Quantity:")
    quantityLabel.appendChild(quanLabelText)
    newDiv.appendChild(quantityLabel)

    let currentHTML=newDiv.innerHTML
    let inputHTML= `<input style="margin-left:10px; text-align:center;" type="number" id="i${product_id}" value="1" onchange="populateQuantity()">`
    currentHTML+=inputHTML
    newDiv.innerHTML=currentHTML

    let myBr2=document.createElement("br")
    newDiv.appendChild(myBr2)

    let priceLabel=document.createElement("label")
    let priceText=document.createTextNode("price :")
    priceLabel.appendChild(priceText)

    newDiv.appendChild(priceLabel)
    let priceSpan=document.createElement("span")
    let priceSpanText=document.createTextNode(`₹${price}`)
    priceSpan.style.marginLeft="90px"

    priceSpan.appendChild(priceSpanText)
    newDiv.appendChild(priceSpan)

    let myBr3=document.createElement("br")

    newDiv.appendChild(myBr3)

    let myHr=document.createElement("hr")

    newDiv.appendChild(myHr)


    let newDivInnerHTML=newDiv.innerHTML
    let myDelButton=`<button class="badge badge-pill badge-danger" style="padding:10px;" onclick="removeItem(${product_id})"><i class="bi bi-trash3-fill"></i></button> `
    newDivInnerHTML+=myDelButton
    newDiv.innerHTML=newDivInnerHTML

    let myButtons=document.getElementById("buttons")

    let myContainer=document.getElementById("flexContainer")
    myContainer.insertBefore(newDiv,myButtons)


    let flexOutput=document.getElementById("flexOutput")

    flexOutput.replaceChild(myContainer,document.getElementById("flexContainer"))

    localStorage.setItem("finalHTML",flexOutput.innerHTML)

    

    populateQuantity()

    let newImgArr=localStorage.getItem("imgSrcs").split(",")
    newImgArr.push(imgSrc)
    localStorage.setItem("imgSrcs",newImgArr)

    let newPriceArr=localStorage.getItem("prices").split(",")
    newPriceArr.push(price)
    localStorage.setItem("prices",newPriceArr)



    }

}
else
{
let uname=prompt("Introduce Yourself")
if(!(uname===null)&&!(uname===""))
{
 setCookie("username",uname)

 localStorage.setItem("finalHtml","")
 let productsArray=""
 localStorage.setItem("qty","")

 
 productsArray=product_id

 localStorage.setItem("productsArray",productsArray)


returnDiv=`<div id="flexContainer">
<h2>Welcome,${uname}</h2>
<div id="${product_id}">
<label>Product_name:</label><span  style="margin-left:20px;">${product_name}</span><br>
<label>Quantity:</label><input style ="margin-left:10px;text-align:center;" type="number"  id="i${product_id}" value="1" onchange="populateQuantity()"><br>
<label>Price:</label><span style="margin-left:90px;">₹${price}</span><br>
<hr><button onclick="removeItem(${product_id})" style="padding:10px;" class="badge badge-pill badge-danger"><i class="bi bi-trash3-fill"></i></button></div>
<div id="buttons">
<button class="btn btn-danger" onclick="ClearCart()" style="float:left;margin:auto auto auto 10px;">ClearCart</button>
<button class="btn btn-success" style ="float:right;margin:auto 10px auto auto;" onclick="checkOut()" >check-out</button></div></div>`

localStorage.setItem("finalHTML",returnDiv)

let myPriceArray=new Array()
myPriceArray.push(price)

localStorage.setItem("prices",myPriceArray)

let myImageSrcs=new Array()
myImageSrcs.push(imgSrc)

localStorage.setItem("imgSrcs",myImageSrcs)

document.getElementById("flexOutput").innerHTML=returnDiv


document.getElementById("flexOutput").innerHTML=returnDiv

populateQuantity()

}



}
}

function setCookie(cname,cvalue){
    let myCookie=cname+"="+cvalue 

    let d=new Date()
    d.setMinutes(d.getMinutes()+2)

    document.cookie=myCookie+";expires="+d.toUTCString()+";path=/"

}

function getCookie(cname)
{
    let myCookie=cname+"="

    let allCookies=decodeURIComponent(document.cookie)
    
    let cookieArray=allCookies.split(";")

    for(let k=0; k<cookieArray.length; k++)
    {
        if (cookieArray[k].indexOf(myCookie)!=-1)
       {
        let cvalue=cookieArray[k].substring(cookieArray[k].indexOf("=")+1)

        if(cvalue==="")
        {
            continue
        }
        else
        {
            return cvalue
        }
        
       }
    }
    return ""
}

function removeItem(product_id)
{
    let productsString=localStorage.getItem("productsArray")
    

    let productsArray=productsString.split(",")
    let qty=localStorage.getItem("qty").split(",") 
    let imgSrcArr=localStorage.getItem("imgSrcs").split(",")
    let priceArr=localStorage.getItem("prices").split(",")
   

    let removePosition=productsArray.indexOf(`${product_id}`)

    productsArray.splice(removePosition,1)
    qty.splice(removePosition,1)
    imgSrcArr.splice(removePosition,1)
    priceArr.splice(removePosition,1)
    

    localStorage.setItem("productsArray",productsArray)
    localStorage.setItem("qty",qty)
    localStorage.setItem("imgSrcs",imgSrcArr)
    localStorage.setItem("prices",priceArr)
    

    if(productsArray.length===0)
    {

        d=new Date()
        d.setMonth(d.getMonth()-1)
        document.cookie="username=;expries="+d.toUTCString()+";path=/"
        localStorage.setItem("productsArray","")
        document.getElementById("flexOutput").innerHTML=""
        localStorage.setItem("finalHTML","")
        localStorage.setItem("qty","")
        localStorage.setItem("imgSrcs","")
        localStorage.setItem("prices","")

    }

    else
    {
      let finalOutput=document.getElementById("flexOutput")
      let container=document.getElementById("flexContainer")
      let child=document.getElementById(`${product_id}`)
      container.removeChild(child)

      finalOutput.replaceChild(container,document.getElementById("flexContainer"))

      let finalHTML=finalOutput.innerHTML

      document.getElementById("flexOutput").innerHTML=finalHTML
      localStorage.setItem("finalHTML",finalHTML)

      let qtyArr=localStorage.getItem("qty").split(",")

    let prodArray=localStorage.getItem("productsArray").split(",")

    for(let i=0 ;i<prodArray.length; i++ )
    {
        document.getElementById(`i${prodArray[i]}`).value=qtyArr[i]
    }


    }
}

function populateQuantity()
{

    let prodArray=localStorage.getItem("productsArray").split(",")

    

    let len=prodArray.length
    let qtyArr=new Array()


    for(let k=0; k<len; k++)
    {

        if(document.getElementById(`i${prodArray[k]}`).value!="")
        {
            qtyArr[k]=document.getElementById(`i${prodArray[k]}`).value
        }
        else{
            qtyArr[k]=1
        }
    }

    localStorage.setItem("qty",qtyArr)
}

function ClearCart (){

    d=new Date()
    d.setMonth(d.getMonth()-1)
    document.cookie="username=;exprires="+d.toUTCString()+";path=/"
    localStorage.setItem("productsArray","")
    document.getElementById("flexOutput").innerHTML=""
    localStorage.setItem("finalHTML","")
    localStorage.setItem("qty","")
    localStorage.setItem("prices","")
    localStorage.setItem("imgSrcs","")

}

function checkOut()
	{
    
		let myImageArr=localStorage.getItem("imgSrcs").split(",");
		let qtyArr=localStorage.getItem("qty").split(",");
		let priceArr=localStorage.getItem("prices").split(",");

    
		
		let myTable=`<table>
                  <tr>
                    <th class="table-product-heading text-center">Product</th>
                    <th class="table-items-heading text-center">Quantity</th>
                    <th class="table-items-heading text-center">Price</th>
                    <th class="table-total-heading text-center">Total</th>
                  </tr>`;
		let grandTotal=0;
		
		for(let i=0;i<myImageArr.length;i++)
		{
      let amount=Number(qtyArr[i])*Number(priceArr[i]);
      grandTotal+=amount;
      myTable+=`<tr>
                  <td class="table-product-content">
                    <img src="${myImageArr[i]}" style="width:100px;height:100px;object-fit:cover;border:1px solid white;">
                  </td>
                  <td class="table-product-items">
                    ${qtyArr[i]}
                  </td>
                  <td class="table-product-items">
                    ₹${priceArr[i]}
                  </td>
                  <td class="table-product-total">
                    ₹${amount}
                  </td>
                </tr>`;	
    }
		
      myTable+=`<tr>
                  <td colspan="3" style="text-align:center;">
                    Grand Total
                  </td>
                  <td class="table-total-heading">
                    ₹${grandTotal}
                  </td>
                </tr>
              </table>`;
		let billDiv=`<div id="billTable">
                  <h2 style="color:rgb(91, 21, 60)">Your Final Bill:</h2>
                  ${myTable}
                  </div>

                  <div id="buttons2" style="boder=0px">
                
                  <button id="backToCart" class="btn btn-danger" onclick="goBack()" style="float:left;margin:7px auto auto 34px;">
                    Back
                  </button>
                  <button class="btn btn-success" id="pay" onclick="proceedPayment(${grandTotal})" style="float:right;margin:7px 34px auto auto;">
                    Proceed To Pay
                  </button>
                </div>
		            <div id="bankInfo" class="bg-info"></div>`;

    
					  
		document.getElementById("finalBill").style.display="block";
		document.getElementById("finalBill").innerHTML=billDiv;
	}

  function goBack()
	{
		document.getElementById("finalBill").innerHTML=""
		document.getElementById("finalBill").style.display="none"
	
	}

  function proceedPayment(total)
	{
	let cardDiv=`<img src="visa.webp"><img src="mastercard.png"><img src="sbi.png"><img src="rupay.jpg">`
	cardDiv+=`<H4 style="margin:10px auto auto auto">Amount Payable:₹${total}</H4>`
	
	cardDiv+=`<div style="width:510px;margin:auto;"><div style="float:left;margin:10px auto auto auto;"><label>Card Number:</label><input type="text" style="width:50px;text-align:center;" maxlength="4">-<input type="text" style="width:50px;text-align:center;" maxlength="4">-<input type="text" style="width:50px;text-align:center;" maxlength="4">-<input type="text" style="width:50px;text-align:center;" maxlength="4"></div>`
	cardDiv+=`<div style="margin:10px 10px auto auto;float:right;">CVV/CVV2:<input type="password" style="appearance:none;padding-left:15px;width:70px;background-image:url('images/lock-fill.svg');background-size:15px auto;background-position:1px 5px;background-repeat:no-repeat;" maxlength="3"></div></div>`
	cardDiv+=`<div style="margin:10px auto auto auto;clear:left;"><label>Valid thru:</label><input type="text" style="width:40px;text-align:center;margin-top:10px;" maxlength="2">/<input type="text" style="width:40px;text-align:center;margin-top:10px;" maxlength="2"></div><hr style="margin:0px;padding:0px;">`
	cardDiv+=`<button class="btn btn-success" onclick="paymentSuccessfull()" style="float:right;margin-right:15px;">Confirm payment</button>`
	document.getElementById("bankInfo").innerHTML=cardDiv
	
	
	
	$("#bankInfo").slideDown(3000)
	}
	
	
	function paymentSuccessfull()
	{
		alert("Thank you for shopping with us. Your order will be delivered shortly")
		clearCart()
		document.getElementById("finalBill").innerHTML=""
		document.getElementById("finalBill").style.display="none"
	}
