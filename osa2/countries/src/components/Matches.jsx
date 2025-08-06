const Matches = (props) => {
    if (!props.matches || !props.matches[0]) return null

    const found_matches = props.matches.length
    if (found_matches > 10) {
        return (
            <div>Too many matches!</div>
        )
    }
    if (found_matches > 1) {
        return (
            <>
                {props.matches.map( item => {
                    return <div key={item.name.common}>{item.name.common}</div>
                    }
                )}
            </>
        )
    }
    const match = props.matches[0]
    console.log(match)
    return (
        <div>
            <h1>{match.name.common}</h1>
            <p>
                Capital {match.capital[0]} <br/>
                Area {match.area}
            </p>
            <h2>Languages</h2>
            <ul>
                {Object.keys(match.languages).map((item, i) => {
                    return <li key={i}>{match.languages[item]}</li>
                    })}
            </ul>
            <img src={match.flags['png']} alt={match.flags['alt']}></img>
        </div>
    )
}

export default Matches