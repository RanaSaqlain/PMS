import Filter from "@/Components/Filter";
import Table from "@/Components/Table";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function Index(data) {
    return (
        <AuthenticatedLayout
            user={data.auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Tasks
                </h2>
            }
        >
            <Head title="Tasks" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <Filter queryParams={data.queryParams} routeName="task"></Filter>
                            <Table
                                queryParams={data.queryParams}
                                sortColoumns={[
                                    "id",
                                    "name",
                                    "status",
                                    "due_date",
                                ]}
                                columns={[
                                    { db: "id", dsp: "ID", class: "py-3" },
                                    {
                                        db: "image_path",
                                        dsp: "Image",
                                        class: "py-3",
                                    },
                                    { db: "name", dsp: "Name", class: "py-3" },
                                    { db: "project_id", dsp: "Project", class: "py-3" },
                                    {
                                        db: "status",
                                        dsp: "Status",
                                        class: "py-3",
                                    },
                                    {
                                        db: "created_by",
                                        dsp: "Created By",
                                        class: "py-3",
                                    },
                                    {
                                        db: "assigned_user_id",
                                        dsp: "Assigned User",
                                        class: "py-3",
                                    },
                                    
                                    {
                                        db: "due_date",
                                        dsp: "Due Date",
                                        class: "py-3",
                                    },
                                    {
                                        db: "created_at",
                                        dsp: "Created At",
                                        class: "py-3",
                                    },
                                    {
                                        db: "action",
                                        dsp: "Action",
                                        class: "py-3",
                                    },
                                ]}
                                data={{
                                    project: data.tasks,
                                    class: "py-3 text-nowrap",
                                    routename: "task",
                                }}
                            ></Table>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
