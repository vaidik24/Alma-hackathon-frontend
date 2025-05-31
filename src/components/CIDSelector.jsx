export default function CIDSelector({ selectedCID, onChange }) {
  return (
    <div className="flex flex-col space-y-3 max-w-sm">
      <label htmlFor="cid-select" className="text-sm font-medium text-gray-700">
        Select CID
      </label>
      <select
        id="cid-select"
        value={selectedCID}
        onChange={onChange}
        className="block w-full px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mb-3"
      >
        <option value="1">Jagran Lakecity University</option>
        <option value="2">Thakur Global Business School</option>
        <option value="3">Aarupadai Veed Medical College</option>
      </select>
    </div>
  );
}