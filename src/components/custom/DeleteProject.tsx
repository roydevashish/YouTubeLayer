import { Loader, Trash } from "lucide-react";
import { Button } from "../ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { useRef, useState } from "react";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import { APIResponse } from "@/types/APIResponse";

export function DeleteProjectDialogComponent(props: {projectId: string, setReloadProjects: Function}) {
  const [submittingDeleteProject, setSubmittingDeleteProject] = useState(false);
  const deleteProjectDialogCloseBtn = useRef<HTMLButtonElement>(null);

  const onSubmitDeleteProject = async () => {
    setSubmittingDeleteProject(true);
    try {
      const response = await axios.delete<APIResponse>(`/api/project/${props.projectId}`);
      toast(response.data.message);
      console.log(response)
    } catch (error) {
      const axiosError = error as AxiosError<APIResponse>;
      const errorMessage = axiosError.response?.data.message;
      toast(errorMessage);
    } finally {
      setSubmittingDeleteProject(false);
      deleteProjectDialogCloseBtn.current?.click();
      props.setReloadProjects((prev: boolean) => !prev);
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild><Button variant="destructive"><Trash /></Button></DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure to delete the project?</DialogTitle>
          <DialogDescription>
            This action will delete the project : <b>project name</b>.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={onSubmitDeleteProject} disabled={submittingDeleteProject}>
            {submittingDeleteProject ? (<Loader className="animate-spin" />) : ("Delete Project")}
          </Button>
          <DialogClose asChild>
            <Button variant="outline" ref={deleteProjectDialogCloseBtn}>Cancel</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}