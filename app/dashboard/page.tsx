import KanbanBoard from "@/components/kanban-board";
import { getSession } from "@/lib/auth/auth"
import connectDB from "@/lib/db";
import { Board } from "@/lib/models";
import board from "@/lib/models/board";
import { redirect } from "next/navigation";
import { Suspense } from "react";

async function getBoard(userId: string) {
    "use cache";
    await connectDB();
    //console.log("Searching userId:", userId);
    const boardDoc = await Board.findOne({
        userId: userId,
        name: "Job Hunt",
    }).populate({
        path: "columns",
        populate: {
            path: "jobApplications",
        },
    });
    //console.log("boardDoc:", boardDoc);
    if (!boardDoc) return null;
    const board = JSON.parse(JSON.stringify(boardDoc));
    return board;
}

async function DashboardPage() {
    const session = await getSession();
    const board = await getBoard(session?.user.id ?? "");
    //console.log("Board:", board);
    if(!session?.user){
        redirect("/sign-in");
    }

    return (
        <div className="min-h-screen bg-white">
            <div className="container mx-auto p-6">
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-black">Job Hunt</h1>
                    <p className="text-gray-600">Track your job application</p>
                </div>
                <KanbanBoard board={board} userId={session.user.id}/>
            </div>
        </div>
    );
}

export default async function Dashboard(){
    return (
        <Suspense fallback={<p>Loading..</p>}>
            <DashboardPage />
        </Suspense>
    );
}