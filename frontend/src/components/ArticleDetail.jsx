import React, { useEffect } from "react";

const ArticleDetail = ({ article, onBack }) => {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!article) return null;

  return (
    <div className="animate-in fade-in duration-500 min-h-screen bg-mint-50">
      {/* Back Button Section */}
      <div className="max-w-4xl mx-auto px-6 pt-8 pb-4">
        <button
          onClick={onBack}
          className="group flex items-center gap-2 text-slate-500 hover:text-blue-600 transition-colors font-semibold"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="group-hover:-translate-x-1 transition-transform"
          >
            <path d="M19 12H5" />
            <path d="M12 19l-7-7 7-7" />
          </svg>
          Kembali ke Artikel
        </button>
      </div>

      <article className="max-w-4xl mx-auto px-6 pb-20">
        {/* Article Header */}
        <header className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              {article.category || "Edukasi"}
            </span>
            <span className="text-slate-400 text-sm font-medium">
              {/* If there's a date, render it, else placeholder */}
              {article.date || "Terbaru"}
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-black text-slate-900 leading-tight mb-6">
            {article.title}
          </h1>

          <div className="flex items-center gap-4 border-b border-gray-200 pb-8">
            {/* Author Avatar Placeholder or Image */}
            <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center overflow-hidden">
              {article.author_image ? (
                <img
                  src={article.author_image}
                  alt={article.author}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-slate-500 font-bold text-xs">
                  {article.author ? article.author[0] : "A"}
                </span>
              )}
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900">
                {article.author || "Admin Optik"}
              </p>
              <p className="text-xs text-slate-500">Penulis Konten</p>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        <div className="rounded-[2rem] overflow-hidden shadow-lg mb-10 aspect-video relative">
          <img
            src={article.image_url}
            alt={article.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Article Content */}
        <div className="prose prose-lg prose-slate max-w-none text-slate-600 leading-loose">
          {/* 
            Rendering content. 
            If content is plain text with newlines, we can standardise it.
            If it's HTML, we might need dangerouslySetInnerHTML, but let's assume text for now 
            and split by paragraphs if needed, or just display it.
          */}
          {article.content.split("\n").map((paragraph, idx) => (
            <p key={idx} className="mb-4 text-lg">
              {paragraph}
            </p>
          ))}
        </div>
      </article>
    </div>
  );
};

export default ArticleDetail;
