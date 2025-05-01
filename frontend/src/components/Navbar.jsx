import React from "react";
import { Menu, School } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import DarkMode from "../DarkMode";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Link } from "react-router-dom";

const Navbar = () => {
  let user = true;
  return (
    <div className="h-16 dark:bg-[#0A0A0A] bg-white border-b dark:border-gray-800 fixed top-0 left-0 right-0">
      <div className="max-w-7xl mx-auto hidden md:flex justify-between items-center h-full">
        <div className="flex items-center gap">
          <School size={"30"} />
          <h1 className="hidden md:block font-bold text-3xl">LMS</h1>
        </div>
        <div className="flex gap-6">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem><Link to='my-learning'>My Learning</Link></DropdownMenuItem>
                  <DropdownMenuItem>Edit Profile</DropdownMenuItem>
                  <DropdownMenuItem>Log Out</DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>Dashboard</DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex gap-1">
              <Button variant="outline">Signup</Button>
              <Button>Login</Button>
            </div>
          )}
          <div>
            <DarkMode />
          </div>
        </div>
      </div>
      <div className="md:hidden flex items-center h-full justify-around">
        <div className="flex items-center gap">
          <School size={"30"} className="flex" />
          <h1 className="md:block font-bold text-3xl">LMS</h1>
        </div>
        <div>
          <div className="flex gap-0.5">
            <Sheetdemo />
            <DarkMode />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

function Sheetdemo() {
  return (
    <Sheet> 
      <SheetTrigger asChild>
        <Button variant="outline"><Menu /></Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle><h1>LMS</h1>
          </SheetTitle>
        </SheetHeader>
        <div className="">
          <div>My Account</div>
          <div>My Learning</div>
          <div>Edit Profile</div>
          <div>Log Out</div>
          <div>Dashboard</div>
        </div>
        
        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Save changes</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
