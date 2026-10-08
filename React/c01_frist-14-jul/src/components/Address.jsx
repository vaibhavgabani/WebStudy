const Address = (props) =>{
    return(
        <>
            <p>{props.address}</p>
            <p>{props.city}, {props.state} {props.zip}</p>
        </>
    )
}

export default Address;