// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import React from "react";
import palette from "../config/colors.json";

export const Page = ({ darkMode }: { darkMode: boolean }) => {
  return (
    <div>
      <article className="container mx-auto py-12 px-4">
        <h1 className="text-2xl font-bold">
          Colors ({darkMode ? "Dark" : "Light"} mode)
        </h1>

        <div className="flex flex-col gap-y-8 mt-8">
          {Object.entries(palette).map(([category, { name, colors }]) => (
            <div key={category} className="relative">
              <h2 className="font-bold text-lg mb-4">{name}</h2>
              {
                <div className="grid grid-cols-4 gap-4">
                  {Object.entries(colors).map(
                    ([color, { name, description, dark, light }]) => (
                      <div key={color} className="">
                        <h2 className="font-bold text-sm ">{name}</h2>

                        <div
                          className="w-full h-16 rounded-lg shadow-md"
                          style={{
                            backgroundColor: darkMode ? dark : light,
                          }}
                        />
                        <div className="gap-y-2 flex flex-col text-xs py-2">
                          <p className="font-bold text-xs">{dark}</p>
                          <p className="text-xs">{description}</p>
                          <p className="font-bold">
                            Tailwind:
                            <pre className="text-xxs overflow-ellipsis whitespace-nowrap overflow-hidden">
                              text-{color}
                              {darkMode ? "-dark" : ""}
                            </pre>
                            <pre className="text-xxs overflow-ellipsis whitespace-nowrap overflow-hidden">
                              bg-{color}
                              {darkMode ? "-dark" : ""}
                            </pre>
                          </p>
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
