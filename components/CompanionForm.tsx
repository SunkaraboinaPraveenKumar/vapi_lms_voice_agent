"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { subjects, voices } from "@/constants"
import { createCompanion } from "@/lib/actions/companion.actions"
import { redirect } from "next/navigation"
import { toast } from "sonner"
import { useState } from "react"
import { Loader } from "lucide-react"

const formSchema = z.object({
    name: z.string().min(1, { message: 'Companion name is required' }),
    subject: z.string().min(1, { message: 'Subject is required' }),
    topic: z.string().min(1, { message: 'Topic is required' }),
    voice: z.string().min(1, { message: 'Voice is required' }),
    style: z.string().min(1, { message: 'Style is required' }),
    duration: z.number().min(1, { message: 'Duration must be at least 1 minute' }),
})

const CompanionForm = () => {
    const [loading, setLoading] = useState(false);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            subject: "",
            topic: "",
            voice: "",
            style: "",
            duration: 15,
        },
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setLoading(true);
        const companion = await createCompanion(values);
        if (companion) {
            toast.success("Compannion Created Successfully.")
            redirect(`/companions/${companion.id}`);
        }
        else {
            setLoading(false);
            toast.error('Failed to create a companion')
            console.log('Failed to create a companion');
            redirect("/");
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Companion Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter Companion's Name" {...field} className="input" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Subject</FormLabel>
                            <FormControl>
                                <Select onValueChange={field.onChange}
                                    value={field.value}
                                    defaultValue={field.value}
                                >
                                    <SelectTrigger className="input capitalize">
                                        <SelectValue placeholder="Select the subject" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {subjects.map((subject, index) => (
                                            <SelectItem key={index}
                                                value={subject}
                                                className={"capitalize"}
                                            >
                                                {subject}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="topic"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>What should the companion help with?</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Ex. Derivates & Integrals" {...field} className="input" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="voice"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Voice</FormLabel>
                            <Select onValueChange={field.onChange}
                                value={field.value}
                                defaultValue={field.value}
                            >
                                <SelectTrigger className="input">
                                    <SelectValue placeholder="Select the Voice" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="male">Male</SelectItem>
                                    <SelectItem value="female">Female</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="style"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Style</FormLabel>
                            <Select onValueChange={field.onChange}
                                value={field.value}
                                defaultValue={field.value}
                            >
                                <SelectTrigger className="input">
                                    <SelectValue placeholder="Select the Style" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="formal">Formal</SelectItem>
                                    <SelectItem value="casual">Casual</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="duration"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Estimated Session Duration (minutes)</FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    placeholder="Duration in minutes"
                                    {...field}
                                    onChange={(e) => field.onChange(Number(e.target.value))}
                                    className="input"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button disabled={loading} type="submit" className="mb-5 w-full cursor-pointer">
                    {loading ?
                        <Loader className="animate-spin" />
                        :
                        'Build Your Companion'
                    }
                </Button>
            </form>
        </Form>
    )
}

export default CompanionForm