import { useEffect, useState } from "react";
import API from "../services/api";
import "../App.css";

export default function Dashboard() {
    const [articles, setArticles] = useState([]);
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");

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
            await API.post("articles/create/", {
                title,
                body,
                category: "news",
                status: "published"
            });
            setTitle("");
            setBody("");
            fetchArticles(); // refresh list
        } catch {
            alert("Error creating article");
        }
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
            <button onClick={createArticle}>Create</button>

            <hr />

            <h2>Articles</h2>
            {articles.map(a => (
                <div className="article" key={a.id}>
                    <h3>{a.title}</h3>
                    <p>{a.body}</p>
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