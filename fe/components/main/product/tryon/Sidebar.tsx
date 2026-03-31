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
  const { modelId, setModelId, bodyType, setBodyType } = useCustomizer()

  // ✅ mapping chuẩn giữa type và file SVG
  const BODY_OPTIONS = [
    { type: 'skinny', img: '/body/Bskinny.svg', label: 'Gầy' },
    { type: 'fit', img: '/body/Bfit.svg', label: 'Chuẩn' },
    { type: 'fat', img: '/body/Bfat.svg', label: 'Béo' },
  ]

  return (
    <div className="flex flex-col gap-5">

      {/* Gender */}
      <div className="bg-gray-50 rounded-2xl p-4 border border-gray-200">
        <div className="text-sm font-semibold text-gray-900 mb-4">
          Giới tính
        </div>

        <div className="grid grid-cols-2 gap-3">
          {(['avatar_male', 'avatar_female'] as ModelId[]).map((id) => {
            const isSelected = modelId === id

            return (
              <button
                key={id}
                onClick={() => setModelId(id)}
                className={`rounded-xl py-2.5 font-bold text-sm transition ${isSelected
                  ? 'bg-black text-white'
                  : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-100'
                  }`}
              >
                {id === 'avatar_female' ? 'Nữ' : 'Nam'}
              </button>
            )
          })}
        </div>
      </div>

      {/* Body Type */}
      <div className="bg-gray-50 rounded-2xl p-4 border border-gray-200">
        <div className="text-sm font-semibold text-gray-900 mb-4">
          Thân hình
        </div>

        <div className="grid grid-cols-3 gap-3">
          {BODY_OPTIONS.map((item) => {
            const isSelected = bodyType === item.type

            return (
              <button
                key={item.type}
                onClick={() => setBodyType(item.type as BodyType)}
                className={`flex flex-col items-center justify-center rounded-xl p-2 transition ${isSelected
                  ? 'bg-black text-white scale-105 shadow-md'
                  : 'bg-white border border-gray-200 hover:bg-gray-100'
                  }`}
              >
                {/* SVG BODY */}
                <img
                  src={item.img}
                  alt={item.type}
                  className={`w-10 h-16 object-contain transition ${isSelected ? 'opacity-100' : 'opacity-70'
                    }`}
                />

                {/* LABEL */}
                <span
                  className={`text-[11px] mt-1 ${isSelected ? 'text-white' : 'text-gray-500'
                    }`}
                >
                  {item.label}
                </span>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}