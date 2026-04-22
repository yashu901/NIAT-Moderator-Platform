import React from "react";

function Navbar() {

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role"); // safe cleanup
        window.location.href = "/";
    };

    return (
        <div className="bg-white shadow px-6 py-4 flex justify-between items-center">

            <h1 className="text-xl font-bold text-gray-800 tracking-wide">
                Moderator Platform
            </h1>

            <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
            >
                Logout
            </button>

        </div>
    );
}

export default Navbar;