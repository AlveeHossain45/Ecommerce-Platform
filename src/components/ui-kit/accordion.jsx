import React, { useState } from 'react'
import { ChevronDown } from 'lucide-react'

export const Accordion = ({ items }) => {
  const [openIndex, setOpenIndex] = useState(null)

  return (
    <div className="space-y-2">
      {items.map((item, index) => (
        <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg">
          <button
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className="flex items-center justify-between w-full p-4 text-left"
          >
            <span className="font-medium text-gray-900 dark:text-white">
              {item.title}
            </span>
            <ChevronDown
              size={20}
              className={`transform transition-transform ${
                openIndex === index ? 'rotate-180' : ''
              }`}
            />
          </button>
          {openIndex === index && (
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
              {item.content}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}