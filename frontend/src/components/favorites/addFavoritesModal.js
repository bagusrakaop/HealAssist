export default function AddFavoritesModal({ title, children, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white w-4/5 p-10 overflow-auto rounded-xl">
        <div className="flex justify-between items-center mb-4">
          <div className="font-bold text-2xl text-primary">{title}</div>
          <button onClick={onClose} className="text-xl font-bold">
            ×
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
