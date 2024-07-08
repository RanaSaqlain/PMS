import React from "react";
import TextInput from "./TextInput";
import Select from "./SelectInput";
import { router } from "@inertiajs/core";

const Filter = ({ queryParams = null }) => {
    queryParams = queryParams ? queryParams : {};
    const searchField = (name, value) => {
        if (value) {
            queryParams[name] = value;
        }
        router.get(route("project.index", queryParams));
    };
    const onKeyPress = (name, e) => {
        if (e.key === "Enter") {
            searchField(name, e.target.value);
        }
    };
    return (
        <div className="container mx-auto p-4">
            <div className="overflow-x-auto">
                <div className="min-w-full py-3 px-2 bg-gray-300 border border-gray-200 ">
                    Filters
                </div>
                <div className="min-w-full bg-gray-100 py-2 flex flex-auto">
                    <div className="px-2">
                        <label htmlFor="" className="px-1 font-serif">
                            Search
                        </label>
                        <TextInput
                            className={"border border-gray-300 bg-white"}
                            placeholder="...."
                            defaultValue={queryParams.name}
                            onBlur={(e) => searchField("name", e.target.value)}
                            onKeyPress={(e) => onKeyPress("name", e)}
                        ></TextInput>
                    </div>
                    <div className="px-2">
                        <label htmlFor="" className="px-2">
                            Status
                        </label>
                        <Select
                            onChange={(e) =>
                                searchField("status", e.target.value)
                            }
                            defaultValue={queryParams.status}
                        >
                            <option value="">--</option>
                            <option value="pending">Pending</option>
                            <option value="in_progress">In Progress</option>
                            <option value="completed">Completed</option>
                        </Select>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Filter;
