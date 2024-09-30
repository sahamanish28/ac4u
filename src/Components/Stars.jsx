import {FaStar,FaStarHalfAlt} from "react-icons/fa";
import {AiOutlineStar} from "react-icons/ai";
import styled from "styled-components";

const Stars = ({stars,reviews}) => {

    const ratingstar = Array.from({length:5},(elem, index) =>{
            let number = index + 0.5;

            return <span key={index}>
                {
                    stars > index + 0.5
                    ? <FaStar className="icon"/>
                    : stars >= number
                    ?  <FaStarHalfAlt className="icon"/>
                    : <AiOutlineStar className="icon"/>
                }
            </span>
    });


  return (
   <Wrapper>
      <div className="icon-style">
        {ratingstar}
        <p>{reviews} reviews</p>
      </div>
      
   </Wrapper>
    
  )
}
const Wrapper = styled.section`
    .icon-style{
        display: flex;
        align-items: center;
        gap: 0.2rem;
        justify-content: flex-start;
        height:90px;
        


        .icon{
            font-size: 2rem;
            color : orange;
        }

        .empty-icon {
            font-size: 2.6rem;
        }
        p{
             margin-left: 0;
             padding-left: 1.2rem;
             color: black !important;
             text-align: left;
             display:flex;
             margin-right:0;
             
    }

`;



export default Stars