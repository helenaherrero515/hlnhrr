import * as THREE from "three";

export type BrickColorKey =
  | "red"
  | "yellow"
  | "blue"
  | "green"
  | "white"
  | "grey"
  | "brown"
  | "bgreen"
  | "black";

export const LEGO_PALETTE: Record<BrickColorKey, number> = {
  red: 0xeb0a14,
  yellow: 0xffd500,
  blue: 0x0066dc,
  green: 0x00a838,
  white: 0xffffff,
  grey: 0xb4bac5,
  brown: 0x8a5229,
  bgreen: 0x009632,
  black: 0x14181f,
};

export class BrickFactory {
  materials: Record<BrickColorKey, THREE.MeshLambertMaterial>;
  edgeMaterial: THREE.LineBasicMaterial;
  studGeometry: THREE.CylinderGeometry;
  geometryCache: Record<string, THREE.BoxGeometry> = {};
  edgesCache: Record<string, THREE.EdgesGeometry> = {};
  themeCallbacks: ((isDark: boolean) => void)[] = [];

  constructor() {
    this.materials = {} as Record<BrickColorKey, THREE.MeshLambertMaterial>;
    for (const key in LEGO_PALETTE) {
      const k = key as BrickColorKey;
      this.materials[k] = new THREE.MeshLambertMaterial({ color: LEGO_PALETTE[k] });
    }
    this.edgeMaterial = new THREE.LineBasicMaterial({
      color: 0x000000,
      transparent: true,
      opacity: 0.28,
    });
    this.studGeometry = new THREE.CylinderGeometry(0.3, 0.3, 0.2, 14);
  }

  brick(w: number, d: number, h: number, c: BrickColorKey, noStuds = false): THREE.Group {
    const group = new THREE.Group();
    const H = h * 1.2;
    const key = `${w}x${d}x${H}`;

    let bg = this.geometryCache[key];
    if (!bg) {
      bg = new THREE.BoxGeometry(w - 0.04, H, d - 0.04);
      this.geometryCache[key] = bg;
    }

    const mesh = new THREE.Mesh(bg, this.materials[c]);
    mesh.position.y = H / 2;
    group.add(mesh);

    let eg = this.edgesCache[key];
    if (!eg) {
      eg = new THREE.EdgesGeometry(bg);
      this.edgesCache[key] = eg;
    }

    const lines = new THREE.LineSegments(eg, this.edgeMaterial);
    lines.position.y = H / 2;
    group.add(lines);

    if (!noStuds) {
      for (let i = 0; i < w; i++) {
        for (let j = 0; j < d; j++) {
          const s = new THREE.Mesh(this.studGeometry, this.materials[c]);
          s.position.set(i - (w - 1) / 2, H + 0.1, j - (d - 1) / 2);
          group.add(s);
        }
      }
    }

    return group;
  }

  studs(N: number, c: BrickColorKey, H: number): THREE.InstancedMesh {
    const im = new THREE.InstancedMesh(this.studGeometry, this.materials[c], N * N);
    const mt = new THREE.Matrix4();
    let n = 0;
    for (let i = 0; i < N; i++) {
      for (let j = 0; j < N; j++) {
        mt.setPosition(i - (N - 1) / 2, H + 0.1, j - (N - 1) / 2);
        im.setMatrixAt(n++, mt);
      }
    }
    im.frustumCulled = false;
    return im;
  }

