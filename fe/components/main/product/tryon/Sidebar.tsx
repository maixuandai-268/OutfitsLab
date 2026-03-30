'use client'

import React, { useState, useEffect } from 'react'
import {
  Shirt,
  RotateCcw,
  HatGlasses,
  Smile,
  Footprints,
  PersonStanding,
  Scissors
} from 'lucide-react'
import { useCustomizer, GarmentSlot, GarmentProduct, BodyType, resolveModelUrl, ModelId } from '@/store/useCustomizer'
import { useGarments } from '@/hooks/useGarments'

export default function Sidebar() {
  const [activeTab, setActiveTab] = useState<string>('body')

  const { bodyType, selectedGarments, setGarment, modelId } = useCustomizer()
  const genderFilter = modelId === 'avatar_female' ? 'female' : 'male'

  const { garments: hatGarments, loading: hatLoading } = useGarments('hat', genderFilter)
  const { garments: topGarments, loading: topLoading } = useGarments('top', genderFilter)
  const { garments: bottomGarments, loading: bottomLoading } = useGarments('bottom', genderFilter)
  const { garments: shoesGarments, loading: shoesLoading } = useGarments('shoes', genderFilter)

  useEffect(() => {
    const autoSelect = (slot: GarmentSlot, list: GarmentProduct[], isLoading: boolean) => {

      if (isLoading || list.length === 0) return

      const curr = selectedGarments[slot]
      const isInList = curr ? list.some(g => g.id === curr.id) : false

      if (curr && resolveModelUrl(curr, bodyType) && isInList) return

      const firstValid = list.find(g => resolveModelUrl(g, bodyType))
      if (firstValid && firstValid.id !== curr?.id) {
        setGarment(slot, firstValid)
      } else if (!firstValid && curr && !isInList) {
        setGarment(slot, null)
      }
    }

    autoSelect('top', topGarments, topLoading)
    autoSelect('bottom', bottomGarments, bottomLoading)
    autoSelect('shoes', shoesGarments, shoesLoading)

  }, [
    bodyType,
    topGarments, topLoading,
    bottomGarments, bottomLoading,
    shoesGarments, shoesLoading,
    selectedGarments, setGarment
  ])

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
              className={`flex items-center justify-center rounded-full duration-300 w-12 h-12 ${isActive
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
          <GarmentsContent
            slot={activeTab as GarmentSlot}
            garments={
              activeTab === 'hat' ? hatGarments :
                activeTab === 'top' ? topGarments :
                  activeTab === 'bottom' ? bottomGarments :
                    shoesGarments
            }
            loading={
              activeTab === 'hat' ? hatLoading :
                activeTab === 'top' ? topLoading :
                  activeTab === 'bottom' ? bottomLoading :
                    shoesLoading
            }
          />
        )}
      </div>
    </div>
  )
}

function GarmentsContent({ slot, garments, loading }: { slot: GarmentSlot, garments: GarmentProduct[], loading: boolean }) {
  const { selectedGarments, bodyType, setGarment } = useCustomizer()

  const Icon = slot === 'hat' ? HatGlasses :
    slot === 'top' ? Shirt :
      slot === 'bottom' ? Scissors : Footprints;

  return (
    <div className="grid grid-cols-4 gap-2.5">
      {/* None Button */}
      {slot === 'hat' && (
        <button
          onClick={() => setGarment(slot, null)}
          className={`relative aspect-[3/4] p-[1.5px] rounded-[1.25rem] hover:opacity-70 ${!selectedGarments[slot] ? 'border-[1.5px] border-black' : 'border-[1.5px] border-transparent'
            }`}
        >
          <div className="w-full h-full rounded-2xl bg-gray-100 flex items-center justify-center text-gray-500 text-xs font-semibold">
            Không có
          </div>
        </button>
      )}

      {/* Garment Buttons */}
      {loading ? (
        <div className="col-span-3 py-10 text-center text-xs text-gray-400">Đang tải...</div>
      ) : garments.length === 0 ? (
        <div className="col-span-3 py-10 text-center text-xs text-gray-400"></div>
      ) : (
        garments.map((product) => {
          const currentUrl = resolveModelUrl(product, bodyType)
          const isSelected = selectedGarments[slot]?.id === product.id
          const hasModel = !!currentUrl

          return (
            <button
              key={product.id}
              onClick={() => hasModel ? setGarment(slot, product) : undefined}
              disabled={!hasModel}
              title={
                !hasModel
                  ? `Sản phẩm này chưa có model cho thân hình "${bodyType}"`
                  : product.name
              }
              className={`relative aspect-[3/4] p-[1.5px] rounded-[1.25rem] transition-all ${!hasModel
                  ? 'opacity-30 cursor-not-allowed border-[1.5px] border-transparent'
                  : isSelected
                    ? 'border-[1.5px] border-black hover:opacity-70'
                    : 'border-[1.5px] border-transparent hover:opacity-70'
                }`}
            >
              <div className={`w-full h-full rounded-2xl flex items-center justify-center relative overflow-hidden ${isSelected ? 'bg-[#c8d4e3]' : 'bg-[#D6E0EC]'}`}>
                {product.image && (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="absolute inset-0 w-full h-full object-cover opacity-80"
                  />
                )}
                <span className="text-[9px] text-gray-800 font-bold z-10 text-center px-1 bg-white/70 backdrop-blur-sm rounded-md py-1 mx-1 line-clamp-2">
                  {product.name}
                </span>
              </div>
            </button>
          )
        })
      )}
    </div>
  )
}

function BodyContent() {
  const { modelId, setModelId, colors, setColor, bodyType, setBodyType } = useCustomizer()

  const SCALE_OPTIONS: { type: BodyType, scaleX: number }[] = [
    { type: 'skinny', scaleX: 0.6 },
    { type: 'fit', scaleX: 0.9 },
    { type: 'fat', scaleX: 1.2 },
  ]

  return (
    <div className="flex flex-col gap-4">
      {/* Gender */}
      <div className="bg-gray-50 rounded-2xl p-4 border border-gray-200">
        <div className="flex items-center gap-2 text-sm font-semibold text-gray-900 mb-4">
          <Smile className="w-4 h-4 text-gray-500" /> Giới tính
        </div>
        <div className="grid grid-cols-2 gap-3">
          {(['avatar_male', 'avatar_female'] as ModelId[]).map((id) => (
            <button
              key={id}
              onClick={() => setModelId(id)}
              className={`rounded-[1rem] border py-2.5 flex items-center justify-center font-bold text-[14px]  ${modelId === id
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
          {SCALE_OPTIONS.map((type) => {
            const isSelected = type.type === bodyType

            return (
              <button
                key={type.type}
                onClick={() => setBodyType(type.type)}
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
    </div>
  )
}