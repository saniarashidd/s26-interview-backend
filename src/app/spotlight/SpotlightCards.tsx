"use client";

import { useState } from "react";
import Link from "next/link";

type Project = {
  id: string;
  rank?: number;
  name?: string;
  title?: string;
  description?: string;
  [key: string]: unknown;
};

export default function SpotlightCards({ projects }: { projects: Project[] }) {
  const [liked, setLiked] = useState<Set<string>>(new Set());

  const toggleLiked = (id: string) => {
    setLiked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const title = (p: Project) =>
    (p.name ?? p.title ?? p.id ?? "Project").toString();
  const description = (p: Project) =>
    (p.description ?? "No description available.").toString();

  return (
    <main className="spotlight">
      <section className="spotlight-section">
        <div className="spotlight-title-wrap">
          <span className="spotlight-line" />
          <h1 className="spotlight-title">PREVIOUS WINNERS SPOTLIGHT</h1>
          <span className="spotlight-line" />
        </div>

        <div className="spotlight-cards">
          {projects.map((project) => {
            const id = String(project.id);
            const isLiked = liked.has(id);
            const desc = description(project);
            const descLines =
              desc.split("\n").slice(0, 2).join("\n") || "No description available.";
            return (
              <article key={id} className="spotlight-card">
                <div className="spotlight-card-header">
                  <h2 className="spotlight-card-title">{title(project)}</h2>
                  <button
                    type="button"
                    className="spotlight-heart"
                    onClick={() => toggleLiked(id)}
                    aria-label={isLiked ? "Unlike" : "Like"}
                  >
                    {isLiked ? <HeartFilled /> : <HeartOutlined />}
                  </button>
                </div>
                <p className="spotlight-card-desc">{descLines}</p>
              </article>
            );
          })}
        </div>
      </section>

      <nav className="spotlight-nav">
        <Link href="/">← Back to home</Link>
      </nav>
    </main>
  );
}

function HeartFilled() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="#c41e3a"
      stroke="#c41e3a"
      strokeWidth="1.5"
      aria-hidden
    >
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  );
}

function HeartOutlined() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#2563eb"
      strokeWidth="1.5"
      aria-hidden
    >
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  );
}
