import React from 'react';
import './App.css';
import {search} from "./services/api";
import { ReactSearchAutocomplete } from "./components";

function App()  {

    const handleOnSearch = (string) => {
        // console.log(string);
    }

    const handleOnSelect = item => {
        // console.log(item);
    }

    const handleOnFocus = () => {
        console.log("Focused");
    }

    return (
        <div className="App">
            <header className="App-header">
                <div style={{maxWidth: 500, width: '80%', margin: 20}}>
                    <h1 className="title">Search anime</h1>
                    <ReactSearchAutocomplete
                        api={search}
                        onSearch={handleOnSearch}
                        onSelect={handleOnSelect}
                        onFocus={handleOnFocus}
                        inputDebounce={300}
                        autoFocus
                    />
                </div>
            </header>
        </div>
    );
}

export default App;
