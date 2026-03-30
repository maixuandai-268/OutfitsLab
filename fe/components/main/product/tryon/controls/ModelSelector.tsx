'use client'

import { useCustomizer, ModelId } from '@/store/useCustomizer'


export function ModelSelector() {
  const modelId = useCustomizer((s) => s.modelId)
  const setModelId = useCustomizer((s) => s.setModelId)

  const ids: ModelId[] = ['avatar_female', 'avatar_male']

  return (
    <div className="space-y-2">
      <div className="grid grid-cols-2 gap-2">
        {ids.map((id) => (
          <button
            key={id}
            onClick={() => setModelId(id)}
            className={`rounded-md border px-3 py-3 text-sm ${modelId === id ? 'border-green-400 bg-green-50' : 'border-gray-200 bg-white text-gray-700'}`}
          >
            {id}
          </button>
        ))}
      </div>
    </div>
  )
}
