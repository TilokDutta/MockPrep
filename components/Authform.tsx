"use client";
import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {Form} from "@/components/ui/form";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import FormField from "./FormField";
import { useRouter } from "next/navigation";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth"
import { auth } from "@/firebase/client";
import { signIn, signUp } from "@/lib/actions/auth.action";


const authFormSchema = (type:FormType) => {
    return z.object({
        name: type === 'sign-up'? z.string().min(3) : z.string().optional(),
        email:z.string().email(),
        password:z.string().min(3)
    })
}

const Authform = ({type}:{type:FormType}) => {
    const router = useRouter()
  const formSchema = authFormSchema(type)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email:"",
      password:"",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try{
        if(type ==='sign-in'){
            const {email, password} = values;

            const userCredential = await signInWithEmailAndPassword(auth,email,password);
            const idToken = await userCredential.user.getIdToken();
            if(!idToken){
              toast.error('Sign In failed')
              return;
            }
            await signIn({
              email,idToken
            })
            toast.success('Signed In Successfully!')
            router.push('/')
        }else{
            const {name, email, password} = values;
            const userCredentials = await createUserWithEmailAndPassword(auth,email,password);

            const result = await signUp({
              uid:userCredentials.user.uid,
              name:name!,
              email,
              password,
            })
            if(!result?.success){
              toast.error(result?.message);
              return;
            }
            toast.success('Account Created Succesfully! Please Sign In')
            router.push('/sign-in')
        }
    }catch(error){
        console.log(error);
        toast.error(`There is an error ${error}`)
    }
  }
  const isSignIn = type ==='sign-in'
  return (
    <div className="card-border lg:min-w[566px]">
      <div className="card flex flex-col gap-6 py-14 px-10">
        <div className="flex flex-row gap-2 justify-center">
          <Image 
            src="/logo.svg" 
            alt="logo" 
            height={32} 
            width={38} 
          />
          <h2 className="text-primary-200">
            MockPrep
          </h2>
        </div>
        <h3>Practice Job interview with AI</h3>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full mt-4 form">
                {!isSignIn && (
                    <FormField 
                        control={form.control}
                        name="name"
                        label="Name"
                        placeholder="Your Name"
                    />
                )}
                <FormField 
                    control={form.control}
                    name="email"
                    label="Email"
                    placeholder="Enter Email Id"
                    type="email"
                />
                <FormField 
                    control={form.control}
                    name="password"
                    label="Password"
                    placeholder="Enter Password"
                    type="password"
                />
                <Button 
                  className="btn"
                  type="submit"
                >
                    {isSignIn ? 'Sign In' : 'Create a New Account'}
                </Button>
                <p className="text-center">
                    {isSignIn ? 'No Account yet ?':' Already have an Account ?'}
                    <Link 
                        href={isSignIn ? '/sign-up':'sign-in'} 
                        className="font-bold text-user-primary ml-2"
                    >
                        {isSignIn?'Sign Up':'Sign In' }
                    </Link>
                </p>
            </form>
        </Form>
      </div>
    </div>
  );
};

export default Authform;