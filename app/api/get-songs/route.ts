import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {

    try{
        const body = await req.json()
        const mKey = body.mkey

        const songs = await prisma.song.findMany({
            where:{
                song_key:{
                    equals: mKey
                }
            },
            skip: body.skip,
            take: body.take
        })

        console.log(songs)

        return NextResponse.json(songs);

    } catch (error) {
        console.error("Error fetching songs:", error);
        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 } // Use 500 for server errors
        );
    } finally {
        await prisma.$disconnect()
    }
}