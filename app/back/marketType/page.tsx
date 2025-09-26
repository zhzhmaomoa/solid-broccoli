import { getMarketTypesByIdName } from "@/libs/marketType"
import Link from "next/link";
export default async function Page(){
    const marketTypes = await getMarketTypesByIdName({query:{}});
    return (<>
        <table>
            <thead>
                <tr>
                    <th>city</th>
                    <th>district</th>
                    <th>market</th>
                    <th>edit</th>
                    <th>delete</th>
                </tr>
            </thead>
            <tbody>
                {
                    marketTypes.map(i=>{
                        return (
                            <tr key={i.id}>
                                <td>{i.city}</td>
                                <td>{i.district}</td>
                                <td>{i.market}</td>
                                <td>
                                    <Link href="">编辑</Link>
                                    <Link href="">删除</Link>
                                </td>
                            </tr>
                        )
                        
                    })
                }
            </tbody>
        </table>
        <Link href="marketType/add">新增</Link>
    </>)
}