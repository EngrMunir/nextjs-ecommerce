"use client"
import Logo from "@/app/assets/svgs/Logo";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { registerSchema } from "./registerValidation";

const RegisterForm = () => {
    const form = useForm({
        resolver: zodResolver(registerSchema)
    });

    const password = form.watch("password");
    const passwordConfirm = form.watch("passwordConfirm");

    const onSubmit: SubmitHandler<FieldValues> =(data)=>{
        console.log(data);
    }

    return (
        <div className="border-2 border-gray-300 rounded-xl flex-grow max-w-md w-full p-5">
            <div className="flex items-center space-x-4">
                <Logo/>
                <div>
                    <h1 className="text-xl font-semibold">Register</h1>
                    <p>Join us today and start your journey!!</p>
                </div>
            </div>
            <Form {...form}>
               <form onSubmit={form.handleSubmit(onSubmit)}>
               <FormField
                    control={form.control}
                    name="name"
                    render={({field}) => (
                    <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                            <Input {...field} value={field.value || ""}/>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
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
               <FormField
                    control={form.control}
                    name="passwordConfirm"
                    render={({field}) => (
                    <FormItem>
                        <FormLabel>Confirm Password</FormLabel>
                        <FormControl>
                            <Input type="password" {...field} value={field.value || ""}/>
                        </FormControl>
                        {
                            passwordConfirm && password !== passwordConfirm ?
                            (<FormMessage>Password does not match</FormMessage>):(<FormMessage/>)
                        }
                    </FormItem>
                    )}
                />
                <Button type="submit" className="w-full mx-auto my-2">Register</Button>
               </form>
               <p>Already have an account? <Link href="/login">Login</Link> </p>
                </Form>

        </div>
    );
};

export default RegisterForm;