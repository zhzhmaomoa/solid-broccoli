import {readFile,writeFile} from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";
const filePath = "/data/price"
function getCurrentProductFilePath({productName}:{productName:string}){
    return path.join(process.cwd(),filePath,productName+".json")
}
interface PriceType{
    id:number,
    price:number,
    date:string,
    unit:string,
    city:string,
    district:string,
    market:string
}
type QueryPriceType = Partial<Pick<PriceType, 'id' | 'city' | 'date'>>;
type PriceTypeWithoutId = Omit<PriceType, 'id'>;
//查询单个产品所有价格
export async function getAllPriceList({name}:{name:string}):Promise<PriceType[]>{
    const fileJSONStr = await readFile(getCurrentProductFilePath({productName:name}),'utf8');
    return JSON.parse(fileJSONStr);
}
//根据id或city或date查询单个产品的价格列表
export async function getPriceListByIdCityDate({productName,query}:{productName:string,query:QueryPriceType}):Promise<PriceType[]>{
    try {
        const allPriceList = await getAllPriceList({name:productName})
        return allPriceList.filter(item=>{
            const matchesId = query.id === undefined || query.id === item.id;
            const matchesCity = query.city === undefined || query.city === item.city;
            const matchesDate = query.date === undefined || query.date === item.date;
            return matchesId && matchesCity && matchesDate;
        });
    } catch (error) {
        console.error(error)
        return []
    }
}
//修改价格
export async function editPriceType({productName,newPriceType}:{productName:string,newPriceType:PriceType}){
    try {
        const allPriceList = await getAllPriceList({name:productName})
        const targetIndex = allPriceList.findIndex(item=>item.id===newPriceType.id)
        if(targetIndex>=0){
             allPriceList.splice(targetIndex,1,newPriceType)
             writeFile(getCurrentProductFilePath({productName}),JSON.stringify(allPriceList,null,2),'utf8')
        }
    } catch (error) {
        console.error(error)
    }
}
//删除价格
export async function deletePriceType({productName,id}:{productName:string,id:number}){
    try {
        const allPriceList = await getAllPriceList({name:productName})
        const targetIndex = allPriceList.findIndex(item=>item.id===id)
        if(targetIndex>=0){
             allPriceList.splice(targetIndex,1)
             writeFile(getCurrentProductFilePath({productName}),JSON.stringify(allPriceList,null,2),'utf8')
        }
    } catch (error) {
        console.error(error)
    }
}
//新增价格
export async function addPriceType({productName,priceType}:{productName:string,priceType:PriceTypeWithoutId}){
    try {
        const allPriceList = await getAllPriceList({name:productName})
        writeFile(getCurrentProductFilePath({productName}),JSON.stringify([...allPriceList,{id:randomUUID(),...priceType}],null,2),'utf8')
    } catch (error) {
        console.error(error)
    }
}