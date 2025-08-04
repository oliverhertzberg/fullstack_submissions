
const Persons = (props) => {

    return (
        <div>
            {props.persons.length > 0 && props.persons
                .filter(person => person.name.toLowerCase().includes(props.nameFilter.toLowerCase()))
                .map( person => 
                <p key={person.name}>{person.name} {person.number} <button onClick={(e) => props.onClick(person, e)}>delete</button></p>
                )}
        </div>
    )
}

export default Persons