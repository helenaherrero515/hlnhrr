export function renderIsoBrickSvg(color: string, w = 2, d = 2, u = 16): string {
  const X = 0.866 * u;
  const Y = 0.5 * u;
  const h = 1.15 * u;
  const sh = 0.3 * u;
  const rx = 0.36 * u;
  const ry = 0.2 * u;
  const W = (w + d) * X;
  const H = (w + d) * Y + h + sh + ry + 2;
  const ax = d * X;
  const ay = sh + ry + 1;
  const B: [number, number] = [ax + w * X, ay + w * Y];
  const D: [number, number] = [ax - d * X, ay + d * Y];
  const C: [number, number] = [B[0] - d * X, B[1] + d * Y];

  const P = (points: [number, number][], fill: string, opacity?: number) =>
    `<polygon points="${points.map((q) => q[0].toFixed(1) + "," + q[1].toFixed(1)).join(" ")}" fill="${fill}"${
      opacity ? ` fill-opacity="${opacity}"` : ""
    }/>`;

  const lf: [number, number][] = [D, C, [C[0], C[1] + h], [D[0], D[1] + h]];
  const rt: [number, number][] = [C, B, [B[0], B[1] + h], [C[0], C[1] + h]];

  let s =
    `<svg viewBox="0 0 ${W.toFixed(1)} ${H.toFixed(1)}" aria-hidden="true" style="color:${color}">` +
    P(lf, "currentColor") +
    P(lf, "#000", 0.2) +
    P(rt, "currentColor") +
    P(rt, "#000", 0.34) +
    P([[ax, ay], B, C, D], "currentColor");

  for (let k = 0; k < w + d - 1; k++) {
    for (let i = 0; i < w; i++) {
      const j = k - i;
      if (j < 0 || j >= d) continue;
      const cx = ax + (i - j) * X;
      const cy = ay + (i + j + 1) * Y;

      s +=
        `<ellipse cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" rx="${rx}" ry="${ry}" fill="currentColor"/>` +
        `<ellipse cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" rx="${rx}" ry="${ry}" fill="#000" fill-opacity=".25"/>` +
        `<rect x="${(cx - rx).toFixed(1)}" y="${(cy - sh).toFixed(1)}" width="${(2 * rx).toFixed(1)}" height="${sh}" fill="currentColor"/>` +
        `<rect x="${(cx - rx).toFixed(1)}" y="${(cy - sh).toFixed(1)}" width="${(2 * rx).toFixed(1)}" height="${sh}" fill="#000" fill-opacity=".2"/>` +
        `<ellipse cx="${cx.toFixed(1)}" cy="${(cy - sh).toFixed(1)}" rx="${rx}" ry="${ry}" fill="currentColor"/>` +
        `<ellipse cx="${cx.toFixed(1)}" cy="${(cy - sh).toFixed(1)}" rx="${rx}" ry="${ry}" fill="#fff" fill-opacity=".2"/>`;
    }
  }

  return s + "</svg>";
}
