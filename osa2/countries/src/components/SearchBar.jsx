
const SearchBar = (props) => {

    return (
        <div>find countries <input value={props.value} onChange={props.onChange}/></div>
    )
}

export default SearchBar