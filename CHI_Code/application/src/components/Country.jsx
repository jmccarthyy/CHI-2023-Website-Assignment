/**
 * Country component
 * 
 * This is the component for a single country that will be shown on the countries page in a list
 * 
 * @author Jake McCarthy
 */
function Country(props) {
    return (
        <li className="bg-white p-4 rounded-md shadow-md">
          <p className="text-lg font-semibold">{props.country}</p>
        </li>
    );
  }
    
export default Country;