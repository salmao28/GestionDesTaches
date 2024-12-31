import axiosClient from "./axiosClient";

type Member = {
    name: string;
    role: string;
    email: string;
  };


const memberApi = {
    getAll: () => axiosClient.get("/employees"),
    deletemember: (id: number) => axiosClient.delete(`/employees/${id}`),
    creatmember: (member: Member) => axiosClient.post("/employees",member),
    getmember : (id:string) => axiosClient.get(`/employees/${id}`)
    //get, create, update , delete
}


export {memberApi}
