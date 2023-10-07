import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
type onClickPropType = {
  onClick: () => void;
};
export function AvatarIcon({ onClick }: onClickPropType) {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="cursor-pointer">
            <AvatarImage
              src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
              alt="github icon"
              className="object-cover"
            />
            <AvatarFallback>GH</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-auto flex justify-center">
          <DropdownMenuItem onClick={onClick} className="w-auto cursor-pointer">Sair</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
