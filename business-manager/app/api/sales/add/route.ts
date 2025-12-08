import { sqlconnection } from "@/lib/mysql2";
import { SaleItem } from "@/types/sales";
import { NextResponse } from "next/server";

interface saleRecord {
    subtotal: number;
    totalAmount: number;
    customerName: string;
    platform: "whatsapp" | "instagram" | "tiktok" | "other";
    saleDate: string;
    shippingCost: number;
    discount: number;
    notes: string;
    items: SaleItem[];
}

export async function POST(request: Request) {
    try {
        const { saleRecord }: { saleRecord: saleRecord } = await request.json();

        if (saleRecord.items.length === 0) {
            return NextResponse.json({
                success: false,
                message: 'The length of items should be greater than one'
            }, { status: 400 })
        }

        const Ids:number[] = [];
        let whereClause: string = 'WHERE productId = ?'

        saleRecord.items.map((item, index) => {
            Ids.push(item.productId)
            console.log(item.productId)
            if (index !== 0) {
                whereClause += ' OR productId = ?'
            }
        })

        const [result] = await sqlconnection.query(`SELECT * FROM stock_products ${whereClause} ORDER BY createdAt ASC` , Ids);
        console.log(`SELECT * FROM stock_products ${whereClause} ORDER BY createdAt ASC` , Ids)

        console.log(result)

        return NextResponse.json({
            success: true,
            message: 'Order created successfully'
        }, { status: 200 })

    } catch (error: any) {
        console.log(error)
        return NextResponse.json({
            success: false,
            message: error.message
        }, { status: 500 })
    }
}