import { Link } from "@inertiajs/react";
import React from "react";

const Pagination = ({ links }) => {
    return (
        <nav className="text-center mt-4">
            {links.map((link, index) => (
                <Link
                    preserveScroll
                    className={
                        "inline-block py-2 px-3 rounded-lg text-blue-400 text-xs" +
                        (link.active ? " bg-gray-950 " : "") +
                        (!link.url
                            ? " !text-gray-500 cursor-not-allowed "
                            : " hover:bg-gray-950")
                    }
                    href={link.url || ""}
                    key={index}
                    dangerouslySetInnerHTML={{ __html: link.label }}
                ></Link>
            ))}
        </nav>
    );
};

export default Pagination;
