'use client';

import { useState } from 'react';
import Terminal from '../components/Terminal';
import { SegmentConfig, defaultSegments } from '../types/config';

export default function Home() {
  const [segments, setSegments] = useState<SegmentConfig[]>(defaultSegments);

  const updateSegment = (index: number, newSegment: SegmentConfig) => {

    console.log(newSegment);

    const newSegments = [...segments];
    newSegments[index] = newSegment;
    setSegments(newSegments);
  };

  const configCode = segments
    .map(segment => {

      var BACKGROUND = `typeset -g POWERLEVEL9K_${segment.variable}_BACKGROUND="${segment.bg}"`;
      var FOREGROUND = `typeset -g POWERLEVEL9K_${segment.variable}_FOREGROUND="${segment.fg}"`;

      if (segment.variable.includes('VCS_')) {
        var variable = segment.variable.replace('VCS_', '');
        variable = variable.toLowerCase();

        FOREGROUND = `local      ${variable}='%${segment.fg}F'`;
      }

      if (segment.variable == 'DIR') {
        FOREGROUND += `\ntypeset -g POWERLEVEL9K_${segment.variable}_SHORTENED_FOREGROUND="${segment.fg}"`;
        FOREGROUND += `\ntypeset -g POWERLEVEL9K_${segment.variable}_ANCHOR_FOREGROUND="${segment.fg}"`;
      }

      return `${BACKGROUND}\n${FOREGROUND}\n`;

    })
    .join('\n');

  return (
    <div className="min-h-screen bg-gray-900 px-8 pt-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">Powerlevel10k Theme Generator</h1>

        <Terminal segments={segments} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-8">
          {segments.map((segment, index) => (
            <div key={segment.variable} className="bg-gray-800 p-4 rounded-lg">
              <div className="flex justify-between items-center">
                <h3 className="text-gray-200 font-semibold">{segment.name}</h3>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={segment.bg}
                    onChange={(e) => updateSegment(index, { ...segment, bg: e.target.value })}
                    className="w-10 h-10 rounded bg-gray-700 text-gray-200"
                    placeholder="BG"
                  />

                  {segment.variable.includes('VCS_') ? (
                    <select onChange={(e) => updateSegment(index, { ...segment, fg: e.target.value })}>
                      <option value="0">Black</option>
                      <option value="1">Coral</option>
                      <option value="2">Olivine</option>
                      <option value="3">Orange</option>
                      <option value="4">Blue</option>
                      <option value="5">Yellow</option>
                      <option value="6">Green</option>
                      <option value="7">Silver</option>
                    </select>
                  ) : (
                    <input
                      type="color"
                      value={segment.fg}
                      onChange={(e) => updateSegment(index, { ...segment, fg: e.target.value })}
                      className="w-10 h-10 rounded bg-gray-700 text-gray-200"
                      placeholder="FG"
                    />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="font-semibold text-gray-400 text-lg mb-2">Replace the variables in your <code>.p10k.zsh</code> file</p>
        <div className="bg-gray-800 p-6 rounded-lg">
          <pre className="text-gray-200 text-sm overflow-x-auto">
            {configCode}
          </pre>
        </div>
      </div>
      <div className="bg-gray-900 text-gray-400 p-4 text-center">
        <p>Created by <a className="text-sky-300" href="https://github.com/rgazeredo" target="_blank">rgazeredo</a></p>
      </div>
    </div>
  );
}
