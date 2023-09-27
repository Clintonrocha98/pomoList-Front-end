import ThemeButton from "@/components/ThemeButton";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="max-w-7xl ml-auto mr-auto">
      <div className="flex flex-col gap-4 items-center justify-center min-h-screen-64">
        <h1 className="max-w-lg m-0 ml-auto mr-auto text-center font-medium text-4xl">
          Domine sua Rotina: Listas e Técnicas Pomodoro para o Sucesso!
        </h1>
        <p className="max-w-lg m-0 ml-auto mr-auto text-center font-medium text-base text-gray-400">
          Desperte sua produtividade e controle seu tempo com nosso sistema de
          listas e técnicas Pomodoro. Encontre o caminho para uma vida mais
          equilibrada.
        </p>
        <Button className="w-40 bg-black m-0 ml-auto mr-auto hover:bg-opacity-50 my-3">
          <Link href="/signup">Comece agora</Link>
        </Button>
      </div>
    </main>
  );
}
