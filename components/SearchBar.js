import React from 'react';
import '../styles/components/SearchBar.scss';
import PropTypes from 'prop-types';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.displayName = 'SearchBar';

    this.keyChange = this
      .keyChange
      .bind(this);

    this.state = {
      keyValues: ''
    };
  }

  keyChange(evt) {
    this.setState({keyValues: evt.target.value});
  }

  render() {

    /**
     * @method returnHeroNamesOnKey
     * @param  {Array} heroNames - will be passed as an array argument
     * @return {Array} Return the array list of names that match the input keys
     */
    const returnHeroNamesOnKey = heroNames => {
      let keyInput = this.state.keyValues.toLowerCase();
      let keyLength = keyInput.length;

      if (keyInput) {
        return heroNames.reduce((acc, curr) => {
          let realName = curr.real_name.toLowerCase();

          if (keyInput.indexOf(realName.slice(0, keyLength)) === 0) {
            acc.push(realName);
          }
          return acc;
        }, []);
      }
    };

    /**
     * @method renderHeroList
     * @param  {Array} props - will be passed as an array when the component is called
     * @return  {Array} Return the lists of names and render the elements 
     */
    const renderHeroList = props => {
      const getHeroNames = returnHeroNamesOnKey(props);

      if (this.state.keyValues) {
        return getHeroNames.map((item, index) => {
          return (
            <li key={index}>{item}</li>
          );
        });
      }
    };

    const autoComplete = renderHeroList(this.props.data);

    return (
      <div className="form-group searchBar auto-complete">
        <input type="text" onKeyUp={this.keyChange}/>
        <ul>
          {autoComplete}
        </ul>
      </div>
    );
  }
}

SearchBar.propTypes = {
  data: PropTypes.array
};

export default SearchBar;
