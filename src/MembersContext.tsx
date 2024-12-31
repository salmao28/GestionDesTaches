import React, { createContext, useContext, useState } from 'react';

type Member = {
    id: string;
    name: string;
    role: string;
    email: string;
};

type MembersContextType = {
    members: Member[];
    addMember: (member: Omit<Member, 'id'>) => void;
    editMember: (id: string, updatedMember: Omit<Member, 'id'>) => void;
    deleteMember: (id: string) => void;
};

const MembersContext = createContext<MembersContextType | undefined>(undefined);

export const MembersProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [members, setMembers] = useState<Member[]>([
        { id: '1', name: 'Abdlzize Baroudi', role: 'Manager', email: 'abdelaziz@wawashi.fr' },
        { id: '2', name: 'Ayoub Belkhadir', role: 'Backend Developer', email: 'ayoub@wawashi.fr' },
        { id: '3', name: 'Yassine Bellali', role: 'Backend Developer', email: 'yassine@wawashi.fr' },
        { id: '4', name: 'Asmae Boukouria', role: 'Web Developer', email: 'asmae.boukouria@wawashi.fr' },
        { id: '5', name: 'Rim Kharmach', role: 'Web Developer', email: 'rim@wawashi.fr' },
        { id: '6', name: 'Meryem Achouri', role: 'Mobile Developer', email: 'meryem@wawashi.fr' },
        { id: '7', name: 'Mostafa Haydar', role: 'Backend Developer', email: 'mostafa@wawashi.fr' },
        { id: '8', name: 'Amina Ahsayn', role: 'Resource Human', email: 'amina@wawashi.fr' },
    ]);

    const addMember = (member: Omit<Member, 'id'>) => {
        setMembers((prevMembers) => [
            ...prevMembers,
            { ...member, id: (prevMembers.length + 1).toString() },
        ]);
    };

    const editMember = (id: string, updatedMember: Omit<Member, 'id'>) => {
        setMembers((prevMembers) =>
            prevMembers.map((member) =>
                member.id === id ? { ...member, ...updatedMember } : member
            )
        );
    };

    const deleteMember = (id: string) => {
        setMembers((prevMembers) => prevMembers.filter((member) => member.id !== id));
    };

    return (
        <MembersContext.Provider value={{ members, addMember, editMember, deleteMember }}>
            {children}
        </MembersContext.Provider>
    );
};

export const useMembers = () => {
    const context = useContext(MembersContext);
    if (!context) {
        throw new Error('useMembers must be used within a MembersProvider');
    }
    return context;
};
