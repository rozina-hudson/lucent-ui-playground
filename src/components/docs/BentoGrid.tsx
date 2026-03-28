"use client";

import { BENTO_COMPOSITIONS } from "./BentoCompositions";
import { Card } from "lucent-ui";

export function BentoGrid() {
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
        if (item.ownCard) {
          return (
            <div
              key={item.id}
              style={{
                breakInside: "avoid",
                marginBottom: 12,
              }}
            >
              <Preview />
            </div>
          );
        }
        return (
          <Card
            key={item.id}
            style={{
              breakInside: "avoid",
              marginBottom: 12,
              overflow: "visible",
            }}
          >
            <Preview />
          </Card>
        );
      })}
    </div>
  );
}
