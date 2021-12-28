import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

const Tab = ({ name, icon }) => {
  const location = useLocation();
  const active = location.pathname.includes(name.toLowerCase())

  return (
    <li className={ active ? "is-active" : ""}>
      <Link to={`/${name.toLowerCase()}`} className="mr-4 ml-4" >
        <span className="icon is-small">
          <FontAwesomeIcon icon={icon} />
        </span>
        <span>{name}</span>
      </Link>
    </li>
  )
}

export default Tab;
