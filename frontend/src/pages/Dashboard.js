import { useEffect, useState } from "react";
import API from "../services/api";
import "../App.css";

export default function Dashboard() {
    const [articles, setArticles] = useState([]);
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [editId, setEditId] = useState(null);

    const fetchArticles = () => {
        API.get("articles/")
            .then(res => setArticles(res.data))
            .catch(() => alert("Error fetching articles"));
    };

    useEffect(() => {
        fetchArticles();
    }, []);

    const createArticle = async () => {
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

        } catch (error) {
            console.log(error.response);
            alert("Error saving article");
        }
    };

    const handleDelete = async (id) => {
        try {
            await API.delete(`articles/${id}/delete/`);;
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

    return (
        <div className="container">
            <h2>Create Article</h2>
            <input
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <br />
            <textarea
                placeholder="Body"
                value={body}
                onChange={(e) => setBody(e.target.value)}
            />
            <br />
            <button onClick={createArticle}>
                {editId ? "Update" : "Create"}
            </button>

            <hr />

            <h2>Articles</h2>
            {articles.map(a => (
                <div className="article" key={a.id}>
                    <h3>{a.title}</h3>
                    <p>{a.body}</p>

                    <button onClick={() => handleEdit(a)}>Edit</button>
                    <button onClick={() => handleDelete(a.id)}>Delete</button>
                </div>
            ))}

            <button onClick={() => {
                localStorage.removeItem("token");
                window.location.href = "/";
            }}>
                Logout
            </button>
        </div>
    );
}