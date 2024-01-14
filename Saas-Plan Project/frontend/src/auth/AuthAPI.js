


export function createUser(userData){
    return new Promise(async(resolve)=>{
        const response=await fetch('http://localhost:8080/auth',{
            method:'POST',
            body:JSON.stringify(userData),
            headers:{'content-type':'application/json'}
        })
        const  data=await response.json();
        resolve({data})
    })
}

export function loginUser(userData){
    const name=userData.username;
    const pass=userData.password;
    const role=userData.role;
    return new Promise (async(resolve,reject)=>{
        const response=await fetch(`http://localhost:8080/auth?username=${name}&&password=${pass}&&role=${role}`)
        const data=await response.json();
        console.log(data.username)
        if(data){
            resolve({data:data});
        }
        else{
            reject({message: 'user not found'} )
        }
    })
}


export function updateUser(userData){
 return new  Promise(async(resolve)=>{
    const response=await fetch(`http://localhost:8080/auth/${userData._id}`,{
        method:'PATCH',
        body:JSON.stringify(userData),
        headers:{'content-type':'application/json'}
    })
    const data=await response.json();
    resolve({data})
    console.log(userData)
    console.log({data,"message":"2"})
 })
}

export function signOut(userData){
    return new Promise ((resolve)=>{
        resolve({data:'success'})
    })
}
export function fetchAllUser(){
    return new Promise(async(resolve)=>{
        const response=await fetch('http://localhost:8080/auth/admin');
        const  data=await response.json();
        resolve({data})
    })
}



