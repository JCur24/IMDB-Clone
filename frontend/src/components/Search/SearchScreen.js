import '../../vendors/bootstrap/css/bootstrap.min.css';
import '../../vendors/bootstrap/bootstrap.min.css';
import '../../vendors/fontawesome/css/all.min.css';
import NavigationSidebar from "../NavigationSidebar";
import SearchComponent from "./SearchComponent";

const SearchScreen = () => {
  return (
      <div className="row mt-2">
          <div className="col-2 col-md-2 col-lg-1 col-xl-2">
            <NavigationSidebar active="search"/>
          </div>
          <div className="col-10 col-md-10 col-lg-7 col-xl-6"
               style={{"position": "relative"}}>
            <SearchComponent/>
          </div>
      </div>
  )
}

export default SearchScreen;