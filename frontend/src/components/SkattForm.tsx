import { useState, useEffect } from "react";
import axios from "axios";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";
import "../SkattForm.css";
import { kommuner } from "../kommuner";

const skattFordelning = [
  { namn: "Skola", andel: 0.25 },
  { namn: "Vård", andel: 0.20 },
  { namn: "Omsorg", andel: 0.20 },
  { namn: "Infrastruktur", andel: 0.10 },
  { namn: "Kultur & Fritid", andel: 0.05 },
  { namn: "Övrigt", andel: 0.20 }
];

export function SkattForm() {
  const [inkomst, setInkomst] = useState("");
  const [kommun, setKommun] = useState(kommuner[0].namn);
  const [resultat, setResultat] = useState<null | {
    kommunalSkatt: number;
    statligSkatt: number;
    totalSkatt: number;
  }>(null);
  const [visning, setVisning] = useState<"lista" | "graf">("lista");
  const [historik, setHistorik] = useState<any[]>([]);

  // Ladda historik från localStorage vid start
  useEffect(() => {
    const sparad = localStorage.getItem("skattHistorik");
    if (sparad) setHistorik(JSON.parse(sparad));
  }, []);

  // Spara historik till localStorage när den ändras
  useEffect(() => {
    localStorage.setItem("skattHistorik", JSON.stringify(historik));
  }, [historik]);

  const beräkna = async () => {
    const res = await axios.get("http://localhost:8080/api/skatt/beräkna", {
      params: { inkomst, kommun }
    });
    setResultat(res.data);

    // Lägg till i historik
    const ny = {
      datum: new Date().toLocaleString(),
      kommun,
      inkomst,
      ...res.data
    };
    setHistorik(prev => [ny, ...prev].slice(0, 5)); // Max 5 poster
  };

  const perManad = resultat ? resultat.totalSkatt / 12 : 0;
  const perVecka = resultat ? resultat.totalSkatt / 52 : 0;
  const perDag = resultat ? resultat.totalSkatt / 365 : 0;

  const chartData = [
    { namn: "År", värde: resultat?.totalSkatt ?? 0 },
    { namn: "Månad", värde: perManad },
    { namn: "Vecka", värde: perVecka },
    { namn: "Dag", värde: perDag }
  ];

  const fordelningsData = resultat
    ? skattFordelning.map(f => ({
        namn: f.namn,
        värde: resultat.totalSkatt * f.andel
      }))
    : [];

  return (
    <div className="skatt-container">
      <div className="skatt-card">
        <h1 className="skatt-title">Skattplaneraren</h1>
        <p className="skatt-desc">
          Räkna ut din skatt per år, månad, vecka och dag.
        </p>
        <select
          className="skatt-input"
          value={kommun}
          onChange={e => setKommun(e.target.value)}
          style={{ marginBottom: 12 }}
        >
          {kommuner.map(k => (
            <option key={k.namn} value={k.namn}>{k.namn}</option>
          ))}
        </select>
        <input
          type="number"
          value={inkomst}
          onChange={e => setInkomst(e.target.value)}
          placeholder="Ange årsinkomst"
          className="skatt-input"
        />
        <button onClick={beräkna} className="skatt-btn">
          Beräkna
        </button>
        <div className="skatt-radio">
          <label>
            <input
              type="radio"
              checked={visning === "lista"}
              onChange={() => setVisning("lista")}
            /> Lista
          </label>
          <label style={{ marginLeft: "1em" }}>
            <input
              type="radio"
              checked={visning === "graf"}
              onChange={() => setVisning("graf")}
            /> Graf
          </label>
        </div>
        {resultat && visning === "lista" && (
          <div className="skatt-result">
            <p>Kommunalskatt: <b>{resultat.kommunalSkatt.toFixed(2)} kr/år</b></p>
            <p>Statlig skatt: <b>{resultat.statligSkatt.toFixed(2)} kr/år</b></p>
            <p>Total skatt: <b>{resultat.totalSkatt.toFixed(2)} kr/år</b></p>
            <hr />
            <p><b>Per månad:</b> {perManad.toFixed(2)} kr</p>
            <p><b>Per vecka:</b> {perVecka.toFixed(2)} kr</p>
            <p><b>Per dag:</b> {perDag.toFixed(2)} kr</p>
          </div>
        )}
        {resultat && visning === "graf" && (
          <div className="skatt-result">
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={chartData}>
                <XAxis dataKey="namn" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="värde" fill="#003366" name="Skatt" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
        {resultat && (
          <div className="skatt-result" style={{ marginTop: 24 }}>
            <h4>Så här fördelas din skatt:</h4>
            {visning === "lista" ? (
              <ul>
                {fordelningsData.map(f => (
                  <li key={f.namn}>
                    {f.namn}: <b>{f.värde.toFixed(0)} kr/år</b>
                  </li>
                ))}
              </ul>
            ) : (
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={fordelningsData}>
                  <XAxis dataKey="namn" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="värde" fill="#2a7bbd" name="Andel av skatt" />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        )}

        {/* Historik */}
        {historik.length > 0 && (
          <div className="skatt-historik" style={{ marginTop: 32 }}>
            <h4>Senaste uträkningar</h4>
            <ul>
              {historik.map((h, i) => (
                <li key={i}>
                  {h.datum}: {h.kommun}, {h.inkomst} kr → Total skatt: <b>{h.totalSkatt.toFixed(2)} kr</b>
                </li>
              ))}
            </ul>
          </div>
        )}
        {resultat && (
          <button
            className="skatt-btn"
            style={{ marginTop: 16, marginBottom: 16 }}
            onClick={() => window.print()}
          >
            Skriv ut / Spara som PDF
          </button>
        )}
      </div>
      <footer className="skatt-footer">
        © {new Date().getFullYear()} Skattplaneraren – Demo för Skatteverket
      </footer>
    </div>
  );
}