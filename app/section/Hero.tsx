import Image from "next/image"
import Logo from "../../assets/crmc.png"
import Nico from "../../assets/nico.png"

type HeroProps = {id?: string}

export default function Hero({id}: HeroProps){

    return(
        <>
        <div className="py-48 px-56 w-full h-[100vh]">
            {/* Left */}
            <div className="absolute top-[11rem] flex flex-col justify-between h-[70vh]">
                <h1 className="text-[80px] font-semibold w-[35rem] leading-[90px]">Here There, I'm Nico</h1>
                <h3 className="text-[#286F6E] font-semibold">nicxsician@gmail.com</h3>
                <div className="flex items-center gap-2">
                    <p className="font-semibold text-[70px]">3</p>
                    <p className="text-[23px] w-10 leading-[25px]">Work Experience</p>
                </div>
            </div>

            {/* Right */}
            <div className="absolute top-[13rem] flex flex-col justify-between h-[65vh] right-0 w-[40rem]">
                <p>I do code to contribute 
                to positive change in society</p>
                <div className="w-[30vw] flex justify-center items-center flex-col">
                    <Image src={Logo} alt="Logo" />
                    <p className="w-[30%] text-center mt-3">Graduated Magna Cum Laude - Top 3  Overall</p>
                </div>
            </div>

            {/* Nico Image Center Bottom */}
            <div className="absolute left-[55%] bottom-0 transform -translate-x-1/2 mb-4">
                <Image src={Nico} alt="Nico" />
            </div>
        </div>
        </>
    )
}