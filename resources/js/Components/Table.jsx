import React from "react";
import Image from "./Image";
import { Link, router } from "@inertiajs/react";
import Pagination from "./Pagination";
import { STATUS_CLASS, STATUS_TEXT } from "@/constants";
import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/16/solid";

const Table = ({ columns, data, sortColoumns, queryParams, showSortBy = true }) => {
    console.log(data);
    function cellData(row, column_name, routename) {
        const cellData = row[column_name];
        if (column_name.includes("image")) {
            return <Image src={cellData} alt="image" />;
        }

        if (typeof cellData === "object") {
            return cellData.name;
        }
        if (column_name == "status") {
            return (
                <span
                    className={
                        " px-2 py-2 rounded text-white " +
                        STATUS_CLASS[cellData]
                    }
                >
                    {STATUS_TEXT[cellData]}
                </span>
            );
        }
        if (column_name == "action") {
            return (
                <>
                    <Link
                        href={route(routename + ".edit", row.id)}
                        className="font-extrabold text-yellow-500 rounded-2xl hover:underline mx-1"
                    >
                        Edit
                    </Link>
                    <Link
                        href={route(routename + ".destroy", row.id)}
                        className="font-medium text-red-700 rounded-2xl hover:underline mx-1"
                    >
                        Delete
                    </Link>
                </>
            );
        }

        if (column_name == "name") {
            return (
                <>
                    <Link
                        className={"hover:underline hover:text-blue-400"}
                        href={route(routename + ".show", row["id"])}
                    >
                        {row[column_name]}
                    </Link>
                </>
            );
        }
        return row[column_name];
    }
    queryParams = queryParams ? queryParams : {};
    function sortChanged(column_name) {
        if (sortColoumns.includes(column_name)) {
            if (column_name === queryParams.sort_field) {
                if (queryParams.sort_direction == "asc") {
                    queryParams.sort_direction = "desc";
                } else {
                    queryParams.sort_direction = "asc";
                }
            } else {
                queryParams.sort_field = column_name;
                queryParams.sort_direction = "asc";
            }
        }
        router.get(route(data.routename + ".index", queryParams));
    }
    return (
        <div className="container mx-auto p-4">
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200">
                    <thead>
                        <tr className="bg-gray-100 border-b">
                            {columns.map((item, index) => (
                                <th
                                    key={index}
                                    className={`py-2 px-4 text-left text-sm font-medium text-gray-600 cursor-pointer ${
                                        item.class || ""
                                    }`}
                                    onClick={(e) => {showSortBy?sortChanged(item.db):''}}
                                >
                                    <div className="flex items-center justify-between gap-1 text-nowrap">
                                        {item.dsp}
                                        {(sortColoumns.includes(item.db) && showSortBy)? (
                                            <div>
                                                <ChevronUpIcon
                                                    className={
                                                        "w-4 " +
                                                        (queryParams.sort_field ===
                                                            item.db &&
                                                        queryParams.sort_direction ==
                                                            "asc"
                                                            ? "text-amber-300"
                                                            : "")
                                                    }
                                                ></ChevronUpIcon>
                                                <ChevronDownIcon
                                                    className={
                                                        "w-4 -mt-2 " +
                                                        (queryParams.sort_field ===
                                                            item.db &&
                                                        queryParams.sort_direction ==
                                                            "desc"
                                                            ? "text-amber-300"
                                                            : "")
                                                    }
                                                ></ChevronDownIcon>
                                            </div>
                                        ) : (
                                            ""
                                        )}
                                    </div>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data.project.data.map((row, rowIndex) => (
                            <tr
                                key={rowIndex}
                                className={`border-b ${data.class || ""}`}
                            >
                                {columns.map((column, colIndex) => (
                                    <td
                                        key={colIndex}
                                        className={`py-2 px-4 text-sm text-gray-700 ${
                                            column.class || ""
                                        }`}
                                    >
                                        {cellData(
                                            row,
                                            column.db,
                                            data.routename
                                        )}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Pagination links={data.project.meta.links}></Pagination>
        </div>
    );
};

export default Table;
