import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ModeToggle() {
    const { theme, setTheme, resolvedTheme } = useTheme();

    return (
        <Button
            variant="outline"
            size="icon"
            onClick={() =>
                setTheme(resolvedTheme === "light" ? "dark" : "light")
            }
        >
            {resolvedTheme === "light" ? (
                <Sun className="h-[1.2rem] w-[1.2rem] transition-transform" />
            ) : (
                <Moon className="h-[1.2rem] w-[1.2rem] transition-transform" />
            )}
        </Button>
    );
}
