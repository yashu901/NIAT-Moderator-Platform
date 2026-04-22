import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import ArticleCard from "../components/ArticleCard";

export default function Dashboard() {
    const [articles, setArticles] = useState([]);
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [editId, setEditId] = useState(null);

    const [loading, setLoading] = useState(false);
    const [showInvite, setShowInvite] = useState(false);
    const [email, setEmail] = useState("");
    const [campus, setCampus] = useState("");
    const [inviteLink, setInviteLink] = useState("");

    const role = localStorage.getItem("role") || "admin";

    const fetchArticles = () => {
        API.get("articles/")
            .then(res => setArticles(res.data))
            .catch(() => alert("Error fetching articles"));
    };

    useEffect(() => {
        fetchArticles();
    }, []);

    const createArticle = async () => {
        setLoading(true);
        try {
            if (editId) {
                await API.put(`articles/${editId}/update/`, {
                    title,
                    body,
                    category: "news",
                    status: "published"
                });
                setEditId(null);
            } else {
                await API.post("articles/create/", {
                    title,
                    body,
                    category: "news",
                    status: "published"
                });
            }

            setTitle("");
            setBody("");
            fetchArticles();

        } catch {
            alert("Error saving article");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        try {
            await API.delete(`articles/${id}/delete/`);
            fetchArticles();
        } catch (error) {
            console.log(error.response);
        }
    };

    const handleEdit = (article) => {
        setEditId(article.id);
        setTitle(article.title);
        setBody(article.body);
    };


    const sendInvite = async () => {
        try {
            const res = await API.post("auth/invite/", {
                email,
                campus
            });

            setInviteLink(res.data.link);
        } catch {
            alert("Error sending invite");
        }
    };

    return (
        <div className="bg-gray-100 min-h-screen">

            <Navbar />

            <div className="max-w-4xl mx-auto p-6">


                {role === "admin" && (
                    <div className="flex justify-end mb-4">
                        <button
                            onClick={() => setShowInvite(true)}
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                        >
                            Invite Moderator
                        </button>
                    </div>
                )}


                {role === "moderator" && (
                    <div className="bg-white p-6 rounded-2xl w-96 shadow-2xl">
                        <h2 className="text-lg font-semibold mb-3">
                            {editId ? "Edit Article" : "Create Article"}
                        </h2>

                        <input
                            placeholder="Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full border p-3 rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />

                        <textarea
                            placeholder="Body"
                            value={body}
                            onChange={(e) => setBody(e.target.value)}
                            className="w-full border p-3 rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />

                        <button
                            onClick={createArticle}
                            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:scale-105 transition"
                        >
                            {loading ? "Saving..." : editId ? "Update" : "Create"}
                        </button>
                    </div>
                )}

                <h2 className="text-xl font-bold mb-4">Articles</h2>

                {articles.length === 0 && (
                    <p className="text-gray-500 text-center mt-6">
                        No articles yet. Create your first one
                    </p>
                )}

                <div className="space-y-4">
                    {articles.map((a) => (
                        <ArticleCard
                            key={a.id}
                            article={a}
                            onDelete={handleDelete}
                            onEdit={handleEdit}
                        />
                    ))}
                </div>

            </div>

            {showInvite && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">

                    <div className="bg-white p-6 rounded-xl w-96 shadow-lg">

                        <h2 className="text-lg font-semibold mb-4">
                            Invite Moderator
                        </h2>

                        <input
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full border p-3 rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />

                        <input
                            placeholder="Campus ID"
                            value={campus}
                            onChange={(e) => setCampus(e.target.value)}
                            className="w-full border p-3 rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />

                        <button
                            onClick={sendInvite}
                            className="bg-green-500 text-white px-4 py-2 rounded w-full mb-3"
                        >
                            Generate Invite
                        </button>

                        {inviteLink && (
                            <div>
                                <input
                                    value={inviteLink}
                                    readOnly
                                    className="w-full border p-2 rounded text-sm"
                                />

                                <button
                                    onClick={() => navigator.clipboard.writeText(inviteLink)}
                                    className="mt-2 text-blue-600 text-sm hover:underline"
                                >
                                    Copy Link
                                </button>
                            </div>
                        )}

                        <button
                            onClick={() => {
                                setShowInvite(false);
                                setInviteLink("");
                                setEmail("");
                                setCampus("");
                            }}
                            className="mt-3 text-red-500 text-sm"
                        >
                            Close
                        </button>

                    </div>
                </div>
            )}

        </div>
    );
}