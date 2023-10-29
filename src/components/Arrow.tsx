import { BiSolidDownArrow } from 'react-icons/bi';
import { useMediaQuery } from "react-responsive";
import { ContainerArrow } from '../styles/styled';

const Arrow = () => {
    const isTabletOrMobile = useMediaQuery({ query: "(max-width: 800px)" });

  return (
    <ContainerArrow>
      {isTabletOrMobile && <BiSolidDownArrow size={30} color='#1976D2'/>}
    </ContainerArrow>
  );
}

export default Arrow;
