


export function AddPlansapi(planData){
    return new Promise(async(resolve)=>{
        const response= await fetch('http://localhost:8080/plans',{
        method : 'POST',
        body: JSON.stringify(planData),
        headers:{'content-type':'application/json' }
        });
        const data=await response.json();
        resolve({data});
    });
}

export function fetchAllPlans(){
    
   
    return new Promise(async(resolve)=>{
        const response=await fetch('http://localhost:8080/plans')
        const data=await response.json()
        resolve({data})
        console.log({data})
        if(response.ok){
          console.log('correct')
        }
        else {
          console.log('incorrect')
        }
        
    });
}

export function deletePlans(planid) {
  return new Promise(async (resolve) => {
    const response = await fetch(`http://localhost:8080/plans/${planid}`, {
      method: 'DELETE',
      headers: { 'content-type': 'application/json' },
    });
    console.log(planid)
    const data = await response.json();
    resolve({ data });
  });
}
export function updatePlans(planData){
    
  return  new Promise(async(resolve)=>{
    const response=await fetch(`http://localhost:8080/plans/${planData._id}`,{
      method:'PATCH',
      body:JSON.stringify(planData),
      headers:{'content-type':'application/json'}
    });
    const data=await response.json();
    resolve({data});
    console.log(`http://localhost:8080/plans/${planData._id}`)
  }
  

  )
}



