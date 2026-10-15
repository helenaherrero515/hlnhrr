"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { renderIsoBrickSvg } from "./iso";
import { LEGO_COLOR_MAP } from "./data";
import type { ProjectItem } from "./types";

interface LegoProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export function LegoProjectModal({ project, onClose }: LegoProjectModalProps) {
  useEffect(() => {
    if (!project) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="pmTitle"
      className="lego-modal-overlay open"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="p-modal-dialog">
        <div className="p-modal-card">
          <div className={`p-modal-hd ${project.color}`}>
            <div className="pm-meta">
              <div
                className="pm-ico"
                dangerouslySetInnerHTML={{
                  __html: renderIsoBrickSvg(LEGO_COLOR_MAP[project.color], 2, 2),
                }}
              />
              <div>
                <div className="pm-badges">
                  <span className="pm-badge">
                    {project.award || project.event || "Project"}
                  </span>
                  {project.role && <span className="pm-role">{project.role}</span>}
                </div>
                <h2 className="h2 pm-title" id="pmTitle">
                  {project.title}
                </h2>
              </div>
            </div>
            <button
              type="button"
              className="pm-close"
              onClick={onClose}
              aria-label="Close project details"
            >
              ✕
            </button>
          </div>

          <div className="p-modal-body">
            {project.img && (
              <div className="pm-img-wrap">
                <Image
                  src={project.img}
                  alt={`${project.title} cover preview`}
                  width={800}
                  height={450}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
            )}

            <div className="pm-sec">
              <div className="mono" style={{ marginBottom: "6px", color: "var(--mut)" }}>
                About Project
              </div>
              <p style={{ fontSize: "16px", lineHeight: 1.6, color: "var(--ink)", margin: 0 }}>
                {project.description}
              </p>
            </div>

            <div className="pm-sec">
              <div className="mono" style={{ marginBottom: "8px", color: "var(--mut)" }}>
                Tags & Technologies
              </div>
              <div className="pm-tags">
                {project.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    style={{
                      borderLeftColor: `var(--${project.color.replace("c-", "")})`,
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="pm-actions">
              {project.live && (
                <a
                  className="pm-btn pm-btn-primary"
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Live Demo ↗
                </a>
              )}
              {project.caseStudy && (
                <a
                  className="pm-btn pm-btn-primary"
                  href={project.caseStudy}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Case Study ↗
                </a>
              )}
              {project.github && (
                <a
                  className="pm-btn pm-btn-secondary"
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub Repo ↗
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
