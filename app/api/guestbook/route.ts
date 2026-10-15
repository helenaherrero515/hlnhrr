import { NextResponse } from "next/server";

interface GuestbookNote {
  n: string;
  m: string;
  t: number;
}

let cachedNotes: GuestbookNote[] = [
  { n: "Helena", m: "Welcome to my LEGO guestbook! Feel free to leave a note or feedback.", t: Date.now() - 3600000 },
];

export async function GET() {
  return NextResponse.json(cachedNotes);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (!body?.m) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }
    const cleanNote: GuestbookNote = {
      n: String(body.n || "anonymous").trim().slice(0, 30),
      m: String(body.m || "").trim().slice(0, 200),
      t: Date.now(),
    };
    cachedNotes.unshift(cleanNote);
    cachedNotes = cachedNotes.slice(0, 50);
    return NextResponse.json({ success: true, notes: cachedNotes });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 500 });
  }
}
