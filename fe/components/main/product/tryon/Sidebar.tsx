'use client'

import React, { useState } from 'react'
import {
  Shirt,
  RotateCcw,
  HatGlasses,
  Smile,
  Footprints,
  PersonStanding,
  Scissors
} from 'lucide-react'
import { useCustomizer, GarmentSlot, ModelId } from '@/store/useCustomizer'
import { GARMENTS, BODY_MODELS } from '@/lib/assetsCatalog'

export default function Sidebar() {
  const [activeTab, setActiveTab] = useState<string>('body')

  const navItems = [
    { id: 'body', icon: PersonStanding },
    { id: 'hat', icon: HatGlasses },
    { id: 'top', icon: Shirt },
    { id: 'bottom', icon: Scissors },
    { id: 'shoes', icon: Footprints },
  ]

  return (
    <div className="flex flex-col h-full w-full bg-white text-gray-900 overflow-hidden shadow-2xl pb-4 border border-gray-100">
      {/* Top Navigation */}
      <div className="flex justify-center gap-7 items-center px-5 py-5 bg-white border-b border-gray-200 mb-4">
        {navItems.map((item) => {
          const isActive = activeTab === item.id
          const Icon = item.icon
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center justify-center w-15 h-15 rounded-full  duration-300 ${isActive
                ? 'text-white bg-black'
                : 'text-gray-500 bg-gray-100 hover:text-gray-900 hover:bg-gray-200'
                }`}
            >
              <Icon size={18} strokeWidth={isActive ? 2.5 : 2} />
            </button>
          )
        })}
      </div>

      {/* Content Area */}
      <div className="flex-1 min-h-0 overflow-y-auto px-5 custom-scrollbar pb-6 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-gray-300">
        {activeTab === 'body' ? (
          <BodyContent />
        ) : (
          <GarmentsContent slot={activeTab as GarmentSlot} />
        )}
      </div>
    </div>
  )
}


function GarmentsContent({ slot }: { slot: GarmentSlot }) {
  const { activeGarments, setGarment } = useCustomizer()

  const entries = Object.entries(GARMENTS[slot]) as [string, string][]

  return (
    <div className="grid grid-cols-4 gap-2.5">
      {/* None Button */}
      <button
        onClick={() => setGarment(slot, null)}
        className={`relative aspect-[3/4] p-[1.5px] rounded-[1.25rem]  hover:opacity-70 ${!activeGarments[slot] ? 'border-[1.5px] border-black' : 'border-[1.5px] border-transparent'
          }`}
      >
        <div className="w-full h-full rounded-2xl bg-gray-100 flex items-center justify-center text-gray-500 text-xs font-semibold">
          Không có
        </div>
      </button>

      {/* Garment Buttons */}
      {entries.map(([name, url]) => {
        const isSelected = activeGarments[slot] === url;
        const Icon = slot === 'hat' ? HatGlasses :
          slot === 'top' ? Shirt :
            slot === 'bottom' ? Scissors :
              Footprints;

        return (
          <button
            key={name}
            onClick={() => setGarment(slot, url)}
            className={`relative aspect-[3/4] p-[1.5px] rounded-[1.25rem]  hover:opacity-70 ${isSelected ? 'border-[1.5px] border-black' : 'border-[1.5px] border-transparent'
              }`}
          >
            <div className="w-full h-full rounded-2xl bg-[#D6E0EC] flex items-center justify-center relative overflow-hidden">
              <span className="text-[10px] text-gray-800 font-bold z-10 text-center px-1 bg-white/70 backdrop-blur-sm rounded-md py-1 mx-1">
                {name.replace(/_/g, ' ')}
              </span>
              <div className="absolute inset-0 flex flex-col items-center justify-end pb-3 opacity-30 text-gray-900 pointer-events-none">
                <Icon size={28} />
              </div>
            </div>
          </button>
        )
      })}
    </div>
  )
}

function BodyContent() {
  const { modelId, setModelId, colors, setColor } = useCustomizer()
  const [activeScaleId, setActiveScaleId] = useState<number>(3)

  return (
    <div className="flex flex-col gap-4">
      {/* Gender */}
      <div className="bg-gray-50 rounded-2xl p-4 border border-gray-200">
        <div className="flex items-center gap-2 text-sm font-semibold text-gray-900 mb-4">
          <Smile className="w-4 h-4 text-gray-500" /> Giới tính
        </div>
        <div className="grid grid-cols-2 gap-3">
          {(Object.keys(BODY_MODELS) as ModelId[]).map((id) => (
            <button
              key={id}
              onClick={() => setModelId(id)}
              className={`rounded-[1rem] border py-2.5 flex items-center justify-center font-bold text-[14px]  ${
                modelId === id 
                  ? 'border-black bg-black text-white shadow-sm' 
                  : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              {id === 'avatar_female' ? 'Nữ' : 'Nam'}
            </button>
          ))}
        </div>
      </div>
      {/* Body Type */}
      <div className="bg-gray-50 rounded-2xl p-4 border border-gray-200">
        <div className="flex justify-between items-center mb-5">
          <div className="flex items-center gap-2 text-sm font-semibold text-gray-900">
            <PersonStanding className="w-4 h-4 text-gray-500" /> Thân hình
          </div>
        </div>

        <div className="flex justify-between gap-5 items-end h-[90px] px-1">
          {[
            { id: 1, scaleX: 0.6 },
            { id: 2, scaleX: 0.9 },
            { id: 3, scaleX: 1.2 },
            { id: 4, scaleX: 1.5 },
            { id: 5, scaleX: 1.8 }
          ].map((type) => {
            const isSelected = type.id === activeScaleId

            return (
              <button
                key={type.id}
                onClick={() => setActiveScaleId(type.id)}
                className={`w-full h-full rounded-[1.1rem] flex flex-col justify-center items-center overflow-hidden  ${isSelected
                  ? 'bg-black border border-black'
                  : 'bg-white border border-gray-200 hover:bg-gray-50'
                  }`}
              >
                <svg
                  viewBox="0 0 24 36"
                  fill={isSelected ? 'white' : '#9ca3af'}
                  className="w-9 h-[60px]"
                  style={{ transform: `scaleX(${type.scaleX})`, transformOrigin: 'center' }}
                >
                  <circle cx="12" cy="6" r="3.5" />
                  <path d="M7 11.5 C5 11.5 4 12.5 4 15 L4 21 C4 22 5 23 6.5 23 L8 23 L8 35 C8 36.5 10 36.5 10 35 L10 24 L14 24 L14 35 C14 36.5 16 36.5 16 35 L16 23 L17.5 23 C19 23 20 22 20 21 L20 15 C20 12.5 19 11.5 17 11.5 L7 11.5 Z" />
                </svg>
              </button>
            )
          })}
        </div>
      </div>

      {/* Skin */}
      <div className="bg-gray-50 rounded-2xl p-4 border border-gray-200">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2 text-sm font-semibold text-gray-900">
            <div className="w-4 h-4 rounded-md bg-white border-2 border-gray-300"></div> Màu da
          </div>
          <span className="text-gray-500 text-xs">{colors.skin}</span>
        </div>

        <div className="w-full flex items-center justify-between gap-4">
          <span className="text-[11px] text-gray-500 whitespace-nowrap"></span>
          <div className="relative flex items-center w-full h-[6px] rounded-full overflow-hidden border border-gray-200 bg-gray-200">
            <input
              type="color"
              value={colors.skin}
              onChange={(e) => setColor('skin', e.target.value as `#${string}`)}
              className="absolute w-[200%] h-[200%] top-[-50%] left-[-50%] cursor-pointer border-none bg-transparent"
            />
          </div>
        </div>
      </div>

      {/* Body proportions */}
      <div className="bg-gray-50 rounded-2xl p-4 border border-gray-200">
        <div className="flex justify-between items-center mb-5">
          <div className="flex items-center gap-2 text-sm font-semibold text-gray-900">
            <PersonStanding className="w-4 h-4 text-gray-500" /> Tỷ lệ cơ thể
          </div>
          <button className="text-gray-400 hover:text-gray-900 transition-colors">
            <RotateCcw size={14} />
          </button>
        </div>
        <div className="space-y-5">
          <CustomSlider label="Đầu" defaultValue={0} />
          <CustomSlider label="Thân" defaultValue={0} />
          <CustomSlider label="Chân" defaultValue={0} />
        </div>
      </div>
    </div>
  )
}

function CustomSlider({
  label,
  min = -1,
  max = 1,
  step = 0.01,
  defaultValue = 0
}: {
  label: string
  min?: number
  max?: number
  step?: number
  defaultValue?: number
}) {
  const [value, setValue] = React.useState(defaultValue)
  const percentage = ((value - min) / (max - min)) * 100

  return (
    <div className="flex flex-col gap-2 group">
      <div className="flex justify-between text-[11px] text-gray-600 font-medium">
        <span>{label}</span>
        <span>{value.toFixed(2)}</span>
      </div>
      <div className="relative flex items-center w-full h-4 mt-1">
        {/* Track */}
        <div className="absolute w-full h-[3px] bg-gray-200 rounded-full overflow-hidden pointer-events-none">
          <div
            className="h-full bg-black rounded-r-full"
            style={{ width: `${percentage}%` }}
          />
        </div>
        {/* Thumb */}
        <div
          className="absolute w-3 h-3 bg-white rounded-full shadow-md pointer-events-none transition-transform group-hover:scale-[1.3]"
          style={{ left: `calc(${percentage}% - 6px)` }}
        />
        {/* Input */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => setValue(parseFloat(e.target.value))}
          className="absolute w-full h-full opacity-0 cursor-pointer"
        />
      </div>
    </div>
  )
}