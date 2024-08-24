import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router, useForm } from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import { Button, Textarea } from "@headlessui/react";
import TextAreaInput from "@/Components/TextAreaInput";
import SelectInput from "@/Components/SelectInput";

const Edit = ({ auth, task, users, projects  }) => {
    const { data, setData, put, errors, reset } = useForm({
        image: "",
        name: task.data.name || "",
        status: task.data.status || "",
        description: task.data.description || "",
        due_date: task.data.due_date || "",
        priority:task.data.priority ||"" ,
        assigned_user_id: task.data.assigned_user_id.id || "",
        project_id: task.data.project_id.id|| "",
    });

    const onSubmit = (e) => {
        e.preventDefault();
        router.post(`/task/${task.data.id}`, {
            _method: "PUT",
            ...data,
        });
    };
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Edit Task "{task.data.name}""
                </h2>
            }
        >
            <Head title="Edit Task" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <form
                            onSubmit={onSubmit}
                            className="p-4 sm:p-8 shadow sm-rounded-lg"
                        >
                            {task.data.image_path && (
                                <div className="mb-4">
                                    <img
                                        src={task.data.image_path}
                                        className="w-64"
                                        alt=""
                                    />
                                </div>
                            )}
                            <div>
                                <InputLabel
                                    htmlFor="task_image_path"
                                    value="Image"
                                />
                                <TextInput
                                    id="task_image_path"
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
                                    htmlFor="task_name"
                                    value="Name"
                                />
                                <TextInput
                                    id="task_name"
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
                                    htmlFor="task_description"
                                    value={"Description"}
                                />
                                <TextAreaInput
                                    id="task_description"
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
                                    value={"Priority"}
                                    htmlFor={"task_priority"}
                                />
                                <SelectInput
                                    id={"task_priority"}
                                    name={"priority"}
                                    className={"mt-1 block w-full"}
                                    onChange={(e) =>
                                        setData("priority", e.target.value)
                                    }
                                >
                                    <option value="low">low</option>
                                    <option value="medium">medium</option>
                                    <option value="high">high</option>
                                </SelectInput>
                                <InputError
                                    htmlFor="task_priority"
                                    message={errors.priority}
                                />
                            </div>
                            <div className="mt-4">
                                <InputLabel
                                    value={"Assigne"}
                                    htmlFor={"task_assigned_user_id"}
                                />
                                <SelectInput
                                    id={"task_assigned_user_id"}
                                    name={"assigned_user_id"}
                                    className={"mt-1 block w-full"}
                                    value={data.assigned_user_id}
                                    onChange={(e) =>
                                        setData("assigned_user_id", e.target.value)
                                    }
                                >
                                    <option value="">__</option>
                                    {users.map((user) => (
                                        <option key={user.id} value={user.id}>
                                            {user.name}
                                        </option>
                                    ))}
                                </SelectInput>
                                <InputError
                                    htmlFor="task_assigned_user_id"
                                    message={errors.assigned_user_id}
                                />
                            </div>
                            <div className="mt-4">
                                <InputLabel
                                    value={"Project"}
                                    htmlFor={"project"}
                                />
                                <SelectInput
                                    id={"project"}
                                    name={"project"}
                                    className={"mt-1 block w-full"}
                                    value={data.project_id}
                                    onChange={(e) =>
                                        setData("project_id", e.target.value)
                                    }
                                >
                                    <option value="">__</option>
                                    {projects.map((project) => (
                                        <option
                                            key={project.id}
                                            value={project.id}
                                        >
                                            {project.name}
                                        </option>
                                    ))}
                                </SelectInput>
                                <InputError
                                    htmlFor="task_assigned_user_id"
                                    message={errors.project_id}
                                />
                            </div>
                            <div className="mt-4">
                                <InputLabel
                                    htmlFor="task_dead_line"
                                    value="Deadline"
                                />
                                <TextInput
                                    id="task_dead_line"
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
                                    htmlFor="task_status"
                                    value={"Status"}
                                />
                                <SelectInput
                                    onChange={(e) =>
                                        setData("status", e.target.value)
                                    }
                                    name="status"
                                    value={data.status}
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
                                    href={route("task.index")}
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
