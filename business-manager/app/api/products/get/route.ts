import { sqlconnection } from "@/lib/mysql2";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const { filters } = await request.json();
        const values = []
        let whereClause = '';
        if (filters.category !== 'all') {
            whereClause = ' WHERE '
            whereClause += 'category = ?'
            values.push(filters.category);
        }
        if (filters.stockStatus !== 'all') {
            if (filters.category === 'all') {
                whereClause += ' WHERE '
            } else {
                whereClause += ' AND '
            }

            if (filters.stockStatus === 'in-stock') {
                whereClause += 'stock > minStock'
            } else if (filters.stockStatus === 'low-stock') {
                whereClause += 'stock < minStock'
            } else if (filters.stockStatus === 'out-of-stock') {
                whereClause += 'stock = ?'
                values.push(0)
            } else if (filters.stockStatus === 'all-in-stock') {
                whereClause += 'stock > 0'
            }
        }

        if (filters.search !== '') {
            if (filters.category === 'all' && filters.stockStatus === 'all') {
                whereClause += ' WHERE '
            } else {
                whereClause += ' AND '
            }
            const Clauses: string[] = []
            const searchQuery = filters.search.split(' ');
            searchQuery.map((query: string) => {
                const sqlQuery = `%${query.toLowerCase()}%`
                const Clause = 'LOWER(name) LIKE ? OR LOWER(description) LIKE ? OR LOWER(category) LIKE ?'
                Clauses.push(`(${Clause})`);
                values.push(sqlQuery, sqlQuery, sqlQuery);
            })
            whereClause += Clauses.join(' OR ');
        }

        const [result] = await sqlconnection.query(`SELECT id , name , description , category , stock , minStock , imagePublicUrl as image , imageSecureUrl as secureImage , tags FROM products ${whereClause} LIMIT 10`, values);
        console.log(`SELECT id , name , description , category , stock , minStock , imagePublicUrl as image , imageSecureUrl as secureImage , tags FROM products ${whereClause} LIMIT 10`)

        return NextResponse.json({
            products: result,
            success: true
        }, {
            status: 200
        })

    } catch (error) {
        console.log(error)
        if (error instanceof Error) {
            return NextResponse.json({
                error: error.message,
                success: false
            }, {
                status: 500
            })
        }
    }
}