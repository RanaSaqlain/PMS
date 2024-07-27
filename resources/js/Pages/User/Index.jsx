import Filter from "@/Components/Filter";
import Table from "@/Components/Table";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import { useState } from "react";
import Swal from "sweetalert2";

export default function Index(data) {
    if (data.success) {
        const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
            },
        });

        Toast.fire({
            icon: "success",
            title: data.success,
        });
    }
    return (
        <AuthenticatedLayout
            user={data.auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Users
                    </h2>
                    <Link
                        href={route("user.create")}
                        className="bg-green-400 p-2 rounded shadow transition-all hover:bg-green-800 hover:text-white"
                    >
                        Add New
                    </Link>
                </div>
            }
        >
            <Head title="Users" />

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
                                routeName="user"
                                show="hidden"
                            ></Filter>
                            <Table
                                queryParams={data.queryParams}
                                sortColoumns={["id", "name", "email"]}
                                columns={[
                                    { db: "id", dsp: "ID", class: "py-3" },

                                    { db: "name", dsp: "Name", class: "py-3" },
                                    {
                                        db: "email",
                                        dsp: "Email",
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
                                    project: data.users,
                                    class: "py-3 text-nowrap",
                                    routename: "user",
                                }}
                            ></Table>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
