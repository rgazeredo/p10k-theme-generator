import React from 'react';
import { FaApple, FaCodeBranch, FaFolderOpen, FaGithubAlt, FaHourglassEnd, FaRegClock } from 'react-icons/fa';

import { SegmentConfig } from '../types/config';

export default function Terminal({ segments }: { segments: SegmentConfig[] }) {
  const leftSegments = segments.filter(s => s.position === 'left');
  const rightSegments = segments.filter(s => s.position === 'right');


  const renderLeftSeparator = (bgColor: string) => (
    <div
      className="relative h-[26px] flex items-center"
      style={{
        marginLeft: '-1px',
        zIndex: 1
      }}
    >
      <div
        style={{
          width: 0,
          height: 0,
          borderTop: '13px solid transparent',
          borderBottom: '13px solid transparent',
          borderLeft: `13px solid ${bgColor}`,
          position: 'absolute',
          zIndex: 2
        }}
      />
      <div
        style={{
          width: 0,
          height: 0,
          borderTop: '13px solid transparent',
          borderBottom: '13px solid transparent',
          borderLeft: `13px solid ${bgColor}`,
          position: 'absolute',
          left: '1px',
          zIndex: 1
        }}
      />
    </div>
  );

  const renderRightSeparator = (bgColor: string) => (
    <div
      className="relative h-[26px] flex items-center"
      style={{
        marginRight: '-1px',
        zIndex: 1
      }}
    >
      <div
        style={{
          width: 0,
          height: 0,
          borderTop: '13px solid transparent',
          borderBottom: '13px solid transparent',
          borderRight: `13px solid ${bgColor}`,
          position: 'absolute',
          zIndex: 2
        }}
      />
      <div
        style={{
          width: 0,
          height: 0,
          borderTop: '13px solid transparent',
          borderBottom: '13px solid transparent',
          borderRight: `13px solid ${bgColor}`,
          position: 'absolute',
          right: '1px',
          zIndex: 1
        }}
      />
    </div>
  );

  const renderIcon = (icon: string) => {
    switch (icon) {
      case 'apple':
        return <FaApple className="w-4 h-4 inline-block" />
      case 'folder':
        return <FaFolderOpen className="w-3 h-3 inline-block" />
      case 'branch':
        return (<><FaGithubAlt className="w-3 h-3 inline-block mr-2" /> <FaCodeBranch className="w-3 h-3 inline-block" /></>)
      case 'hourglass':
        return <FaHourglassEnd className="w-3 h-3 inline-block" />
      case 'clock':
        return <FaRegClock className="w-3 h-3 inline-block" />
      default:
        return null
    }
  }

  const renderLeftSegment = (segment: SegmentConfig, i: number) => (
    <>
      <span
        style={{
          color: segment.fgHex,
          backgroundColor: segment.bgHex,
          padding: i == 0 ? '2px 8px' : '2px 8px 2px 20px',
          height: '26px',
          display: 'flex',
          alignItems: 'center'
        }}
      >
        {segment.icon && renderIcon(segment.icon)}
        {segment.content && <span className='ml-2'>{segment.content}</span>}
      </span>
      {renderLeftSeparator(segment.bgHex)}
    </>
  )

  const renderRightSegment = (segment: SegmentConfig, i: number) => (
    <>
      {renderRightSeparator(segment.bgHex)}
      <span
        style={{
          color: segment.fgHex,
          backgroundColor: segment.bgHex,
          padding: i == 0 ? '2px 20px 2px 13px' : '2px 8px 2px 20px',
          height: '26px',
          display: 'flex',
          alignItems: 'center'
        }}
      >
        {segment.content && <span className='mr-2'>{segment.content}</span>}
        {segment.icon && renderIcon(segment.icon)}
      </span>
    </>
  )

  return (
    <div className="space-y-4">
      <div className="bg-gray-800 rounded-lg overflow-hidden sticky top-4">
        <div className="bg-gray-700 p-2 flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="p-4 font-mono text-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              {leftSegments.map((segment, i) => (
                <React.Fragment key={segment.variable || i}>
                  {renderLeftSegment(segment, i)}
                </React.Fragment>
              ))}
            </div>
            <div className="flex items-center">
              {rightSegments.map((segment, i) => (
                <React.Fragment key={segment.variable || i}>
                  {renderRightSegment(segment, i)}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div >
  );
}
