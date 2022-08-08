console.log("Main.js")

if(navigator.serviceWorker){
    window.addEventListener('load',()=>{
        navigator.serviceWorker
        .register("serviceWorker.js")
        .then((reg)=>{
            console.log(`Successfully registered service worker : ${reg}`)
        }).catch((err)=>{
            console.log(`Failed to register.\nErr : ${err}`)
        });
    })
}