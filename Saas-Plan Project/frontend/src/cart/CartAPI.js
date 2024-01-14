
export function addToCart(cartData){
    return new Promise(async (resolve)=>{
        const response=await fetch('http://localhost:8080/cart',{
            method:'POST',
            body:JSON.stringify(cartData),
            headers:{'content-type':'application/json'}
        })
        const data=await response.json();
        resolve({data})
        console.log({data})
        console.log(cartData)
    })
}


export function fetchItemsByUserId(userid) {
    return new Promise(async (resolve) =>{
     
      const response = await fetch(`http://localhost:8080/cart/${userid}`)
      const data = await response.json()
      resolve({data})
    });
  }

export function removeFromCart(_id){
    return new Promise(async(resolve)=>{
        const response=await fetch(`http://localhost:8080/cart/${_id}`,{
            method:'DELETE',
            headers:{'content-type':'application/json'}
        })
        const data=await response.json();
        resolve({data:{_id:_id}});
    });
}

