import "../styles/Menu.css";
import ExpandedMenu from "./ExpandedMenu";
import { useSelector } from "react-redux";
import ShortMenu from "./ShortMenu";
import { CSSTransition, TransitionGroup } from 'react-transition-group';

export default function Menu() {

  const showExpandedMenu = useSelector(data=>data.showExpandedMenu)

  return(

  <TransitionGroup>
        <CSSTransition
          timeout={300}
          classNames="fade"
          key={showExpandedMenu ? 'A' : 'B'}
        >
          {showExpandedMenu ? <ExpandedMenu /> : <ShortMenu />}
        </CSSTransition>
    </TransitionGroup>
  )
}
