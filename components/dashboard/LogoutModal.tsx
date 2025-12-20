import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { removeToken } from "../auth/token";

export default function LogoutModal() {
  const handleLogout = async () => {
    await removeToken();
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger className="w-full">
          <button className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-red-600 hover:bg-red-50 transition-colors duration-200 w-full  cursor-pointer">
            <LogOut size={20} />
            <span className="text-base font-medium">Log out</span>
          </button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <div className="flex flex-col items-center gap-4 py-2">
            {/* Red icon with logout symbol */}
            <div className="flex items-center justify-center w-16 h-16 bg-red-600 rounded-lg">
              <LogOut className="text-white" size={32} />
            </div>

            <DialogHeader className="text-center space-y-2">
              <DialogTitle className="text-xl text-center font-bold text-gray-800">
                Logout Account?
              </DialogTitle>
              <DialogDescription className="text-base text-center text-gray-600">
                Are you sure you want to logout <br /> this account?
              </DialogDescription>
            </DialogHeader>

            <DialogFooter className="flex-row gap-3 w-full sm:justify-center">
              <DialogClose asChild>
                <Button
                  variant="secondary"
                  className="py-5 flex-1 bg-gray-200 text-gray-700 hover:bg-gray-300 rounded-lg cursor-pointer"
                >
                  Cancel
                </Button>
              </DialogClose>
              <Button
                onClick={handleLogout}
                variant="destructive"
                className="py-5 flex-1 bg-red-600 text-white hover:bg-red-700 rounded-lg cursor-pointer"
              >
                Logout
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
