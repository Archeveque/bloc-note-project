import React from 'react';
import ReactDOM from 'react-dom';
import Note from './components/note';

const App = () => (
    <div>
        <h1 class="title">The Bloc Note Project</h1>
        <Note />
    </div>
);

ReactDOM.render(<App />, document.getElementById('root'));