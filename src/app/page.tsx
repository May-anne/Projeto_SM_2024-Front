'use client'
import { HeaderOut } from "@/components/Header";
import Image from "next/image";
import Link from "next/link";
import hero1 from '../../public/images/idoso1.png'
import hero2 from '../../public/images/idoso2.png'
import cross from '../../public/images/cross.png'
import { useEffect, useState } from "react";
import logo from '../../public/images/Pmov.png'


export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [hero1, hero2];
  const textQS1 = 'Bem-vindo ao Movimenta Mais, onde saúde e bem-estar encontram inovação e cuidado personalizado. Somos uma plataforma dedicada ao cuidado integral de pessoas idosas, oferecendo um sistema inovador para cadastro, prescrição de treinos e exames adaptados às necessidades individuais de cada pessoa.' 
  const textQS2 = 'Nosso compromisso vai além da tecnologia. Nós nos dedicamos a proporcionar uma experiência segura e personalizada, promovendo a saúde física e mental de nossos usuários. Acreditamos que cada indivíduo merece uma abordagem única e adaptada, por isso integramos a expertise de profissionais de saúde ao nosso sistema, garantindo um acompanhamento especializado e contínuo.'

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(intervalId);
  }, []); 
  return (
    <div>
      <HeaderOut/>
      <div className="w-full top-0 flex flex-col">
        <div className="bg-[#F8F5FA] flex flex-row justify-between overflow-hidden h-[75vh] w-full ">
          <div className="flex flex-col justify-between w-[50vw] overflow-hidden ">
            <div className="flex flex-col w-full items-end gap-y-[1vh] translate-y-[18vh]">
              <p className="text-[#6B3F97] text-[3rem] w-[36vw] justify-center">Seu parceiro na saúde e bem-estar do idoso</p>
              <p className="w-[36vw] text-xl">Acesse o monitoramento completo para uma vida saudável e ativa.</p>
              <div className="flex flex-row justify-center gap-x-[5vw] w-[36vw] pt-[1vw]">
                <Link href={'/login'} className="py-3 px-[3vw] font-semibold text-xl items-center bg-[#6B3F97] rounded-full text-white hover:bg-white hover:text-[#6B3F97] hover:border-[#6B3F97] hover:border">Entrar</Link>
                <button className="py-3 px-[3vw] font-semibold text-xl items-center border-2 border-[#6B3F97] text-[#6B3F97] hover:bg-[#ded7e5] hover:border-[#524162] rounded-full">Ver Mais</button>
              </div>
            </div>
            <div className="rounded-full bg-[#6B3F97] h-[20vw] w-[20vw] -translate-x-[12vh] translate-y-[22vh]"/>
          </div>
          <div className="rounded-full bg-[#EED6F7] h-[40vw] w-[40vw] mr-[7vw] mt-[13vh]"/>
        </div>
        <div className="absolute w-full z-50 flex flex-col items-end mt-[10vh] pr-[5vw]">
            <div className="rounded-full justify-center flex h-[5vw] w-[5vw] overflow-hidden relative">
              <Image src={cross} alt='' layout="fill" objectFit="cover" />
            </div>
          <div className="rounded-full justify-center flex h-[3vw] w-[3vw] overflow-hidden relative -translate-x-[6vh] -translate-y-[1vh]">
              <Image src={cross} alt='' layout="fill" objectFit="cover" />
          </div>
          <div className="rounded-full justify-center flex h-[2vw] w-[2vw] overflow-hidden relative -translate-x-[2vh] -translate-y-[3vh]">
              <Image src={cross} alt='' layout="fill" objectFit="cover" />
          </div>
        </div>
        <div className="flex flex-row w-full justify-end absolute">
          {images.map((image, index) => (
            <div 
              key={index}
              className={`rounded-full bg-[#6B3F97] justify-center flex h-[38vw] w-[38vw] mt-[15vh] mr-[8vw] overflow-hidden relative `}
              style={index === currentIndex ?{transition: 'opacity 1s ease-in-out', position: 'absolute', opacity:'1'}:{transition: 'opacity 1s ease-in-out', position: 'absolute', opacity:'0' }}>
              <Image src={image} alt='' layout="fill" objectFit="cover" />
          </div>
          ))}
        </div>
        <div className="flex flex-row my-[20vh] justify-center gap-x-[5vw] items-center">
          <div className="flex flex-col gap-y-[3vh]">
            <p className="text-[#6B3F97] text-[3rem]">Quem Somos</p>
            <div className="flex flex-col gap-y-2 w-[36vw] text-justify">
              <p>{textQS1}</p>
              <p>{textQS2}</p>
            </div>
          </div>
          <div className="bg-[#EED6F7] rounded-full w-[40vw] h-[30vh] flex flex-row items-center justify-s pl-[10vh] translate-x-[18vw]">
            <Image src={logo} alt='' className="w-[20vw]" layout="intrinsic"/>
          </div>
        </div> 
        <div className="bg-[#6B3F97] h-[4vh]"/>
      </div>
    </div>
  );
}
