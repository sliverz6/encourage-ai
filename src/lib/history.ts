export type HistoryEntry = {
  id: number;
  situation: string;
  message: string;
  createdAt: string;
};

export async function getHistory(): Promise<HistoryEntry[]> {
  const res = await fetch("/api/history");
  if (!res.ok) return [];
  return res.json();
}

export async function addEntry(situation: string, message: string): Promise<void> {
  await fetch("/api/history", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ situation, message }),
  });
}

export async function updateEntry(id: number, situation: string, message: string): Promise<void> {
  await fetch(`/api/history/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ situation, message }),
  });
}

export async function deleteEntry(id: number): Promise<void> {
  await fetch(`/api/history/${id}`, { method: "DELETE" });
}
