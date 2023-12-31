import { Button } from "@/components/ui/button";
import Link  from "next/link";
const LandingPage = () => {
    return (
        <div>
            conmeo
            <div>
                <Link href={"/sign-in"}>
                    <Button>Login To DashBoard</Button>
                </Link>    
            </div>
            <div>
                <Link href={"/sign-up"}>
                    <Button>Register</Button>
                </Link>    
            </div>
        </div>
    );
}

export default LandingPage ;