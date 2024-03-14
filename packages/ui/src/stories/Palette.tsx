// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import React from "react";
import palette from "../color-palette.json";

export const Page: React.FC = () => {
  return (
    <div className="bg-darkGray1 text-white">
      <article className="prose container mx-auto py-12 px-4 bg-darkGray1 prose-invert">
        <h1>Palette</h1>
        <div className="relative before:absolute before:block before:bg-white before:h-full before:w-1/2 before:right-0 before:content-[''] before:z-0">
          {Object.entries(palette).map(([category, { name, colors }]) => (
            <div key={category} className="relative">
              <h2>{name}</h2>
              {
                <div>
                  {Object.entries(colors).map(
                    ([color, { name, description, dark, light }]) => (
                      <div key={color}>
                        <h3>{name}</h3>
                        <p>{description}</p>
                        <p className="w-1/2 text-sm">
                          Class names:
                          <br />
                          <code>text-{color}</code>,<br />
                          <code>bg-{color}</code>
                        </p>

                        <div className="flex gap-4 items-strech">
                          <div className="w-1/2 p-8 rounded">
                            <p className="font-bold text-xs">{dark}</p>
                            <div
                              className="w-full h-16 rounded-lg shadow-md"
                              style={{
                                backgroundColor: dark,
                              }}
                            />
                          </div>
                          <div className="w-1/2 p-8 rounded">
                            <p className="text-darkGray2 font-bold text-xs">
                              {light}
                            </p>
                            <div
                              className="w-full h-16 rounded-lg shadow-md"
                              style={{
                                backgroundColor: light,
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    ),
                  )}
                </div>
              }
            </div>
          ))}
        </div>
      </article>
    </div>
  );
};
