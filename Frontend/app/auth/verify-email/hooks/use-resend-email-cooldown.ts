import { authControllerVerifyEmailMutation } from "@/app/client/@tanstack/react-query.gen"
import { useAuthStore } from "@/app/store/use-auth.store";
import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/router";

export const useResendEmail = () => {
    const resendEmail = useMutation({
        ...authControllerVerifyEmailMutation
    });
 
    const {auth} = useAuthStore();
    const router = useRouter();

    const resendVerificationEmail = async () => {
        try {
            await
        }
    }
}