export type TransportItem = {
  name: string
  qty: string
}

export type Transport = {
  id: string
  pickup: string
  delivery: string
  vehicle: string
  items: TransportItem[]
  price: number
  status: 'pending' | 'active' | 'completed' | 'cancelled'
  date: string
}

const STORAGE_KEY = 'haulr.transports'

export function getTransports(): Transport[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    return JSON.parse(raw) as Transport[]
  } catch {
    return []
  }
}

export function getTransport(id: string): Transport | undefined {
  return getTransports().find((t) => t.id === id)
}

export function updateTransportStatus(id: string, status: Transport['status']): void {
  const all = getTransports()
  const idx = all.findIndex((t) => t.id === id)
  if (idx >= 0) {
    all[idx].status = status
    localStorage.setItem(STORAGE_KEY, JSON.stringify(all))
  }
}

export function vehicleLabel(v: string): string {
  const map: Record<string, string> = {
    bakfiets: 'Bakfiets',
    bestelbus: 'Bestelbus',
    vrachtwagen: 'Vrachtwagen',
  }
  return map[v] ?? v
}

export function statusLabel(s: string): string {
  const map: Record<string, string> = {
    pending: 'In afwachting',
    active: 'Onderweg',
    completed: 'Afgeleverd',
    cancelled: 'Geannuleerd',
  }
  return map[s] ?? s
}
