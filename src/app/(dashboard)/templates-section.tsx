"use client"

import { ResponseType, useGetTemplates } from "@/features/projects/api/use-get-templates"
import { Loader, TriangleAlert } from "lucide-react"
import { TemplateCard } from "./template-card"
import { useCreateProject } from "@/features/projects/api/use-create-project"
import { useRouter } from "next/navigation"

export const TemplatesSection = ()=>{
    const router = useRouter()
    const mutation = useCreateProject()
    const { 
        data, 
        isLoading, 
        isError 
    } = useGetTemplates({ page: "1", limit: "4"})

    const onClick = (template: ResponseType["data"][0]) => {
        // Todo: check if template is pro
        mutation.mutate({
            name: `${template.name} project`,
            json: template.json,
            height: template.height,
            width: template.width,
        },
        {
            onSuccess: ({data})=>{
                router.push(`/editor/${data.id}`)
            }
        })
    }

    if(isLoading){
        return (
            <div className="space-y-4">
                <h3 className="font-semibold text-lg">
                    Start from a template
                </h3>
                <div className="flex justify-center items-center h-32">
                    <Loader className="size-6 text-muted-foreground animate-spin"/>
                </div>
            </div>
        )
    }

    if(isError){
        return (
            <div className="space-y-4">
                <h3 className="font-semibold text-lg">
                    Start from a template
                </h3>
                <div className="flex flex-col gap-y-4 justify-center items-center h-32">
                    <TriangleAlert className="size-6 text-muted-foreground"/>
                    <p className="text-sm text-muted-foreground">Failed to load templates</p>
                </div>
            </div>
        )
    }

    if(!data?.length){
        return null
    }


    return <div>
        <h3 className="font-semibold text-lg">
            Start from a template
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 mt-4 gap-4">
            {
                data.map((template)=>(
                    <TemplateCard 
                        key={template.id}
                        title={template.name}
                        imageSrc={template.thumbnailUrl || ""}    
                        disabled={mutation.isPending}
                        width={template.width}
                        height={template.height}
                        isPro={template.isPro}
                        onClick={()=> onClick(template)}
                        description={`${template.width} x ${template.height} px`}
                    />
                ))
            }
        </div>
    </div>
}