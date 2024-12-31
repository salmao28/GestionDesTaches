import React, { createContext, useState, useContext, ReactNode } from 'react';


type Task = {
    id: number;
    title: string;
    priority: 'urgent' | 'normale';
    status: 'en cours' | 'at risk' | 'completed';
    date: string;
    comments: number;
    links: number;
    members: number;
    memberNames: string[];
    progress: number;
};


type TasksContextType = {
    tasks: Task[];
    addTask: (task: Task) => void;
};


const TasksContext = createContext<TasksContextType | undefined>(undefined);


export const TasksProvider = ({ children }: { children: ReactNode }) => {
    const [tasks, setTasks] = useState<Task[]>([
        {id: 1,title: 'Api chat SVR',priority: 'urgent',status: 'en cours',date: '1/11/2024',comments: 5,links: 2,members: 3,memberNames: ['Yassin', 'Rim', 'Asmae'],progress: 0.4, },
        { id: 2,title: 'project escodeve academy',priority: 'urgent',status: 'en cours',date: '29/11/2024',comments: 5,links: 2,members: 1,memberNames: ['Yassin'],progress: 0.0,},
        { id: 3,title: 'traitement des  tiquets dépense automatique',priority: 'normale',status: 'en cours',date: '1/11/2024',comments: 5,links: 2,members: 2,memberNames: ['ayoub', 'moustafa'],progress: 0.5,},
        { id: 4,title: 'validation des dépanses automatique',priority: 'normale',status: 'en cours',date: '1/12/2024',comments: 5,links: 2,members: 2,memberNames: ['ayoub', 'moustafa'],progress: 0.4,},
        { id: 5,title: 'rembouressement automatique des dépenses validés',priority: 'normale',status: 'en cours',date: '1/12/2024',comments: 5,links: 2,members: 2,memberNames: ['ayoub', 'moustafa'],progress: 0.4,},
    ]);

    
    const addTask = (task: Task) => {
        setTasks((prevTasks) => [...prevTasks, task]);
    };

    return (
        <TasksContext.Provider value={{ tasks, addTask }}>
            {children}
        </TasksContext.Provider>
    );
};


export const useTasks = () => {
    const context = useContext(TasksContext);
    if (!context) {
        throw new Error('useTasks must be used within a TasksProvider');
    }
    return context;
};


export default TasksContext;
