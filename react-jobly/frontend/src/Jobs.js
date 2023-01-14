import React, {useState, useEffect} from "react";
import Job from "./Job"
import JoblyApi from "./JoblyApi";
import LoadingSpinner from "./LoadingSpinner";

function Jobs(){
    const [jobs, setJobs] = useState(null)

    useEffect(function getJobsOnMount(){
        getJob();
    },[])
    async function getJob(){
        let jobs = await JoblyApi.getJobs();
        setJobs(jobs)
    }
    if(!jobs) return <LoadingSpinner/>;
    return (
        <>
        <h1>Jobs</h1>
        {jobs ? (<div>
            {jobs.map(({id, title, salary, equity, companyName})=>(
                <Job
                    key={id}
                    id = {id}
                    title={title}
                    salary={salary}
                    equity={equity}
                    companyName={companyName}
                />   
            ))}</div>): <p>No Jobs Found</p>}
        </>
    );
}
export default Jobs;