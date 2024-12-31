import axiosClient from "./axiosClient";

interface Comment {
    id: string;
    comment: string;
  }
  
  interface Link {
    id: string;
    link: string;
  }

interface Task {
    title: string;
    priority: 'urgent' | 'normale' | string;
    status: string;
    date: string;
    comments: Comment[];
    links: Link[];
    members: string[];
    progress: number;
  }


export const tasksApi = {
    getall : () => axiosClient.get("/tasks"),
    createtask : (task : Task) => axiosClient.post("/tasks",task),
    deletetask : (id: string) => axiosClient.delete (`tasks/${id}`),
}

