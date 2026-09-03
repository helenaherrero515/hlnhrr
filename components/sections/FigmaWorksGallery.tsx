"use client";

import Image from "next/image";
import { useEffect, useId, useState } from "react";
import { createPortal } from "react-dom";
import type { CSSProperties, ReactElement } from "react";

interface WorkImage {
  title: string;
  image: string;
  position?: string;
}

interface WorkCategory {
  title: string;
  subtitle: string;
  images?: WorkImage[];
  revealDelay?: number;
}

interface FigmaWorksGalleryProps {
  categories: WorkCategory[];
}

function revealDelayStyle(delay: number): CSSProperties {
  return { "--figma-reveal-delay": `${delay}ms` } as CSSProperties;
}

function WorkCategoryCard({ title, subtitle, images, revealDelay = 0, onSelect }: WorkCategory & { onSelect: () => void }): ReactElement {
  return (
    <article className="figma-work-card figma-scroll-rise" style={revealDelayStyle(revealDelay)}>
      <button className="figma-work-card-button" type="button" onClick={onSelect} aria-label={`Open ${title} gallery`}>
        <div className={images ? "figma-work-image figma-work-image-collage" : "figma-work-image figma-work-image-category"}>
          {images ? (
            images.slice(0, 6).map((image) => (
              <div key={image.title} className="figma-work-collage-tile">
                <Image src={image.image} alt={`${image.title} preview`} fill sizes="(max-width: 780px) 45vw, 16vw" style={{ objectPosition: image.position ?? "center" }} />
              </div>
            ))
          ) : (
            <div className="figma-work-category-message">
              <span>OPEN FILE</span>
              <strong>{title}</strong>
              <small>VIEW ITEMS</small>
            </div>
          )}
        </div>
        <div className="figma-work-caption">
          <span>{title}</span>
          <small>{subtitle}</small>
          <Image src="/images/figma-portfolio/arrow-project.svg" alt="" width={16} height={15} />
        </div>
      </button>
    </article>
  );
}

export function FigmaWorksGallery({ categories }: FigmaWorksGalleryProps): ReactElement {
  const titleId = useId();
  const [isMounted, setIsMounted] = useState(false);
  const [selectedTitle, setSelectedTitle] = useState<string | null>(null);
  const selectedCategory = categories.find((category) => category.title === selectedTitle);
  const selectedImages = selectedCategory?.images ?? [];

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!selectedCategory) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === "Escape") {
        setSelectedTitle(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedCategory]);

  return (
    <>
      <div className="figma-work-grid">
        {categories.map((work, index) => (
          <WorkCategoryCard key={work.title} {...work} revealDelay={index * 90} onSelect={() => setSelectedTitle(work.title)} />
        ))}
      </div>

      {isMounted && selectedCategory
        ? createPortal(
        <div className="figma-work-modal" role="dialog" aria-modal="true" aria-labelledby={titleId}>
          <button className="figma-work-modal-backdrop" type="button" aria-label="Close work gallery" onClick={() => setSelectedTitle(null)} />
          <section className="figma-work-modal-panel">
            <header className="figma-work-modal-header">
              <div>
                <span>{`// WORK FILE`}</span>
                <h3 id={titleId}>{selectedCategory.title}</h3>
                <p>{selectedCategory.subtitle}</p>
              </div>
              <button className="figma-work-modal-close" type="button" onClick={() => setSelectedTitle(null)} aria-label="Close work gallery">
                CLOSE
              </button>
            </header>
            {selectedImages.length > 0 ? (
              <div className="figma-work-modal-grid">
                {selectedImages.map((image) => (
                  <figure key={image.title} className="figma-work-modal-item">
                    <div>
                      <Image src={image.image} alt={image.title} fill sizes="(max-width: 780px) 86vw, 28vw" style={{ objectPosition: image.position ?? "center" }} />
                    </div>
                    <figcaption>{image.title}</figcaption>
                  </figure>
                ))}
              </div>
            ) : (
              <div className="figma-work-modal-empty">
                <span>POSTING SOON</span>
                <strong>UNDER CONSTRUCTION</strong>
                <small>{selectedCategory.title} FILES ARE BEING PREPARED</small>
              </div>
            )}
          </section>
        </div>,
          document.body,
        )
        : null}
    </>
  );
}
