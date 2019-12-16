import React from 'react'
import "./Search.css"

const Search = (props) => {

  const handleOnChange = (event) => {
  props.onSearch(event.target.value)
  }
  return (
      <form class="search-container">
        <div id="search-div">
          <img class="search-icon" src="http://www.endlessicons.com/wp-content/uploads/2012/12/search-icon.png" alt="not found"></img>
          <input onChange={handleOnChange} type="text" id="search-bar" placeholder="Search"></input>
        </div>
      </form>
  )
}

export default Search;
