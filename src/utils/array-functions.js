export function newArrayfromIndexes(indexes,arr){
    const newArray = [];
    if(arr.length > 4){
        for(let i = 0; i <= indexes.length-1; i++){
            newArray.push(arr[indexes[i]]);
        }
        return newArray;
    }
    return arr;
}

export function queryJSONObject(query, obj){
    //write this function put later! See if you can get it to O(1)!
}