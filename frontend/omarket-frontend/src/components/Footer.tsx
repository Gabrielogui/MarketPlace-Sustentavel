import Image from "next/image";

export default function Footer () {
    return(
        <footer className="flex flex-col pt-2 gap-7 w-full items-center border-t-2 border-gray-300">
            <div>
                <span>Voltar ao Início</span>
            </div>
            <div className="flex flex-col items-center">
                <span>Colaboradores</span>
                <div className="flex flex-row justify-between gap-56">
                    <div>
                        <p>Gabriel Rodrigues</p>
                        <div className="flex flex-row gap-4 items-center">
                            <Image className="cursor-pointer hover:scale-110 transition-all" src={"/icons8-linkedin-30.png"} alt="linkedin" height={30} width={30}></Image>
                            <Image className="cursor-pointer hover:scale-110 transition-all" src={"/icons8-github-24.png"} alt="github" height={30} width={30}></Image>
                            <Image className="cursor-pointer hover:scale-110 transition-all" src={"/icons8-instagram-32.png"} alt="instagram" height={30} width={30}></Image>
                        </div>
                    </div>
                    <div>
                        <p>Luiz Vinícius Souza</p>
                        <div className="flex flex-row gap-4 items-center">
                            <Image className="cursor-pointer hover:scale-110 transition-all" src={"/icons8-linkedin-30.png"} alt="linkedin" height={30} width={30}></Image>
                            <Image className="cursor-pointer hover:scale-110 transition-all" src={"/icons8-github-24.png"} alt="github" height={30} width={30}></Image>
                            <Image className="cursor-pointer hover:scale-110 transition-all" src={"/icons8-instagram-32.png"} alt="instagram" height={30} width={30}></Image>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <h1>omarket</h1>
            </div>
        </footer>
    );
}