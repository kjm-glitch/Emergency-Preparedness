"use client";

import { useState } from "react";
import { InventoryItem } from "@/types/inventory";
import { ExpirationBadge } from "./ExpirationBadge";

interface ItemRowProps {
  item: InventoryItem;
  onUpdate: (id: string, updates: Partial<InventoryItem>) => void;
  onDelete: (id: string) => void;
}

export function ItemRow({ item, onUpdate, onDelete }: ItemRowProps) {
  const [editing, setEditing] = useState(false);
  const [editData, setEditData] = useState(item);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const percent = item.targetQty > 0 ? Math.round((item.onHand / item.targetQty) * 100) : 0;
  const stockColor =
    percent >= 100
      ? "text-emerald-600"
      : percent >= 50
        ? "text-amber-600"
        : percent > 0
          ? "text-orange-600"
          : "text-red-500";

  const handleSave = () => {
    onUpdate(item.id, {
      name: editData.name,
      targetQty: editData.targetQty,
      onHand: editData.onHand,
      unit: editData.unit,
      expirationDate: editData.expirationDate || null,
      shelfLife: editData.shelfLife,
      notes: editData.notes,
    });
    setEditing(false);
  };

  if (editing) {
    return (
      <tr className="bg-blue-50/50">
        <td className="px-3 py-2" colSpan={6}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Item Name</label>
              <input
                type="text"
                value={editData.name}
                onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                className="w-full px-2 py-1.5 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Target Qty</label>
              <input
                type="number"
                min={0}
                value={editData.targetQty}
                onChange={(e) => setEditData({ ...editData, targetQty: Number(e.target.value) })}
                className="w-full px-2 py-1.5 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">On Hand</label>
              <input
                type="number"
                min={0}
                value={editData.onHand}
                onChange={(e) => setEditData({ ...editData, onHand: Number(e.target.value) })}
                className="w-full px-2 py-1.5 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Unit</label>
              <input
                type="text"
                value={editData.unit}
                onChange={(e) => setEditData({ ...editData, unit: e.target.value })}
                className="w-full px-2 py-1.5 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Expiration Date</label>
              <input
                type="date"
                value={editData.expirationDate || ""}
                onChange={(e) => setEditData({ ...editData, expirationDate: e.target.value || null })}
                className="w-full px-2 py-1.5 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Shelf Life</label>
              <input
                type="text"
                value={editData.shelfLife}
                onChange={(e) => setEditData({ ...editData, shelfLife: e.target.value })}
                className="w-full px-2 py-1.5 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
              />
            </div>
            <div className="sm:col-span-2 lg:col-span-3">
              <label className="block text-xs font-medium text-gray-600 mb-1">Notes</label>
              <input
                type="text"
                value={editData.notes}
                onChange={(e) => setEditData({ ...editData, notes: e.target.value })}
                className="w-full px-2 py-1.5 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
              />
            </div>
          </div>
          <div className="flex gap-2 mt-3">
            <button onClick={handleSave} className="px-3 py-1.5 bg-blue-600 text-white rounded text-sm font-medium hover:bg-blue-700">
              Save
            </button>
            <button onClick={() => { setEditing(false); setEditData(item); }} className="px-3 py-1.5 bg-gray-200 text-gray-700 rounded text-sm font-medium hover:bg-gray-300">
              Cancel
            </button>
          </div>
        </td>
      </tr>
    );
  }

  return (
    <tr className="border-b border-gray-100 hover:bg-gray-50/50 group">
      <td className="px-3 py-2.5">
        <div className="font-medium text-gray-900 text-sm">{item.name}</div>
        {item.notes && <div className="text-xs text-gray-500 mt-0.5">{item.notes}</div>}
      </td>
      <td className="px-3 py-2.5 text-center">
        <div className="flex items-center justify-center gap-1">
          <button
            onClick={() => onUpdate(item.id, { onHand: Math.max(0, item.onHand - 1) })}
            className="w-6 h-6 rounded bg-gray-100 hover:bg-gray-200 text-gray-600 text-xs font-bold flex items-center justify-center"
          >
            -
          </button>
          <span className={`font-semibold text-sm min-w-[2.5rem] text-center ${stockColor}`}>
            {item.onHand}
          </span>
          <button
            onClick={() => onUpdate(item.id, { onHand: item.onHand + 1 })}
            className="w-6 h-6 rounded bg-gray-100 hover:bg-gray-200 text-gray-600 text-xs font-bold flex items-center justify-center"
          >
            +
          </button>
        </div>
      </td>
      <td className="px-3 py-2.5 text-center text-sm text-gray-600">
        {item.targetQty} {item.unit}
      </td>
      <td className="px-3 py-2.5 text-center">
        <div className="w-16 mx-auto bg-gray-200 rounded-full h-2 overflow-hidden">
          <div
            className={`h-2 rounded-full transition-all ${
              percent >= 100
                ? "bg-emerald-500"
                : percent >= 50
                  ? "bg-amber-400"
                  : percent > 0
                    ? "bg-orange-500"
                    : "bg-red-400"
            }`}
            style={{ width: `${Math.min(percent, 100)}%` }}
          />
        </div>
        <div className={`text-xs mt-0.5 font-medium ${stockColor}`}>{percent}%</div>
      </td>
      <td className="px-3 py-2.5 text-center">
        <ExpirationBadge date={item.expirationDate} />
      </td>
      <td className="px-3 py-2.5 text-right">
        <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => { setEditing(true); setEditData(item); }}
            className="p-1.5 rounded hover:bg-blue-50 text-blue-600"
            title="Edit"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
          {confirmDelete ? (
            <div className="flex items-center gap-1">
              <button
                onClick={() => onDelete(item.id)}
                className="px-2 py-1 rounded bg-red-600 text-white text-xs font-medium hover:bg-red-700"
              >
                Confirm
              </button>
              <button
                onClick={() => setConfirmDelete(false)}
                className="px-2 py-1 rounded bg-gray-200 text-gray-700 text-xs font-medium hover:bg-gray-300"
              >
                No
              </button>
            </div>
          ) : (
            <button
              onClick={() => setConfirmDelete(true)}
              className="p-1.5 rounded hover:bg-red-50 text-red-500"
              title="Delete"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          )}
        </div>
      </td>
    </tr>
  );
}
