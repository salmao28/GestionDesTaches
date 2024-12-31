import React from 'react';
import Navigation from './src/components/Navigation';
import { MembersProvider } from './src/MembersContext';
import { TasksProvider } from './src/TasksContext';

const App = () => {
    return (
        <TasksProvider>
            <MembersProvider>
                <Navigation />
            </MembersProvider>
        </TasksProvider>
    );
};

export default App;
