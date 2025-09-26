import {readFile,writeFile} from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";
const filePath = "/data/marketTypes.json"
interface MarketType{
    id:number,
    city:string,
    district:string,
    market:string
}
type QueryMarketType = Partial<Pick<MarketType, 'id' | 'city'>>;
export type MarketTypeWithoutId = Omit<MarketType, 'id'>;
//查询所有市场类型
export async function getAllMarketTypes():Promise<MarketType[]>{
    try {
        const fileJSONStr= await readFile(path.join(process.cwd(),filePath),'utf8');
        return JSON.parse(fileJSONStr);
    } catch (error) {
        console.error(error)
        return []
    }
}
//根据id或name查询市场类型
export async function getMarketTypesByIdName({query}:{query:QueryMarketType}){
    try {
        const allMarketTypes = await getAllMarketTypes();
        return allMarketTypes.filter(item=>{
            const matchesId = query.id === undefined || query.id === item.id;
            const matchesCity = query.city === undefined || query.city === item.city;
            return matchesId && matchesCity;
        });
    } catch (error) {
        console.error(error)
        return []
    }
}
//修改市场类型
export async function editMarketType({newMarketType}:{newMarketType:MarketType}){
    try {
        const allMarketTypes=await getAllMarketTypes();
        const targetIndex = allMarketTypes.findIndex(item=>item.id===newMarketType.id)
        if(targetIndex>=0){
             allMarketTypes.splice(targetIndex,1,newMarketType)
             writeFile(path.join(process.cwd(),filePath),JSON.stringify(allMarketTypes,null,2),'utf8')
        }
    } catch (error) {
        console.error(error)
    }
}
//删除市场类型
export async function deleteMarketType({id}:{id:number}){
    try {
        const allMarketTypes=await getAllMarketTypes();
        const targetIndex = allMarketTypes.findIndex(item=>item.id===id)
        if(targetIndex>=0){
             allMarketTypes.splice(targetIndex,1)
             writeFile(path.join(process.cwd(),filePath),JSON.stringify(allMarketTypes,null,2),'utf8')
        }
    } catch (error) {
        console.error(error)
    }
}
//新增市场类型
export async function addMarketType({marketType}:{marketType:MarketTypeWithoutId}){
    try {
        const allMarketTypes=await getAllMarketTypes();
        writeFile(path.join(process.cwd(),filePath),JSON.stringify([...allMarketTypes,{id:randomUUID(),...marketType}],null,2),'utf8')
    } catch (error) {
        console.error(error)
    }
}