  wedge(w: number, d: number, h: number, c: BrickColorKey): THREE.Group {
    const a = w / 2;
    const b = d / 2;
    const A: [number, number, number] = [-a, 0, -b];
    const B: [number, number, number] = [a, 0, -b];
    const C: [number, number, number] = [a, 0, b];
    const D: [number, number, number] = [-a, 0, b];
    const E: [number, number, number] = [-a, h, -b];
    const F: [number, number, number] = [-a, h, b];

    const p: number[] = [];
    const triangles: [number, number, number][][] = [
      [A, B, C],
      [A, C, D],
      [A, D, F],
      [A, F, E],
      [E, F, C],
      [E, C, B],
      [A, E, B],
      [D, C, F],
    ];

    triangles.forEach((t) => {
      t.forEach((v) => p.push(v[0], v[1], v[2]));
    });

    const ge = new THREE.BufferGeometry();
    ge.setAttribute("position", new THREE.Float32BufferAttribute(p, 3));
    ge.computeVertexNormals();

    const group = new THREE.Group();
    group.add(
      new THREE.Mesh(ge, this.materials[c]),
      new THREE.LineSegments(new THREE.EdgesGeometry(ge), this.edgeMaterial)
    );
    return group;
  }

  figure(): { group: THREE.Group; rightArm: THREE.Group; leftArm: THREE.Group } {
    const group = new THREE.Group();

    const makeBox = (
      w: number,
      h: number,
      d: number,
      c: BrickColorKey,
      x: number,
      y: number,
      z: number,
      parent?: THREE.Group
    ) => {
      const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), this.materials[c]);
      m.position.set(x, y, z);
      (parent || group).add(m);
      return m;
    };

    const makeCyl = (
      r: number,
      h: number,
      c: BrickColorKey,
      y: number,
      parent?: THREE.Group
    ) => {
      const m = new THREE.Mesh(new THREE.CylinderGeometry(r, r, h, 16), this.materials[c]);
      m.position.y = y;
      (parent || group).add(m);
      return m;
    };

    makeBox(0.42, 0.9, 0.5, "blue", -0.25, 0.45, 0);
    makeBox(0.42, 0.9, 0.5, "blue", 0.25, 0.45, 0);
    makeBox(1, 0.22, 0.55, "blue", 0, 1, 0);
    makeBox(1, 1, 0.55, "red", 0, 1.6, 0);

    const makeArm = (side: number) => {
      const pivot = new THREE.Group();
      pivot.position.set(side * 0.64, 2.05, 0);
      group.add(pivot);
      makeBox(0.26, 0.85, 0.32, "red", 0, -0.4, 0, pivot);
      makeCyl(0.14, 0.2, "yellow", -0.9, pivot);
      return pivot;
    };

    const leftArm = makeArm(-1);
    const rightArm = makeArm(1);

    makeCyl(0.17, 0.12, "yellow", 2.16);
    makeCyl(0.38, 0.55, "yellow", 2.5);
    makeCyl(0.17, 0.12, "yellow", 2.83);

    [-0.13, 0.13].forEach((x) => {
      const eye = new THREE.Mesh(new THREE.SphereGeometry(0.05, 8, 8), this.materials.black);
      eye.position.set(x, 2.55, 0.37);
      group.add(eye);
    });

    const smile = new THREE.Mesh(new THREE.TorusGeometry(0.14, 0.025, 6, 14, Math.PI), this.materials.black);
    smile.position.set(0, 2.46, 0.37);
    smile.rotation.z = Math.PI;
    group.add(smile);

    group.scale.setScalar(1.15);
    return { group, rightArm, leftArm };
  }

  theme(isDark: boolean): void {
    this.edgeMaterial.color.set(isDark ? 0xffffff : 0x000000);
    this.edgeMaterial.opacity = isDark ? 0.2 : 0.24;
    this.materials.white.color.set(isDark ? 0xdfe4ec : 0xffffff);
    this.materials.red.color.set(isDark ? 0xff1f2d : 0xeb0a14);
    this.materials.yellow.color.set(isDark ? 0xffd700 : 0xffd500);
    this.materials.blue.color.set(isDark ? 0x147eff : 0x0066dc);
    this.materials.green.color.set(isDark ? 0x00c744 : 0x00a838);
    this.materials.grey.color.set(isDark ? 0x8c94a2 : 0xb4bac5);
    this.materials.bgreen.color.set(isDark ? 0x00802b : 0x009632);
    this.themeCallbacks.forEach((cb) => cb(isDark));
  }
}
