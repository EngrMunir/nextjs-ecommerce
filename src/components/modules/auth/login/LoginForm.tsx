"use client"

import Logo from "@/app/assets/svgs/Logo";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import { loginUser, reCaptchaTokenVerification } from "@/services/AuthService";
import { toast } from "sonner";
import { loginSchema } from "./loginValidation";
import ReCAPTCHA from "react-google-recaptcha";
import { useState } from "react";

const LoginForm = () => {
    const form = useForm({
        resolver: zodResolver(loginSchema)
    });

    const [reCaptchaStatus, setReCaptchaStatus] =useState(false); 

    const {formState: {isSubmitting} }= form;

    const onSubmit: SubmitHandler<FieldValues> = async(data)=>{
        try {
            const res = await loginUser(data);
            if(res?.success){
                toast.success( res?.message);
            }
            else{
                toast.error(res?.message);
            }
        } catch (err:any) {
            console.error(err)
        }
    }

    const handleReCaptcha = (value:string | null) =>{
        try {
            const res = await reCaptchaTokenVerification(value!)
            if(res?.success){
                setReCaptchaStatus(true)
            }
        } catch (err:any) {
            console.error(err)
        }
    }

    return (
        <div className="border-2 border-gray-300 rounded-xl flex-grow max-w-md w-full p-5">
            <div className="flex items-center space-x-4">
                <Logo/>
                <div>
                    <h1 className="text-xl font-semibold">Login</h1>
                    <p>Welcome back!</p>
                </div>
            </div>
            <Form {...form}>
               <form onSubmit={form.handleSubmit(onSubmit)}>
               <FormField
                    control={form.control}
                    name="email"
                    render={({field}) => (
                    <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                            <Input type="email" {...field} value={field.value || ""}/>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
               <FormField
                    control={form.control}
                    name="password"
                    render={({field}) => (
                    <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                            <Input type="password" {...field} value={field.value || ""}/>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />

                <div className="flex mt-3 w-full">
                <ReCAPTCHA sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_CLIENT_KEY as string}
                 onChange={handleReCaptcha}
                 className="mx-auto"
                 />
                </div>
              
                <Button
                disabled={reCaptchaStatus? false: true}
                 type="submit" className="w-full mx-auto my-2">
                    { isSubmitting ? "Logging.....":"Login"}
                </Button>
               </form>
                </Form>
                <p className="text-sm text-gray-600 text-center my-3">
                    Do not have any account? 
                    <Link href="/register" className="text-primary">Register</Link> </p>

        </div>
    );
};

export default LoginForm;