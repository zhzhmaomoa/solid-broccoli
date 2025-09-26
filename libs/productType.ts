import {readFile,writeFile} from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";
const filePath = "/data/productTypes.json"
interface ProductType{
    id:number,
    name:string,
    unit:Array<string>,
    pic:string,
    description:string
}
type QueryProductType = Partial<Pick<ProductType, 'id' | 'name'>>;
type ProductTypeWithoutId = Omit<ProductType, 'id'>;
//查询所有产品类型
export async function getAllProductTypes():Promise<ProductType[]>{
    try {
        const fileJSONStr= await readFile(path.join(process.cwd(),filePath),'utf8');
        return JSON.parse(fileJSONStr);
    } catch (error) {
        console.error(error)
        return []
    }
}
//根据id或name查询产品类型
export async function getProductTypesByIdName({query}:{query:QueryProductType}){
    try {
        const allProductTypes = await getAllProductTypes();
        return allProductTypes.filter(item=>{
            const matchesId = query.id === undefined || query.id === item.id;
            const matchesName = query.name === undefined || query.name === item.name;
            return matchesId && matchesName;
        });
    } catch (error) {
        console.error(error)
        return []
    }
}
//修改产品类型
export async function editProductType({newProductType}:{newProductType:ProductType}){
    try {
        const allProductTypes=await getAllProductTypes();
        const targetIndex = allProductTypes.findIndex(item=>item.id===newProductType.id)
        if(targetIndex>=0){
             allProductTypes.splice(targetIndex,1,newProductType)
             writeFile(path.join(process.cwd(),filePath),JSON.stringify(allProductTypes,null,2),'utf8')
        }
    } catch (error) {
        console.error(error)
    }
}
//删除产品类型
export async function deleteProductType({id}:{id:number}){
    try {
        const allProductTypes=await getAllProductTypes();
        const targetIndex = allProductTypes.findIndex(item=>item.id===id)
        if(targetIndex>=0){
             allProductTypes.splice(targetIndex,1)
             writeFile(path.join(process.cwd(),filePath),JSON.stringify(allProductTypes,null,2),'utf8')
        }
    } catch (error) {
        console.error(error)
    }
}
//新增产品类型
export async function addProductType({productType}:{productType:ProductTypeWithoutId}){
    try {
        const allProductTypes=await getAllProductTypes();
        writeFile(path.join(process.cwd(),filePath),JSON.stringify([...allProductTypes,{id:randomUUID(),...productType}],null,2),'utf8');
        writeFile(path.join(process.cwd(),"/data/price/",productType.name+'.json'),JSON.stringify([],null,2),'utf8')
    } catch (error) {
        console.error(error)
    }
}