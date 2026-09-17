import type { HowBlock } from "@/content/types";
import { RingCompare } from "@/components/moments/RingCompare";
import { FingerLinkage } from "@/components/moments/FingerLinkage";
import { DriveDiagram } from "@/components/moments/DriveDiagram";
import { HexProfile } from "@/components/moments/HexProfile";
import { Architecture } from "@/components/svg/Architecture";
import { BlueprintStrip } from "@/components/svg/BlueprintStrip";
import { CardFigure, FigureCaption, type Cite } from "@/components/work/Figure";

type MomentSlotProps = {
  how: HowBlock;
  cite: Cite;
};


/**
 * The page's single interactive element (design-spec §6.4, §10.3), chosen by the project's
 * `how.component`. The intro sentence lives here in the DOM; the client component below it
 * owns the control. Anything static that belongs with the moment (the annotated finger card,
 * the drivetrain comparison caption, the CAM-to-CAD table and the two CeraPiper drawings) is
 * rendered here on the server.
 */
export function MomentSlot({ how, cite }: MomentSlotProps) {
  switch (how.component) {
    case "RingCompare": {
      if (!how.off.cleared || !how.on.cleared) {
        // TODO(alex): open question 2 — clear the two Ring frames (ac-04, ac-05). Until then the
        // compare is replaced by the Test 2 photograph, whose caption describes what a sensor sees.
        return (
          <CardFigure image={how.fallback} maxWidth={520} citation={cite(how.fallback.source, "how:fallback")} />
        );
      }
      return (
        <div>
          <p className="type-body measure">{how.intro}</p>
          <div className="mt-6">
            <RingCompare how={how} />
          </div>
        </div>
      );
    }

    case "FingerLinkage":
      return (
        <div>
          <p className="type-body measure">{how.intro}</p>
          <div className="mt-6 grid gap-8 lg:grid-cols-12 lg:gap-x-5">
            <div className="lg:col-span-7">
              <FingerLinkage how={how} />
              <p className="type-caption mt-3 max-w-[60ch]">{how.note}</p>
            </div>
            <CardFigure image={how.card} className="lg:col-span-5" citation={cite(how.card.source, "how:card")} />
          </div>
        </div>
      );

    case "DriveDiagram":
      return (
        <div>
          <p className="type-body measure">{how.intro}</p>
          <figure className="mt-6">
            <DriveDiagram how={how} />
            <FigureCaption text={how.caption} source={how.source} citation={cite(how.source, "how:caption")} />
          </figure>
        </div>
      );

    case "HexProfile": {
      const { translation, architecture, blueprint } = how;
      return (
        <div>
          <p className="type-body measure">{how.intro}</p>
          <div className="mt-6">
            <HexProfile how={how} />
          </div>

          <table className="mt-12 w-full max-w-[40rem] border-collapse">
            <thead>
              <tr className="border-b border-border">
                {translation.columns.map((column) => (
                  <th key={column} scope="col" className="type-caption py-3 pr-5 text-left font-normal">
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {translation.rows.map(([from, to]) => (
                <tr key={from}>
                  <th scope="row" className="type-value py-3 pr-5 text-left font-normal">
                    {from}
                  </th>
                  <td className="type-value py-3">{to}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="type-footnote mt-2">Source: {translation.source.name}</p>

          <div className="mt-12 grid gap-12 lg:grid-cols-12 lg:gap-x-5">
            <figure className="lg:col-span-5">
              <Architecture
                title={architecture.alt}
                desc={architecture.caption}
                layers={architecture.layers}
                links={architecture.links}
                maxWidth={400}
              />
              <FigureCaption
                text={architecture.caption}
                source={architecture.source}
                citation={cite(architecture.source, "how:architecture")}
              />
            </figure>
            <figure className="lg:col-span-7">
              <BlueprintStrip
                title={blueprint.alt}
                desc={blueprint.caption}
                partName={blueprint.partName}
                pieceId={blueprint.pieceId}
                sheetWidth={blueprint.sheetWidth}
                marks={blueprint.marks}
                note={blueprint.note}
                maxWidth={640}
              />
              <FigureCaption
                text={blueprint.caption}
                source={blueprint.source}
                citation={cite(blueprint.source, "how:blueprint")}
              />
            </figure>
          </div>
        </div>
      );
    }
  }
}
