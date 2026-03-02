export interface InventoryItem {
  id: string;
  name: string;
  category: string;
  targetQty: number;
  onHand: number;
  unit: string;
  expirationDate: string | null;
  shelfLife: string;
  notes: string;
}

export interface CategorySummary {
  name: string;
  emoji: string;
  color: string;
  items: InventoryItem[];
  totalTarget: number;
  totalOnHand: number;
  percentStocked: number;
}

export type AlertType = "expired" | "expiring-soon" | "low-stock" | "out-of-stock";

export interface Alert {
  type: AlertType;
  item: InventoryItem;
  message: string;
}
