import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router, useForm } from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import { Button, Textarea } from "@headlessui/react";
import TextAreaInput from "@/Components/TextAreaInput";
import SelectInput from "@/Components/SelectInput";

const Edit = ({ auth, project }) => {
    const { data, setData, put, errors, reset } = useForm({
        image: "",
        name: project.data.name || "",
        status: project.data.status || "",
        description: project.data.description || "",
        due_date: project.data.due_date || "",
    });

    const onSubmit = (e) => {
        e.preventDefault();
        router.post(`/project/${project.data.id}`, {
            _method: "put",
            ...data,
        });
    };
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Edit Project "{project.data.name}""
                </h2>
            }
        >
            <Head title="Edit Project" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <form
                            onSubmit={onSubmit}
                            className="p-4 sm:p-8 shadow sm-rounded-lg"
                        >
                            {project.data.image_path && (
                                <div className="mb-4">
                                    <img
                                        src={project.data.image_path}
                                        className="w-64"
                                        alt=""
                                    />
                                </div>
                            )}
                            <div>
                                <InputLabel
                                    htmlFor="project_image_path"
                                    value="Image"
                                />
                                <TextInput
                                    id="project_image_path"
                                    type="file"
                                    name="image"
                                    className="mt-1 block w-full border-none"
                                    onChange={(e) =>
                                        setData("image", e.target.files[0])
                                    }
                                />
                                <InputError
                                    message={errors.image}
                                    className="mt-2"
                                />
                            </div>

                            <div className="mt-4">
                                <InputLabel
                                    htmlFor="project_name"
                                    value="Name"
                                />
                                <TextInput
                                    id="project_name"
                                    type="text"
                                    name="name"
                                    value={data.name}
                                    className="mt-1 block w-full border-none"
                                    isFocused={true}
                                    onChange={(e) =>
                                        setData("name", e.target.value)
                                    }
                                />
                                <InputError
                                    message={errors.name}
                                    className="mt-2"
                                />
                            </div>
                            <div className="mt-4">
                                <InputLabel
                                    htmlFor="project_description"
                                    value={"Description"}
                                />
                                <TextAreaInput
                                    id="project_description"
                                    name="description"
                                    value={data.description}
                                    className={"mt-1 block w-full"}
                                    onChange={(e) =>
                                        setData("description", e.target.value)
                                    }
                                />
                                <InputError
                                    message={errors.description}
                                    className="mt-2"
                                />
                            </div>
                            <div className="mt-4">
                                <InputLabel
                                    htmlFor="project_dead_line"
                                    value="Deadline"
                                />
                                <TextInput
                                    id="project_dead_line"
                                    type="date"
                                    name="due_date"
                                    value={data.due_date}
                                    className="mt-1 block w-full border-none"
                                    onChange={(e) =>
                                        setData("due_date", e.target.value)
                                    }
                                />
                                <InputError
                                    message={errors.due_date}
                                    className="mt-2"
                                />
                            </div>
                            <div className="mt-4">
                                <InputLabel
                                    htmlFor="project_status"
                                    value={"Status"}
                                />
                                <SelectInput
                                    onChange={(e) =>
                                        setData("status", e.target.value)
                                    }
                                    name="status"
                                    className="mt-1 block w-full border-none"
                                >
                                    <option value="">--</option>
                                    <option value="pending">Pending</option>
                                    <option value="in_progress">
                                        In Progress
                                    </option>
                                    <option value="completed">Completed</option>
                                </SelectInput>
                                <InputError
                                    message={errors.status}
                                    className="mt-2"
                                />
                            </div>
                            <div className="mt-4 text-right">
                                <Link
                                    href={route("project.index")}
                                    className="bg-gray-300 p-3 rounded  shadow-sm hover:bg-slate-600 hover:text-white"
                                >
                                    Cancel
                                </Link>
                                <Button
                                    type="submit"
                                    className={
                                        "bg-cyan-800 p-2 rounded ms-2 text-cyan-50 hover:bg-green-300 hover:text-black"
                                    }
                                >
                                    Submit
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Edit;
