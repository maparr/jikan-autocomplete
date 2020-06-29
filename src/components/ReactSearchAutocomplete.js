import React from "react";
import PropTypes from "prop-types";
import {defaultTheme, GlobalStyle, defaultFuseOptions} from "../defaults/defaults";
import Results from "./Results/Results";
import {StyledReactSearchAutocomplete} from "./StyledReactSearchAutocomplete";
import SearchInput from "./SearchInput/SearchInput";
import {ThemeProvider} from 'styled-components'
import {debounce} from "../utils/utils";

export function ReactSearchAutocomplete(props) {

    const {
        fuseOptions,
        inputDebounce,
        onSearch,
        onSelect,
        onFocus,
        showIcon,
        maxResults,
        placeholder,
        autoFocus,
        styling,
        api
    } = props;

    const theme = {...defaultTheme, ...styling};

    const [searchString, setSearchString] = React.useState("");
    const [results, setResults] = React.useState();
    const [error, setError] = React.useState('');

    const transformAPI = async (keyword) => {
        const res = await api(keyword)
        if(res instanceof Error) {
            setError(res.message);
        }

        if(!res.results) {
            return ;
        }
        // console.log(keyword);
        setResults(res.results.map(({title, mal_id}) => ({
            name: title,
            id: mal_id
        })));
    }




    // This is used to debounce the onSearch props function
    const debounceOnSearch = React.useCallback(
        debounce((keyword) => {
            transformAPI(keyword).then(() => onSearch(keyword));
        }, inputDebounce), [transformAPI]);

    const handleSetSearchString = event => {
        setSearchString(event.target.value);
        const keyword = event.target.value.toLowerCase();
        onSearch && debounceOnSearch(keyword);
    }

    const handleOnSelect = (result) => {
        setSearchString(result.name);
        onSelect(result);
        setResults([result]);
    }

    return (
        <ThemeProvider theme={theme}>
            <GlobalStyle/>
            <StyledReactSearchAutocomplete>
                <p>{error}</p>
                <div className="wrapper">
                    <SearchInput
                        searchString={searchString}
                        setSearchString={handleSetSearchString}
                        autoFocus={autoFocus}
                        onBlur={() => setResults([])}
                        onFocus={onFocus}
                        placeholder={placeholder}
                        showIcon={showIcon}
                    />
                    <Results
                        searchKeyword={searchString}
                        handleOnSelect={handleOnSelect}
                        results={results}
                        onClick={onSelect}
                        setSearchString={setSearchString}
                        showIcon={showIcon}
                        maxResults={maxResults}
                    />
                </div>
            </StyledReactSearchAutocomplete>
        </ThemeProvider>
    )
}

ReactSearchAutocomplete.defaultProps = {
    items: [],
    useCaching: true,
    inputDebounce: 200,
    showIcon: true,
    maxResults: 10,
    placeholder: "",
    autoFocus: false,
    styling: {},
}

ReactSearchAutocomplete.propTypes = {
    api: PropTypes.func,
    useCaching: PropTypes.bool,
    inputDebounce: PropTypes.number,
    onSearch: PropTypes.func,
    onSelect: PropTypes.func,
    onFocus: PropTypes.func,
    showIcon: PropTypes.bool,
    maxResults: PropTypes.number,
    placeholder: PropTypes.string,
    autoFocus: PropTypes.bool,
    styling: PropTypes.object,
}
