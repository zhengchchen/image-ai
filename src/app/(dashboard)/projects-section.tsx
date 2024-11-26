"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { formatDistanceToNow } from "date-fns";

import {
    Table,
    TableBody,
    TableCell,
    TableRow
} from "@/components/ui/table";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

import { useGetProjects } from "@/features/projects/api/use-get-projects";
import { Search, AlertTriangle, Loader, FileIcon, MoreHorizontal, CopyIcon, Trash, TrashIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDuplicateProject } from "@/features/projects/api/use-duplicate-project";

export const ProjectsSection = () => {
  const router = useRouter();

  const duplicateMutation = useDuplicateProject();

  const onCopy = (id:string) => {
    duplicateMutation.mutate({ id });
  }

  const { 
    data,
    status,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage
  } = useGetProjects();

  if(status === "pending"){
    return <div className="space-y-6">
        <h3 className="font-semibold text-lg">Recent Projects</h3>
        <div className="flex flex-col items-center justify-center h-32 gap-y-4">
            <Loader className="size-6 animate-spin text-muted-foreground"/>
        </div>
    </div>
  }

  if(status === "error"){
    return <div className="space-y-6">
        <h3 className="font-semibold text-lg">Recent Projects</h3>
        <div className="flex flex-col items-center justify-center h-32 gap-y-4">
            <AlertTriangle className="size-6 text-muted-foreground"/>
            <p className="text-sm text-muted-foreground">
                Failed to fetch projects
            </p>
        </div>
    </div>
  }

  if(!data.pages.length){
    return <div className="space-y-6">
        <h3 className="font-semibold text-lg">Recent Projects</h3>
        <div className="flex flex-col items-center justify-center h-32 gap-y-4">
            <Search className="size-6 text-muted-foreground"/>
            <p className="text-sm text-muted-foreground">
                No projects found
            </p>
        </div>
    </div>
  }

  return (
    <div className="space-y-6">
      <h3 className="font-semibold text-lg">Recent Projects</h3>
      <Table>
        <TableBody>
            {data.pages.map((group,i)=>(
                <React.Fragment key={i} >
                    {group.data.map((project)=>(
                        <TableRow key={project.id}>
                            <TableCell 
                                onClick={()=>router.push(`/editor/${project.id}`)} 
                                className="font-medium flex items-center gap-x-2 cursor-pointer">
                                    <FileIcon className="size-6"/>
                                    {project.name}
                            </TableCell>
                            <TableCell
                                onClick={()=>router.push(`/editor/${project.id}`)} 
                                className="hidden md:table-cell cursor-pointer">
                                    {project.width} x {project.height} px
                            </TableCell>
                            <TableCell
                                onClick={()=>router.push(`/editor/${project.id}`)} 
                                className="hidden md:table-cell cursor-pointer">
                                    { formatDistanceToNow(new Date(project.updatedAt), {addSuffix: true}) }
                            </TableCell>
                            <TableCell className="flex items-center justify-end">
                                <DropdownMenu  modal={false}>
                                    <DropdownMenuTrigger asChild>
                                        <Button disabled={false} variant="ghost" size="icon">
                                            <MoreHorizontal className="size-4"/>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="w-60">
                                        <DropdownMenuItem 
                                            className="h-10 cursor-pointer" 
                                            disabled={duplicateMutation.isPending} 
                                            onClick={()=>onCopy(project.id)}>
                                                <CopyIcon className="size-4 mr-2"/>
                                                Make a copy
                                        </DropdownMenuItem>

                                        <DropdownMenuItem 
                                            className="h-10 cursor-pointer" 
                                            disabled={false} 
                                            onClick={()=>{ }}>
                                                <TrashIcon className="size-4 mr-2"/>
                                                Delete
                                        </DropdownMenuItem>

                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                    ))}
                </React.Fragment>
            ))}
        </TableBody>
      </Table>
      {
        hasNextPage && (
            <div className="flex justify-center items-center w-full pt-4">
                <Button variant="ghost" disabled={isFetchingNextPage} onClick={()=>fetchNextPage()}>
                    Load more
                </Button>
            </div>
        )
      }
    </div>
  );
};
