import Filter from "@/Components/Filter";
import Table from "@/Components/Table";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import { useState } from "react";
import Swal from "sweetalert2";

export default function Index(data) {
    if (data.success) {
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: data.success,
            showConfirmButton: false,
            timer: 1500,
            customClass: {
                popup: 'swal2-popup',
                title: 'swal2-title',
                icon: 'swal2-icon'
              }
          });
    }
    return (
        <AuthenticatedLayout
            user={data.auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Projects
                    </h2>
                    <Link
                        href={route("project.create")}
                        className="bg-green-400 p-2 rounded shadow transition-all hover:bg-green-800 hover:text-white"
                    >
                        Add New
                    </Link>
                </div>
            }
        >
            <Head title="Projects" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {data.success && (
                        <div className="bg-emerald-800 text-yellow-50 p-3 mb-3 rounded shadow">
                            {data.success}
                        </div>
                    )}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <Filter
                                queryParams={data.queryParams}
                                routeName="project"
                            ></Filter>
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
                                        class: "py-3 object-cover w-full",
                                    },
                                    { db: "name", dsp: "Name", class: "py-3" },
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
                                        db: "updated_by",
                                        dsp: "Updated By",
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
                                    project: data.projects,
                                    class: "py-3 text-nowrap",
                                    routename: "project",
                                }}
                            ></Table>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
