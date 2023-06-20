import React from "react";

export const HomeQuoteShower = (e) => {
    const quote = e.quote;
    console.log(quote);
    return (
        <div className="card m-2 homequote" key={quote.time}>
        <div className="card-body">
            <h3 className="card-title">" {quote.quote} " </h3>
            <div className="info">
            <img src={quote.author.profileURL} alt="just pic" />
            <p className="card-text">  ~{quote.author.name}</p>
            </div>
        </div>
    </div>
    )
}