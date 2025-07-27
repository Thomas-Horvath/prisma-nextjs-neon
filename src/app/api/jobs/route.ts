import { auth } from "@/auth";
import prisma from "@/src/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const session = await auth();

    if (!session?.user || !session.user.id) {
        return NextResponse.redirect(new URL("/auth/signin", request.url));
    }

    try {
        const data = await request.json();

        const job = await prisma.job.create({
            data: {
                ...data,
                postedById: session.user.id,
            }
        })

        return NextResponse.json(job);

    } catch (error) {
        console.error("Error creating job:", error);
        return NextResponse.json({ error: "Failed to create job" }, { status: 500 });
    };

}