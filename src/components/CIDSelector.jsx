export default function CIDSelector({ selectedCID, onChange }) {
  return (
    <>
      <label htmlFor="cid-select">Select CID: </label>
      <select id="cid-select" value={selectedCID} onChange={onChange}>
        <option value="1">Jagran Lakecity University</option>
        <option value="2">Thakur Global Business School</option>
        <option value="3">Aarupadai Veed Medical College</option>
      </select>
    </>
  );
}