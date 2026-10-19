const Card = (props) => {
    return (
        <article className="job-card">
            <header className="job-card__top">
                <div className="job-card__logo" aria-hidden="true">
                    {props.initial ?? 'a'}
                </div>

                <button type="button" className="job-card__save">
                    Save
                    <span aria-hidden="true">🔖</span>
                </button>
            </header>

            <div className="job-card__body">
                <p className="job-card__company">
                    <span>{props.companyName}</span>
                    <span>{props.postedDate}</span>
                </p>

                <h1 className="job-card__title">{props.position}</h1>

                <div className="job-card__tags">
                    <span>{props.tag1}</span>
                    <span>{props.tag2}</span>
                </div>
            </div>

            <footer className="job-card__bottom">
                <div className="job-card__pay">
                    <p className="job-card__salary">
                        {props.currency}
                        {props.salary}/hr
                    </p>
                    <p className="job-card__location">{props.location}</p>
                </div>

                <button type="button" className="job-card__apply">
                    Apply now
                </button>
            </footer>
        </article>
    )
}

export default Card;