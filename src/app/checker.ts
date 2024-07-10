export function popolato(valore : any) : boolean{
    if(typeof valore === "number"){
        if(isNaN(valore) || valore===null || valore===undefined) return false
        return true
    } else if(typeof valore === "string"){
        if(valore=== undefined || valore===null || valore==="") return false
        return true
    } else{
        if(valore===null || valore===undefined) return false
        return true
    }
   

}