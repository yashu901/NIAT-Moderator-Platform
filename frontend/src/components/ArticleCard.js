function ArticleCard({ article, onDelete, onEdit }) {
  return (
    <div className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition flex justify-between items-start">

      <div>
        <h3 className="text-lg font-semibold text-gray-800">
          {article.title}
        </h3>

        <p className="text-gray-600 mt-1">
          {article.body}
        </p>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => onEdit(article)}
          className="bg-yellow-400 px-3 py-1 rounded hover:bg-yellow-500"
        >
          Edit
        </button>

        <button
          onClick={() => onDelete(article.id)}
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
        >
          Delete
        </button>
      </div>

    </div>
  );
}

export default ArticleCard;