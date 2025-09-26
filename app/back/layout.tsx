import Link from 'next/link'
export default function Layout({children}: Readonly<{children: React.ReactNode}>){
    return <div className="grid grid-cols-[23vw_77vw]">
        <div>
            <nav className="flex flex-col">
                <Link href="/back/marketType">marketType</Link>
                <Link href="/back/productType">productType</Link>
                <Link href="/back/priceHouse">priceHouse</Link>
            </nav>
        </div>
        <div>
            {children}
        </div>
    </div>
}