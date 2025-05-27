// src/components/SkattForm.tsx
import { useState } from "react";
import axios from "axios";

export function SkattForm() {
  const [inkomst, setInkomst] = useState("");
  const [resultat, setResultat] = useState<any>(null);

  const beräkna = async () => {
    const response = await axios.get("http://localhost:8080/api/skatt/beräkna", {
      params: { inkomst: parseFloat(inkomst) }
    });
    setResultat(response.data);
  };

  return (
    <div>
      <h2>Beräkna Skatt</h2>
      <input
        type="number"
        placeholder="Ange årsinkomst"
        value={inkomst}
        onChange={(e) => setInkomst(e.target.value)}
      />
      <button onClick={beräkna}>Beräkna</button>

      {resultat && (
        <div>
          <p>Kommunalskatt: {resultat.kommunalSkatt} kr</p>
          <p>Statlig skatt: {resultat.statligSkatt} kr</p>
          <p>Total skatt: {resultat.totalSkatt} kr</p>
        </div>
      )}
    </div>
  );
}
