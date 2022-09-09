

const TImeDate = (props) =>{


    console.log(props.dateTime);

    
    var d = new Date(props.dateTime).getHours();

    var m = new Date(props.dateTime).getMinutes();
    
    var format;

    // setting Hours
    if(d > 12)
    {
        d = d - 12;
        format = "PM";
    }
    else
    {
        format = "AM";
    }

    // setting Minutes

    // eslint-disable-next-line eqeqeq
    if(m == 0)
    {
        m = m+"0";
    }

    const finalDateTime = d+":"+m+format;

    return (

        <>
            {finalDateTime}        
        </>


    )

}

export default TImeDate;