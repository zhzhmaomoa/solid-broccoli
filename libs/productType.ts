import productTypes from "../data/productTypes.json";
import fs from "fs";
interface ProductType{
    name:String,
    unit:Array<String>,
    pic:String,
    description:String
}
export function getProductTypes():Array<ProductType>{   
    return productTypes;
}
export function getUnitByProductType(productType:string):Array<String>{
    const product=productTypes.find((item:ProductType)=>item.name===productType);
    if(product){
        return product.unit;
    }
    return [];
}
export function addProductType(productType:ProductType):void{
    fs.writeFileSync("../data/productTypes.json",JSON.stringify([...productTypes,productType],null,2));
}