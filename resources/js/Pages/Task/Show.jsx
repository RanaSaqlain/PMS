import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { STATUS_CLASS, STATUS_TEXT } from "@/constants";
import Table from "@/Components/Table";

const Show = ({ auth, task,tasks,queryParams }) => {
    console.log(tasks)
;    task = task.data;
    return (
        <AuthenticatedLayout
            user={auth}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    {`Task "${task.name}"`}
                </h2>
            }
        >
            <Head title={`Tasks "${task.name}"`} />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div>
                            <img
                                src={task.image_path}
                                alt={task.name}
                                className={"w-full h-64 object-contain"}
                            />
                        </div>
                        <div className="p-6 text-gray-900">
                            <div className="grid grid-cols-1 md:grid-cols-2">
                                <div>
                                    <div className="flex gap-4">
                                        <label className="text-lg font-bold">
                                            ID #
                                        </label>
                                        <div className="mt-1">{task.id}</div>
                                    </div>
                                    <div className="flex gap-4 mt-4">
                                        <label className="text-lg font-bold">
                                            Name
                                        </label>
                                        <div className="mt-1">
                                            {task.name}
                                        </div>
                                    </div>
                                    <div className="flex gap-4 mt-4">
                                        <label className="text-lg font-bold">
                                            Status
                                        </label>
                                        <div className="mt-1">
                                            {
                                                <span
                                                    className={
                                                        " px-2 py-2 rounded text-white " +
                                                        STATUS_CLASS[
                                                            task.status
                                                        ]
                                                    }
                                                >
                                                    {
                                                        STATUS_TEXT[
                                                            task.status
                                                        ]
                                                    }
                                                </span>
                                            }
                                        </div>
                                    </div>
                                    <div className="flex gap-4 mt-4">
                                        <label className="text-lg font-bold">
                                            Created By
                                        </label>
                                        <div className="mt-1">
                                            {task.created_by.name}
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div>
                                        <label className="text-lg font-bold">
                                            Created at
                                        </label>
                                        <div className="ms-2 mt-1">
                                            {task.created_at}
                                        </div>
                                    </div>
                                    <div>
                                        <label className="text-lg font-bold">
                                            Updated at
                                        </label>
                                        <div className="ms-2 mt-1">
                                            {task.updated_at}
                                        </div>
                                    </div>
                                    <div>
                                        <label className="text-lg font-bold">
                                            Due Date
                                        </label>
                                        <div className="ms-2 mt-1 text-red-800">
                                            {task.due_date}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <label className="text-lg font-bold">
                                    Description
                                </label>
                                <p>{task.description}</p>
                            </div>
                        </div>
                        <div className="mt-4 text-center">
                            <h3 className="font-semibold text-xl text-gray-800">Tasks</h3>
                        </div>
                        <div className="p-6 text-gray-900">
                            <Table
                                queryParams={queryParams}
                                sortColoumns={[
                                    "id",
                                    "name",
                                    "status",
                                    "due_date",
                                ]}
                                showSortBy={false}
                                columns={[
                                    { db: "id", dsp: "ID", class: "py-3" },
                                    {
                                        db: "image_path",
                                        dsp: "Image",
                                        class: "py-3",
                                    },
                                    { db: "name", dsp: "Name", class: "py-3" },
                                    { db: "task_id", dsp: "Task", class: "py-3" },
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
                                    task: tasks,
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
};

export default Show;
