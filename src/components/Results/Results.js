import React from "react";
import PropTypes from "prop-types";
import {SearchIcon} from "../../icons/SearchIcon";
import {StyledResults} from "./StyledResults";

export default function Results(props) {

    const {
        results,
        showIcon,
        maxResults,
        handleOnSelect,
        searchKeyword
    } = props;

    return (
        results.length > 0 ?
            <StyledResults>
                <div className="line"/>
                <ul>
                    {
                        results.slice(0, maxResults).map(result =>
                            <li
                                key={result.id}
                                onMouseDown={() => handleOnSelect(result)}
                                onClick={() => handleOnSelect(result)}
                            >
                                {showIcon && <div className="icon"><SearchIcon/></div>}
                                <div className="ellipsis" title={result.name}>
                                    <span dangerouslySetInnerHTML={{
                                        __html: result.name.replace(
                                            new RegExp(`(${searchKeyword})`, 'ig'),
                                            "<span style=\"background-color: #ACD8A2\">$1</span>"
                                        )
                                    }}/>
                                </div>
                            </li>)
                    }
                </ul>
            </StyledResults>
            :
            null
    )
}

Results.defaultProps = {
    results: [],
    setSearchString: () => {
    },
}

Results.propTypes = {
    results: PropTypes.array,
    onClick: PropTypes.func,
    setSearchString: PropTypes.func,
    showIcon: PropTypes.bool,
    maxResults: PropTypes.number,
}
