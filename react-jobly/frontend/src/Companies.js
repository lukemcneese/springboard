import React, {useState, useEffect} from "react";
import Company from "./Company"
import JoblyApi from "./JoblyApi";
import SearchForm from "./SearchForm";
import LoadingSpinner from "./LoadingSpinner"

function Companies(){
    const [companies, setCompanies] = useState(null)

    useEffect(function getCompaniesOnMount() {
        search();
    }, []);

    /** Triggered by search form submit; reloads companies. */
    async function search(name) {
        let companies = await JoblyApi.getCompanines(name);
        setCompanies(companies);
    }
    if (!companies) return <LoadingSpinner />;
     return (
        <>
            <SearchForm searchFor={search} />
             {companies ? (<div>
                {companies.map(({handle, name, description, logoUrl}) =>(
                    <Company 
                        key={handle} 
                        handle={handle}
                        name={name}
                        description={description}
                        logoUrl={logoUrl}/>
                        ))} </div>) : <p> Please Search</p>}
        </>
      );
  }
  export default Companies;

//   <div> 

// </div>