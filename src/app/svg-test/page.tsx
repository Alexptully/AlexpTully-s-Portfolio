import type { Metadata } from "next";
import { HexPipe } from "@/components/svg/HexPipe";
import { Architecture } from "@/components/svg/Architecture";
import { BlueprintStrip } from "@/components/svg/BlueprintStrip";
import { HandParameters } from "@/components/svg/HandParameters";
import { RegressionChart } from "@/components/svg/RegressionChart";
import { PinPoster } from "@/components/three/PinPoster";

export const metadata: Metadata = { robots: { index: false, follow: false } };

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-[var(--border)] py-12">
      <h2 className="type-heading mb-6">{label}</h2>
      <div className="flex flex-wrap items-start gap-10">
        <div style={{ width: 358 }}>{children}</div>
        <div style={{ width: 960 }}>{children}</div>
      </div>
    </section>
  );
}

export default function SvgTestPage() {
  return (
    <main className="mx-auto max-w-[1100px] px-4 py-10">
      <h1 className="type-title">WP3 SVG proofs</h1>

      <Row label="HexPipe">
        <HexPipe title="Hex pipe" desc="A ribbed hexagonal pipe with a branch and a connector." />
      </Row>

      <Row label="Architecture">
        <Architecture
          title="CeraPiper architecture"
          desc="Three software layers and the printed blueprint."
          layers={[
            {
              name: "Design layer",
              tech: "Onshape, FeatureScript",
              lines: ["Ribbed pipes, branches, connectors", "All profiles hexagonal"],
            },
            {
              name: "Translation middleware",
              tech: "Python, Flask",
              lines: ["Feature tree to a directed graph", "Linearised into one extrusion run"],
            },
            {
              name: "Fabrication backend",
              tech: "Arduino, C++",
              lines: ["Primitives to motor steps", "Re-checks the bed limit"],
            },
            {
              name: "Paper blueprint",
              tech: "Plotted on a 20 cm roll",
              lines: ["Runs under the clay on the bed"],
              kind: "physical",
            },
          ]}
          links={["Feature tree over the Onshape REST API", "JSON Function Stack", "USB serial"]}
        />
      </Row>

      <Row label="BlueprintStrip">
        <BlueprintStrip
          title="Paper blueprint"
          desc="A 20 cm sheet with cut marks, mandrel size and a hex hole."
          partName="Main bed"
          pieceId="Piece 3 of 7"
          sheetWidth="20 cm"
          note="Notes print with each bed"
          marks={{
            cut: "Cut line: the 800 mm bed, less the fixed start and end pieces.",
            endPiece: "The 60 mm start and end pieces the machine always extrudes.",
            mandrel: "The mandrel in use, which sets the inner diameter.",
            hexHole: "Where a hex hole is hand-cut to receive a perpendicular branch.",
          }}
        />
      </Row>

      <Row label="HandParameters">
        <HandParameters
          title="Hand measurements"
          desc="Seven measurements across digits one to five."
          digitLabels={["Digit 1", "Digit 2", "Digit 3", "Digit 4", "Digit 5"]}
          parameters={{
            handCircumference: "Hand circumference",
            handLength: "Hand length",
            palmLength: "Palm length",
            wristCircumference: "Wrist circumference",
            fingerRoot: "Finger root circumference",
            interphalangeal: "Interphalangeal joint circumference",
            distalInterphalangeal: "Distal interphalangeal joint circumference",
          }}
        />
      </Row>

      <Row label="RegressionChart">
        <RegressionChart
          title="Launcher speed regression"
          desc="Speed rises linearly with shot distance."
          x={{ label: "Shot distance d", min: 0, max: 400, ticks: [0, 100, 200, 300, 400] }}
          y={{ label: "Launcher speed v", min: 1000, max: 2100, ticks: [1000, 1400, 1800, 2100] }}
          line={{ slope: 2.64, intercept: 1013, label: "v = d · 2.64 + 1013" }}
          notes={["200+ trials, 8 mm compression, correlation 0.9880 (team measurement)."]}
        />
      </Row>

      <Row label="PinPoster">
        <div className="aspect-[4/3] w-full rounded-[16px] bg-[var(--bg)]">
          <PinPoster />
        </div>
      </Row>
    </main>
  );
}
