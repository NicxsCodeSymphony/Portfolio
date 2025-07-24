'use client'

import Image from 'next/image'
import { useTestimonialPage } from '../hooks/useTestimonyPage'

type TestimonialProps = { id?: string }


export default function Testimonial({ id }: TestimonialProps) {

    const {data: mockTestimonials, loading, error} = useTestimonialPage()


  const gradientClasses = [
    'bg-gradient-to-br from-blue-50 to-indigo-100',
    'bg-gradient-to-br from-green-50 to-emerald-100',
    'bg-gradient-to-br from-purple-50 to-violet-100',
    'bg-gradient-to-br from-orange-50 to-amber-100',
    'bg-gradient-to-br from-pink-50 to-rose-100',
    'bg-gradient-to-br from-teal-50 to-cyan-100',
  ]

  const avatarColors = [
    'bg-blue-500',
    'bg-green-500',
    'bg-purple-500',
    'bg-orange-500',
    'bg-pink-500',
    'bg-teal-500',
  ]

  const getGoogleDriveImageUrl = (fileId: string) =>
    `https://drive.google.com/uc?export=view&id=${fileId}`

  const getImageSource = (imageUrl: string) => {
    if (!imageUrl) return null
    if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) return imageUrl
    if (imageUrl.startsWith('/')) return imageUrl
    if (/^[a-zA-Z0-9_-]+$/.test(imageUrl)) return getGoogleDriveImageUrl(imageUrl)
    return null
  }

  const getInitials = (name: string) =>
    name
      .split(' ')
      .map((word) => word[0])
      .join('')
      .toUpperCase()

  return (
    <div className="min-h-screen w-full py-16 md:py-24 lg:py-32 bg-white" id={id}>
      <div className="flex flex-col gap-6 md:flex-row md:justify-between md:items-center px-4 md:px-16 lg:px-32 xl:px-56">
        <div>
          <h1 className="text-[28px] md:text-[42px] lg:text-[50px] font-medium text-[#0A2F3B]">What Clients Say</h1>
          <p className="text-[14px] md:text-[18px] lg:text-[20px] mt-2 text-gray-600">
            Testimonials from satisfied clients and collaborators
          </p>
        </div>
        <p className="capitalize text-[#286F6E] font-semibold underline text-[14px] md:text-[16px]">
          View all reviews
        </p>
      </div>

      <div className="mt-12 md:mt-16 lg:mt-20 overflow-x-auto scrollbar-hide">
        <div className="flex gap-16 md:gap-8 lg:gap-14 pb-4 justify-center px-8 md:px-16" style={{ minWidth: '100%' }}>
          {mockTestimonials.map((testimonial, index) => {
            const gradientClass = gradientClasses[index % gradientClasses.length]
            const avatarColor = avatarColors[index % avatarColors.length]
            const initials = getInitials(testimonial.name)
            const processedImageUrl = getImageSource(testimonial.image_url)
            const hasValidImageUrl = processedImageUrl !== null

            return (
              <div
                key={testimonial.uid}
                className={`h-[400px] w-[320px] md:h-[450px] md:w-[380px] lg:h-[480px] lg:w-[420px] ${gradientClass} rounded-[30px] md:rounded-[40px] lg:rounded-[50px] px-6 md:px-8 py-8 md:py-10 flex flex-col justify-between relative overflow-hidden flex-shrink-0 shadow-lg`}
              >
                <div className="z-10">
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-5 h-5 ${
                          i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'
                        } fill-current`}
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-[14px] md:text-[16px] lg:text-[18px] text-gray-700 leading-relaxed mb-6 italic">
                    &quot;{testimonial.testimony}&quot;
                  </p>
                </div>
                <div className="z-10">
                  <div className="flex items-center">
                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-full overflow-hidden mr-4 flex-shrink-0 relative">
                      {hasValidImageUrl ? (
                        <Image
                          src={processedImageUrl}
                          alt={testimonial.name}
                          width={56}
                          height={56}
                          className="object-cover w-full h-full"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none'
                            const fallbackDiv = e.currentTarget.parentElement?.querySelector('.avatar-fallback') as HTMLElement
                            if (fallbackDiv) fallbackDiv.style.display = 'flex'
                          }}
                        />
                      ) : null}
                      <div
                        className={`avatar-fallback absolute inset-0 ${avatarColor} rounded-full flex items-center justify-center ${
                          hasValidImageUrl ? 'hidden' : ''
                        }`}
                      >
                        <span className="text-white font-bold text-[16px] md:text-[18px]">{initials}</span>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-[#0A2F3B] text-[16px] md:text-[18px] lg:text-[20px] font-semibold">
                        {testimonial.name}
                      </h4>
                      <p className="text-gray-600 text-[12px] md:text-[14px] lg:text-[16px]">
                        {testimonial.position}, {testimonial.company}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
