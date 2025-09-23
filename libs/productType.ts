import {readFile,writeFile} from "fs/promises";
const filePath = "../data/productTypes.json"
interface ProductType{
    id:number,
    name:string,
    unit:Array<string>,
    pic:string,
    description:String
}
type QueryProductType = Partial<Pick<ProductType, 'id' | 'name'>>;
//查询产品类型
export async function getProductTypes(query:QueryProductType):Promise<ProductType[]>{
    try {
        const allProductTypes:Array<ProductType> = await readFile(filePath)
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
export async function editProductType(newProductType:ProductType):Promise<void>{
    try {
        
    } catch (error) {
        
    }
}
//删除产品类型
export function deleteProductType({id:number}){
    writeFile(filePath,JSON.stringify([...productTypes,productType],null,2));
}
//新增产品类型
export function addProductType(productType:ProductType):void{
    writeFile(filePath,JSON.stringify([...productTypes,productType],null,2));
}