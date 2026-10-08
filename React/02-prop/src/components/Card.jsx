const Card = (props) => {
  console.log(props);
    return(
        <>
      <div className="parent">
        <div className="card">
          <img
            className="avatar"
            src={props.Image}
            alt="Profile"
          />
          <h1>{props.User},{props.Age}</h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          <button>View Profile</button>
        </div>
      </div>
    </>
    )
}

export default Card;