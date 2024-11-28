"use client"

import ProjectForm from "./ProjectForm";
import { Button } from "./ui/button";
import { PlusIcon } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";

const NewProjBtn = ({ enableProjectButton }: { enableProjectButton: boolean }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="rounded-full" disabled={!enableProjectButton}><PlusIcon />Create Project</Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>New Project</DialogTitle>
          <DialogDescription>
            Create a new project to get started
          </DialogDescription>
        </DialogHeader>
        <ProjectForm />
      </DialogContent>
    </Dialog>
  )
}

export default NewProjBtn