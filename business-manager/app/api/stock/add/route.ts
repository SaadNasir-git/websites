import { sqlconnection } from "@/lib/mysql2";
import { NewStockBatch } from "@/types/stock";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const { stock }: { stock: NewStockBatch } = await request.json();

        if (!stock.batchName) {
            return NextResponse.json({
                success: false,
                message: 'Batch Name is required'
            }, {
                status: 400
            })
        }

        if (!stock.purchaseDate) {
            return NextResponse.json({
                success: false,
                message: 'Purchase Date is required'
            }, {
            status: 400
        })
        }

        await sqlconnection.query('CALL AddStock(? , ? , ? , ? , ? , ?)', [stock.batchName, stock.notes, stock.purchaseDate, JSON.stringify(stock.products) , Number(stock.totalCost) , Number(stock.charges)])

        return NextResponse.json({
            success: true,
            message: 'Batch added successfully'
        }, {
            status: 200
        })

    } catch (error) {
        console.log(error)
        return NextResponse.json({
            success: false,
            message: 'Stock failed to add'
        }, {
            status: 500
        })
    }
}