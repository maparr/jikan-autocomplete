import React from 'react';
import './App.css';
import {search} from "./services/api";
import { ReactSearchAutocomplete } from "./components";
import Select from 'react-select';

function App()  {
    const [category, setCategory] = React.useState({ value: 'anime', label: 'Anime' });
    const [searchCategory, setSearchCategory] = React.useState('anime');
    const handleChange = selectedOption => {
        setCategory(selectedOption);
        setSearchCategory(selectedOption.value)
    };

    const options = [
        { value: 'anime', label: 'Anime' },
        { value: 'manga', label: 'Manga' },
        { value: 'person', label: 'Person' },
        { value: 'character', label: 'Character' },
    ];

    const handleOnSearch = (string) => {
        // console.log(string);
    }

    const handleOnSelect = item => {
        window.open(item.url,'_blank');
    }

    const handleOnFocus = () => {
        console.log("Focused");
    }

    return (
        <div className="App">
            <header className="App-header">
                <div style={{maxWidth: 500, width: '80%', margin: 20}}>
                    <h1 className="title"> <span className="titleA">Search</span> <div className="selectCategory"><Select
                        value={category}
                        onChange={handleChange}
                        options={options}
                        width={200}
                    /></div></h1>
                    <ReactSearchAutocomplete
                        api={search(searchCategory)}
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
