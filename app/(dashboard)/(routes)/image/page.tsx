"use client"
import axios from "axios";
import * as z from "zod";
import {Headding} from "@/components/heading"
import { Download, ImageIcon} from "lucide-react";
import { useForm } from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod"
import { amountOptions, formSchema, resolutionOptions } from "./constants";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Empty } from "@/components/empty";
import { Loader } from "@/components/loader";
import { cn } from "@/lib/utils";
import { Select,SelectTrigger,SelectValue,SelectContent,SelectItem } from "@/components/ui/select";
import { Card, CardFooter } from "@/components/ui/card";
import Image from "next/image";


const ImagePage = () => {
    const [images, setimages] = useState<string[]>([])
    const router = useRouter();
    const form = useForm <z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues:{
        prompt:"",
        amount: "1",
        resolution: "512x512"
    }
 })

 const isLoading = form.formState.isSubmitting;
 const onSubmit = async (values:z.infer<typeof formSchema>) => {
    try {
        setimages([]);
        const respone = await axios.post("/api/image",values)
        const urls = respone.data.map((image:{url:string}) => image.url);
        setimages(urls);
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
           title="Image Generation"
           description="Turn You Prompt Into An Image"
           icon={ImageIcon}
           iconColor="text-red-700"
           bgColor="bg-red-700/10"
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
                                    <FormItem className="col-span-12 lg:col-span-6">
                                        <FormControl className="m-0 p-0">
                                            <Input
                                                className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                                                disabled={isLoading}
                                                placeholder="A Picture Of a Horse In Swiss alps"
                                                {...field}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                            control={form.control}
                            name="resolution"
                            render={({field}) => (
                                <FormItem className="col-span-12 lg:col-span-2">
                                    <Select
                                        disabled={isLoading}
                                        onValueChange={field.onChange}
                                        value={field.value}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue defaultValue={field.value}/>
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {resolutionOptions.map((option) => (
                                                <SelectItem
                                                 key={option.value}
                                                 value={option.value}
                                                >
                                                    {option.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>

                                    </Select>
                                </FormItem>
                            )}
                            />
                        <FormField
                            control={form.control}
                            name="amount"
                            render={({field}) => (
                                <FormItem className="col-span-12 lg:col-span-2">
                                    <Select
                                        disabled={isLoading}
                                        onValueChange={field.onChange}
                                        value={field.value}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue defaultValue={field.value}/>
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {amountOptions.map((option) => (
                                                <SelectItem
                                                 key={option.value}
                                                 value={option.value}
                                                >
                                                    {option.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>

                                    </Select>
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
                        <div className="p-20">
                            <Loader/>
                        </div>
                    )}
                    {images.length === 0 && !isLoading &&(
                        <Empty
                            label="No Images Here XD"
                        />
                    )}
                        <div className="grid grid-cols-1 md:grid-cols-2 ls:grid-cols-3 xl:grid-cols-4 gap-4 mt-8">
                            {images.map((src)=>(
                                <Card
                                    key={src}
                                    className="rounded-lg overflow-hidden"
                                >
                                    <div className="relative aspect-square">
                                        <Image
                                            alt="Image"
                                            fill
                                            src={src}
                                        />
                                    </div>
                                    <CardFooter className="p-2">
                                        <Button variant="secondary" className="w-full" onClick={() => window.open(src)}>
                                            <Download className="h-4 w-4 mr-2"/>
                                            Dowload
                                        </Button>
                                    </CardFooter>
                                </Card>
                            ))}
                        </div>
                </div>
           </div>
        </div>
    );
}

export default ImagePage ;