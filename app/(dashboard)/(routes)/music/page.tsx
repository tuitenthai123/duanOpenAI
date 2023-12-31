"use client"
import axios from "axios";
import * as z from "zod";
import {Headding} from "@/components/heading"
import { MessageSquare } from "lucide-react";
import { useForm } from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod"
import { formSchema } from "./constants";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ChatCompletionRequestMessage } from "openai";
import { useState } from "react";
import { Empty } from "@/components/empty";
import { Loader } from "@/components/loader";


const MusicPage = () => {
    
    const [Music, setMusic] = useState<string>();
    const router = useRouter();
    const form = useForm <z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues:{
        prompt:""
    }
 })

 const isLoading = form.formState.isSubmitting;
 const onSubmit = async (values:z.infer<typeof formSchema>) => {
    try {
        setMusic(undefined);
        const respone = await axios.post("/api/music",values)
        console.log(respone.data.audio);
        setMusic(respone.data.audio);
        form.reset();
    } catch (error:any) {
        console.log(error)

    }
    finally{
        router.refresh();
    }
 }

    return (
        <div>
           <Headding
           title="Music Generation"
           description="Make Music With AI "
           icon={MessageSquare}
           iconColor="text-violet-500"
           bgColor="bg-violet-500/10"
           />
           <div className="px-4 lg:px-8">
                <div>
                   <Form {...form}>
                        <form 
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2"
                        >
                            <FormField
                                name="prompt"
                                render={({field}) => (
                                    <FormItem className="col-span-12 lg:col-span-10">
                                        <FormControl className="m-0 p-0">
                                            <Input
                                                className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                                                disabled={isLoading}
                                                placeholder="Guitar Solo"
                                                {...field}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <Button className="col-span-12 lg:col-span-2 w-full" disabled={isLoading}>
                                Generate
                            </Button>
                        </form>
                   </Form>
                </div>
                <div className="space-y-4 mt-4 ">
                    {isLoading && (
                        <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
                            <Loader/>
                        </div>
                    )}
                    {!Music && !isLoading &&(
                        <Empty
                            label="No Music Here :D"
                        />
                    )}
                    {Music && (
                    <audio controls className="w-full mt-8">
                        <source src={Music}/>
                        
                    </audio>
                    )}
                </div>
           </div>
        </div>
    );
}

export default MusicPage ;