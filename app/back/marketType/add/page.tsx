import { addMarketType,MarketTypeWithoutId } from "@/libs/marketType"
import { redirect } from 'next/navigation'
export default async function Page(){
    async function addMarketTypeAction(formData:FormData){
        'use server'
        try {
            const marketData = Object.fromEntries(formData.entries()) as MarketTypeWithoutId;
            await addMarketType({marketType:marketData});
        } catch (error) {
            console.error(error)
        }
        redirect("/back/marketType")
    }
    return (<>
        <form action={addMarketTypeAction} className="flex flex-col">
            <label>city:<input name="city" required></input></label>
            <label>district:<input name="district" required></input></label>
            <label>market:<input name="market" required></input></label>
            <button type="submit">submit</button>
        </form>
    </>)
}