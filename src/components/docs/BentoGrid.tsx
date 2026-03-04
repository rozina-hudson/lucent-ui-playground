"use client";

import { BENTO_COMPOSITIONS } from "./BentoCompositions";
import { Card } from "lucent-ui";

type Props = {
  previewStyle: React.CSSProperties;
};

export function BentoGrid({ previewStyle }: Props) {
  return (
    <div
      style={{
        columns: 3,
        columnGap: 12,
        padding: "32px 48px 64px",
        flex: 1,
      }}
    >
      {BENTO_COMPOSITIONS.map((item) => {
        const Preview = item.component;
        return (
          <Card
            key={item.id}
            style={{
              breakInside: "avoid",
              marginBottom: 12,
              overflow: "hidden",
              ...previewStyle,
            }}
          >
            <Preview />
          </Card>
        );
      })}
    </div>
  );
}
