export function placeOrder(orderData){
    return new Promise(async (resolve)=>{
        const response=await fetch('http://localhost:8080/order',{
            method:'POST',
            body:JSON.stringify(orderData),
            headers:{'content-type':'application/json'}
        })
        const data=await response.json();
        resolve({data})
        console.log({data})
        console.log(orderData)
    })
}


export function fetchAllOrder(adminid) {
    return new Promise(async (resolve) =>{
     
      const response = await fetch(`http://localhost:8080/order/${adminid}`)
      const data = await response.json()
      resolve({data})
      console.log({data})
      console.log(adminid)
    });
  }