'use client'

import { useState } from 'react'
import { useCustomizer } from '@/store/useCustomizer'
import ColorSwatches from './controls/ColorSwatches'
import { PatternPicker } from './controls/PatternPicker'
import BackgroundPicker from './controls/BackgroundPicker'
import SizePicker from './controls/SizePicker'
import { ModelSelector } from './controls/ModelSelector'
import { OutfitSelector } from './controls/OutfitSelector'
import { SaveOutlined, PlusOutlined, DownOutlined } from '@ant-design/icons'

export default function Sidebar() {
  return (
    <div className="h-fit w-full rounded-lg bg-white p-6 shadow-lg border border-gray-300">
    
      <div className="divide-y divide-gray-300">
        <div className="pb-4">
          <p className="text-2xl font-semibold mb-5">Mô hình</p>
          <ModelSelector />
        </div>
        

      
        <AccordionSection title="Màu sắc">
          <div className="space-y-4">
            <ColorSwatches part="skin" label="Skin color" />
            <ColorSwatches part="hat" label="Hat color" />
            <ColorSwatches part="top" label="Top color" />
            <ColorSwatches part="bottom" label="Bottom color" />
            <ColorSwatches part="shoes" label="Shoes color" />
          </div>
        </AccordionSection>

             
        <AccordionSection title="Trang phục">
          <OutfitSelector />
        </AccordionSection>

       
        <AccordionSection title="Kết cấu">
          <div className="space-y-4">
            <PatternPicker target="hat" />
            <PatternPicker target="top" />
            <PatternPicker target="bottom" />
            <PatternPicker target="shoes" />
          </div>
        </AccordionSection>

       
        <AccordionSection title="Nền">
          <BackgroundPicker />
        
        </AccordionSection>

        
        <AccordionSection title="Kích cỡ">
          <SizePicker />
        
        </AccordionSection>
      </div>

       
      <div className="flex gap-2 pt-6">
        <button className="flex-1 inline-flex items-center justify-center gap-2 rounded-md bg-teal-600 px-4 py-2 font-medium text-white shadow hover:bg-teal-500">
          <SaveOutlined /> Save
        </button>
        <button className="flex-1 inline-flex items-center justify-center gap-2 rounded-md border border-gray-300 bg-white px-4 py-2 font-medium text-gray-700 hover:bg-gray-100 transition duration-200">
          <PlusOutlined /> Add
        </button>
      </div>
    </div>
  )
}

function AccordionSection({
  title,
  children,
  defaultOpen = false,
}: {
  title: string
  children: React.ReactNode
  defaultOpen?: boolean
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between py-4 text-lg font-semibold text-gray-800 transition-colors hover:text-orange-500"
      >
        <span>{title}</span>
        <DownOutlined
          className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          style={{ fontSize: '1rem' }}
        />
      </button>
      {isOpen && <div className="pb-4 animate-in fade-in-0 slide-in-from-top-2 duration-300">{children}</div>}
    </div>
  )
}