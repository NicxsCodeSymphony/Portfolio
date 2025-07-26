'use client'

import { useStackPage } from "@/app/hooks/useStackPage"
import Image from "next/image"
import { useEffect, useState } from "react"
import "@/css/stack.css"
import { Stacks } from "@/types/Stacks"

const Stack = () => {
  const { data, loading, error } = useStackPage()
  const [stacks, setStacks] = useState<Stacks[]>([])

  useEffect(() => {
    if (data) {
      // Duplicate the data to create seamless loop
      setStacks([...data, ...data])
    }
  }, [data])

  if (loading) return <div className="text-center">Loading...</div>
  if (error) return <div className="text-center text-red-500">Error loading stacks</div>

  return (
    <div className="marquee-container w-full overflow-hidden py-6">
      <div className="marquee-track flex items-center px-4">
        {stacks.map((item, index) => (
          <div
            key={`${item.uid}-${index}`} 
            title={`${item.stack} - Rating: ${item.rating}`}
            className="flex flex-col items-center justify-center mx-[60px] hover:scale-105 transition-transform duration-300 group flex-shrink-0"
          >
            <div className="relative w-16 h-16">
              <Image
                src={`https://drive.google.com/uc?id=${item.icon}`}
                alt={item.stack}
                layout="fill"
                objectFit="contain"
                className="rounded"
              />
            </div>
            <div className="mt-2 text-black text-sm opacity-80 group-hover:opacity-100">
              {item.stack}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Stack