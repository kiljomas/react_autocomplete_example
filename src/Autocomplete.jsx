import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { getProfile, updateProfile } from "./profile";

class Autocomplete extends Component {
  static propTypes = {
    suggestions: PropTypes.instanceOf(Array)
  };

  static defaultProps = {
    suggestions: []
  };

  constructor(props) {
    super(props);

    this.state = {
      // The active selection's index
      activeSuggestion: 0,
      // The suggestions that match the user's input
      filteredSuggestions: [],
      // recently selected
      recentSelections: [],
      // Whether or not the suggestion list is shown
      showSuggestions: false,
      // What the user has entered
      userInput: ""
    };
  }

  componentDidMount() {
    getProfile(true).then((profile) => {
      this.setState({
        recentSelections: profile.recentSelections
      });
    });
  }

  onChange = (e) => {
    const { suggestions } = this.props;
    const userInput = e.currentTarget.value;

    // Filter our suggestions that don't contain the user's input
    const filteredSuggestions = suggestions.filter(
      (suggestion) =>
        suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    );

    this.setState({
      activeSuggestion: 0,
      filteredSuggestions,
      showSuggestions: true,
      userInput: e.currentTarget.value
    });
  };

  onClick = (e) => {
    // update recent selections with new selection (bug here!)
    const recentSelections = [
      e.currentTarget.innerText,
      ...this.state.recentSelections
    ].slice(0, 3);
    updateProfile({ recentSelections });

    this.setState({
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: e.currentTarget.innerText,
      recentSelections
    });
  };

  onKeyDown = (e) => {
    const { activeSuggestion, filteredSuggestions } = this.state;

    // User pressed the enter key
    if (e.keyCode === 13) {
      this.setState({
        activeSuggestion: 0,
        showSuggestions: false,
        userInput: filteredSuggestions[activeSuggestion]
      });
    }
    // User pressed the up arrow
    else if (e.keyCode === 38) {
      if (activeSuggestion === 0) {
        return;
      }

      this.setState({ activeSuggestion: activeSuggestion - 1 });
    }
    // User pressed the down arrow
    else if (e.keyCode === 40) {
      if (activeSuggestion - 1 === filteredSuggestions.length) {
        return;
      }

      this.setState({ activeSuggestion: activeSuggestion + 1 });
    }
  };

  render() {
    const {
      onChange,
      onClick,
      onKeyDown,
      state: {
        activeSuggestion,
        filteredSuggestions,
        recentSelections,
        showSuggestions,
        userInput
      }
    } = this;

    let suggestionsListComponent;

    let recentSuggestions = filteredSuggestions.filter(
      (s) => recentSelections.indexOf(s) >= 0
    );
    let otherSuggestions = filteredSuggestions.filter(
      (s) => recentSelections.indexOf(s) === -1
    );

    if (showSuggestions && userInput) {
      if (filteredSuggestions.length) {
        suggestionsListComponent = (
          <ul class="suggestionsheading">
            {recentSuggestions.length > 0 ? (
              <li>
                Recent
                <ul class="suggestions">
                  {recentSuggestions.map((suggestion) => {
                    let className;

                    // Flag the active suggestion with a class
                    const index = filteredSuggestions.indexOf(suggestion);
                    if (index === activeSuggestion) {
                      className = "suggestion-active";
                    }

                    return (
                      <li
                        className={className}
                        key={suggestion}
                        onClick={onClick}
                      >
                        {suggestion}
                      </li>
                    );
                  })}
                </ul>
              </li>
            ) : null}
            <li>
              Animals
              <ul class="suggestions">
                {otherSuggestions.map((suggestion) => {
                  let className;

                  // Flag the active suggestion with a class
                  const index = filteredSuggestions.indexOf(suggestion);
                  if (index === activeSuggestion) {
                    className = "suggestion-active";
                  }

                  return (
                    <li
                      className={className}
                      key={suggestion}
                      onClick={onClick}
                    >
                      {suggestion}
                    </li>
                  );
                })}
              </ul>
            </li>
          </ul>
        );
      } else {
        suggestionsListComponent = (
          <div class="no-suggestions">
            <em>No suggestions, you're on your own!</em>
          </div>
        );
      }
    }

    return (
      <Fragment>
        <input
          type="text"
          onChange={onChange}
          onKeyDown={onKeyDown}
          value={userInput}
        />
        {suggestionsListComponent}
      </Fragment>
    );
  }
}

export default Autocomplete;
