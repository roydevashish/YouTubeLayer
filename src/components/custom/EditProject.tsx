import { Loader, Pen } from "lucide-react"
import { Button } from "../ui/button"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { ProjectSchema } from "@/zod-schemas/Project.zod";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProjectType } from "./PropType";
import axios, { AxiosError } from "axios";
import { APIResponse } from "@/types/APIResponse";
import { toast } from "sonner";

export default function EditProjectDialogComponent(props: {project: ProjectType | undefined, setReloadProjects: Function}) {
  const [isSubmittingEditProject, setIsSubmittingEditProject] = useState(false);
  const editProjectDialogCloseBtn = useRef<HTMLButtonElement>(null);

  const onSubmitEditProject = async (data: z.infer<typeof ProjectSchema>) => {
    setIsSubmittingEditProject(true);

    try {
      const response = await axios.patch<APIResponse>(`/api/project/${props.project?._id}`, data);
      toast(response.data.message);
    } catch (error) {
      const axiosError = error as AxiosError<APIResponse>;
      const errorMessage = axiosError.response?.data.message;
      toast(errorMessage);
    } finally {
      setIsSubmittingEditProject(false);
      editProjectDialogCloseBtn.current?.click();
      props.setReloadProjects((prev: boolean) => !prev);
    }
  }

  const form = useForm<z.infer<typeof ProjectSchema>>({
    resolver: zodResolver(ProjectSchema),
    defaultValues: {
      title: props.project?.title,
      description: props.project?.description
    }
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default"><Pen /></Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Project</DialogTitle>
          <DialogDescription>
            Edit your project for video editing.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmitEditProject)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Project Title" {...field} />
                  </FormControl>
                  <FormDescription>
                    Please provide a title for the new project.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Project Description" {...field} />
                  </FormControl>
                  <FormDescription>
                    Please provide a description for the new project.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="sm:justify-end">
              <Button type="submit" disabled={isSubmittingEditProject}>
                {isSubmittingEditProject ? (<Loader className="animate-spin" />) : ("Update")}
              </Button>
              <DialogClose asChild>
                <Button type="button" variant="destructive" ref={editProjectDialogCloseBtn}>
                  Close
                </Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}